import { Preference } from '@base-org/account';
import { SubAccountOptions } from '@base-org/account/dist/core/provider/interface';
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  SDKVersionType,
  SELECTED_SCW_URL_KEY,
  SELECTED_SDK_KEY,
  ScwUrlType,
  scwUrls,
  sdkVersions,
} from '../store/config';
import { cleanupSDKLocalStorage } from '../utils/cleanupSDKLocalStorage';

type ConfigContextProviderProps = {
  children: ReactNode;
};

type ConfigContextType = {
  version: SDKVersionType | undefined;
  scwUrl: ScwUrlType | undefined;
  config: Preference;
  setSDKVersion: Dispatch<SetStateAction<SDKVersionType>>;
  setScwUrlAndSave: Dispatch<SetStateAction<ScwUrlType>>;
  setConfig: Dispatch<SetStateAction<Preference>>;
  subAccountsConfig: SubAccountOptions;
  setSubAccountsConfig: Dispatch<SetStateAction<SubAccountOptions>>;
};

const ConfigContext = createContext<ConfigContextType | null>(null);

export const ConfigContextProvider = ({ children }: ConfigContextProviderProps) => {
  const [version, setVersion] = useState<SDKVersionType | undefined>(undefined);
  const [scwUrl, setScwUrl] = useState<ScwUrlType | undefined>(undefined);
  const [config, setConfig] = useState<Preference>({
    attribution: {
      auto: false,
    },
  });
  const [subAccountsConfig, setSAConfig] = useState<SubAccountOptions | undefined>(undefined);

  useEffect(
    function initializeSDKVersion() {
      if (version === undefined) {
        const savedVersion = localStorage.getItem(SELECTED_SDK_KEY) as SDKVersionType;
        setVersion(
          sdkVersions.includes(savedVersion) ? (savedVersion as SDKVersionType) : sdkVersions[0]
        );
      }
    },
    [version]
  );

  useEffect(
    function initializeScwUrl() {
      if (scwUrl === undefined) {
        const savedScwUrl = localStorage.getItem(SELECTED_SCW_URL_KEY) as ScwUrlType;
        setScwUrl(scwUrls.includes(savedScwUrl) ? (savedScwUrl as ScwUrlType) : scwUrls[0]);
      }
    },
    [scwUrl]
  );

  const setSDKVersion = useCallback((version: SDKVersionType) => {
    cleanupSDKLocalStorage();
    localStorage.setItem(SELECTED_SDK_KEY, version);
    setVersion(version);
  }, []);

  const setScwUrlAndSave = useCallback((url: ScwUrlType) => {
    cleanupSDKLocalStorage();
    localStorage.setItem(SELECTED_SCW_URL_KEY, url);
    setScwUrl(url);
  }, []);

  const setSubAccountsConfig = useCallback(
    (...args: Parameters<Dispatch<SetStateAction<SubAccountOptions>>>) => {
      setSAConfig(...args);
    },
    []
  );

  const value = useMemo(() => {
    return {
      version,
      scwUrl,
      config,
      setSDKVersion,
      setScwUrlAndSave,
      setConfig,
      subAccountsConfig,
      setSubAccountsConfig,
    };
  }, [
    version,
    scwUrl,
    config,
    setSDKVersion,
    setScwUrlAndSave,
    subAccountsConfig,
    setSubAccountsConfig,
  ]);

  return <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>;
};

export function useConfig() {
  const context = useContext(ConfigContext);
  if (context === undefined) {
    throw new Error('useConfig must be used within a ConfigContextProvider');
  }
  return context;
}
