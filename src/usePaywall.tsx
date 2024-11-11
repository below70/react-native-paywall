import React, {useState, useCallback} from 'react';
import IstanbulPaywall from './IstanbulPaywall';
import {PaywallProps} from './types';
import LondonPaywall from './LondonPaywall';

interface UsePaywallReturn {
  showPaywall: (type: 'london' | 'istanbul') => void;
  hidePaywall: () => void;
  PaywallComponent: React.FC<
    Partial<PaywallProps & {type: 'london' | 'istanbul'}>
  >;
}

export const usePaywall = (): UsePaywallReturn => {
  const [visible, setVisible] = useState(false);
  const [paywallType, setPaywallType] = useState<'london' | 'istanbul'>(
    'london',
  ); // Default type

  const showPaywall = useCallback((type: 'london' | 'istanbul') => {
    setPaywallType(type);
    setVisible(true);
  }, []);
  const hidePaywall = useCallback(() => setVisible(false), []);

  const PaywallComponent: React.FC<
    Partial<PaywallProps & {type: 'london' | 'istanbul'}>
  > = props => {
    if (paywallType === 'london') {
      return (
        <LondonPaywall
          {...(props as PaywallProps)}
          visible={visible}
          onClose={hidePaywall}
        />
      );
    }
    return (
      <IstanbulPaywall
        {...(props as PaywallProps)}
        visible={visible}
        onClose={hidePaywall}
      />
    );
  };

  return {showPaywall, hidePaywall, PaywallComponent};
};
