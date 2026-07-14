"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import type { EmailCalcSession } from "@/lib/email-calc";
import type { BankTableRequestData } from "@/lib/legacy-table";

export type GuaranteeModalData = {
  fz: string;
  fzLabel: string;
};

export type AntibotContext = "calculator" | "auto" | "commerce";

export type AntibotSession = {
  context: AntibotContext;
  payload: Record<string, string>;
  onVerified?: () => void;
  onCancel?: () => void;
};

type ModalContextValue = {
  guaranteeOpen: boolean;
  guaranteeData: GuaranteeModalData | null;
  limitOpen: boolean;
  antibotOpen: boolean;
  antibotSession: AntibotSession | null;
  antibotCancelOpen: boolean;
  infoOpen: boolean;
  commerceOpen: boolean;
  emailCalcOpen: boolean;
  emailCalcSession: EmailCalcSession | null;
  bankRequestOpen: boolean;
  bankRequestData: BankTableRequestData | null;
  successOpen: boolean;
  successTitle: string;
  successMessage: string;
  openGuarantee: (data: GuaranteeModalData) => void;
  closeGuarantee: () => void;
  openLimit: () => void;
  closeLimit: () => void;
  openAntibot: (session: AntibotSession) => void;
  closeAntibot: () => void;
  requestAntibotClose: () => void;
  confirmAntibotClose: () => void;
  closeAntibotCancel: () => void;
  resolveAntibot: () => void;
  openInfo: () => void;
  closeInfo: () => void;
  openCommerce: () => void;
  closeCommerce: () => void;
  openEmailCalc: (session: EmailCalcSession) => void;
  closeEmailCalc: () => void;
  openBankRequest: (data: BankTableRequestData) => void;
  closeBankRequest: () => void;
  openSuccess: (options?: { title?: string; message?: string }) => void;
  closeSuccess: () => void;
};

const ModalContext = createContext<ModalContextValue | null>(null);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [guaranteeOpen, setGuaranteeOpen] = useState(false);
  const [guaranteeData, setGuaranteeData] = useState<GuaranteeModalData | null>(null);
  const [limitOpen, setLimitOpen] = useState(false);
  const [antibotOpen, setAntibotOpen] = useState(false);
  const [antibotSession, setAntibotSession] = useState<AntibotSession | null>(null);
  const [antibotCancelOpen, setAntibotCancelOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [commerceOpen, setCommerceOpen] = useState(false);
  const [emailCalcOpen, setEmailCalcOpen] = useState(false);
  const [emailCalcSession, setEmailCalcSession] = useState<EmailCalcSession | null>(null);
  const [bankRequestOpen, setBankRequestOpen] = useState(false);
  const [bankRequestData, setBankRequestData] = useState<BankTableRequestData | null>(null);
  const [successOpen, setSuccessOpen] = useState(false);
  const [successTitle, setSuccessTitle] = useState("ЗАЯВКА ПОЛУЧЕНА!");
  const [successMessage, setSuccessMessage] = useState("Скоро с Вами свяжется один из наших специалистов.");
  const onVerifiedRef = useRef<(() => void) | undefined>(undefined);
  const onCancelRef = useRef<(() => void) | undefined>(undefined);

  const openGuarantee = useCallback((data: GuaranteeModalData) => {
    setGuaranteeData(data);
    setGuaranteeOpen(true);
  }, []);

  const closeGuarantee = useCallback(() => {
    setGuaranteeOpen(false);
    setGuaranteeData(null);
  }, []);

  const openLimit = useCallback(() => setLimitOpen(true), []);
  const closeLimit = useCallback(() => setLimitOpen(false), []);

  const openAntibot = useCallback((session: AntibotSession) => {
    onVerifiedRef.current = session.onVerified;
    onCancelRef.current = session.onCancel;
    setAntibotSession(session);
    setAntibotOpen(true);
  }, []);

  const closeAntibot = useCallback(() => {
    setAntibotOpen(false);
    setAntibotSession(null);
    onVerifiedRef.current = undefined;
    onCancelRef.current = undefined;
  }, []);

  const requestAntibotClose = useCallback(() => {
    if (onCancelRef.current) {
      setAntibotCancelOpen(true);
      return;
    }
    closeAntibot();
  }, [closeAntibot]);

  const confirmAntibotClose = useCallback(() => {
    onCancelRef.current?.();
    setAntibotCancelOpen(false);
    closeAntibot();
  }, [closeAntibot]);

  const closeAntibotCancel = useCallback(() => setAntibotCancelOpen(false), []);

  const resolveAntibot = useCallback(() => {
    onVerifiedRef.current?.();
    setAntibotOpen(false);
    setAntibotSession(null);
    onVerifiedRef.current = undefined;
    onCancelRef.current = undefined;
  }, []);

  const openInfo = useCallback(() => setInfoOpen(true), []);
  const closeInfo = useCallback(() => setInfoOpen(false), []);
  const openCommerce = useCallback(() => setCommerceOpen(true), []);
  const closeCommerce = useCallback(() => setCommerceOpen(false), []);

  const openEmailCalc = useCallback((session: EmailCalcSession) => {
    setEmailCalcSession(session);
    setEmailCalcOpen(true);
  }, []);

  const closeEmailCalc = useCallback(() => {
    setEmailCalcOpen(false);
    setEmailCalcSession(null);
  }, []);

  const openBankRequest = useCallback((data: BankTableRequestData) => {
    setBankRequestData(data);
    setBankRequestOpen(true);
  }, []);

  const closeBankRequest = useCallback(() => {
    setBankRequestOpen(false);
    setBankRequestData(null);
  }, []);

  const openSuccess = useCallback((options?: { title?: string; message?: string }) => {
    if (options?.title) setSuccessTitle(options.title);
    if (options?.message) setSuccessMessage(options.message);
    setSuccessOpen(true);
  }, []);

  const closeSuccess = useCallback(() => {
    setSuccessOpen(false);
    setSuccessTitle("ЗАЯВКА ПОЛУЧЕНА!");
    setSuccessMessage("Скоро с Вами свяжется один из наших специалистов.");
  }, []);

  const value = useMemo(
    () => ({
      guaranteeOpen,
      guaranteeData,
      limitOpen,
      antibotOpen,
      antibotSession,
      antibotCancelOpen,
      infoOpen,
      commerceOpen,
      emailCalcOpen,
      emailCalcSession,
      bankRequestOpen,
      bankRequestData,
      successOpen,
      successTitle,
      successMessage,
      openGuarantee,
      closeGuarantee,
      openLimit,
      closeLimit,
      openAntibot,
      closeAntibot,
      requestAntibotClose,
      confirmAntibotClose,
      closeAntibotCancel,
      resolveAntibot,
      openInfo,
      closeInfo,
      openCommerce,
      closeCommerce,
      openEmailCalc,
      closeEmailCalc,
      openBankRequest,
      closeBankRequest,
      openSuccess,
      closeSuccess,
    }),
    [
      guaranteeOpen,
      guaranteeData,
      limitOpen,
      antibotOpen,
      antibotSession,
      antibotCancelOpen,
      infoOpen,
      commerceOpen,
      emailCalcOpen,
      emailCalcSession,
      bankRequestOpen,
      bankRequestData,
      successOpen,
      successTitle,
      successMessage,
      openGuarantee,
      closeGuarantee,
      openLimit,
      closeLimit,
      openAntibot,
      closeAntibot,
      requestAntibotClose,
      confirmAntibotClose,
      closeAntibotCancel,
      resolveAntibot,
      openInfo,
      closeInfo,
      openCommerce,
      closeCommerce,
      openEmailCalc,
      closeEmailCalc,
      openBankRequest,
      closeBankRequest,
      openSuccess,
      closeSuccess,
    ],
  );

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
}

export function useModals() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModals must be used within ModalProvider");
  return ctx;
}
