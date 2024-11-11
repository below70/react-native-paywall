export interface PaywallProps {
  visible: boolean;
  onContinue: (selectedPlan: number) => void;
  onClose: () => void;
  headerText: string;
  descriptionText: string;
  priceText: string;
  imageComponent: React.ReactNode;
  textButtons: {
    title: string;
    onPress: () => void;
  }[];
  products: {
    identifier: string;
    product: {
      title: string;
      priceString: string;
    };
  }[];
  buttonText: string;
  backgroundColor?: string;
  closeButtonBgColor?: string;
  closeButtonTextColor?: string;
  closeButtonDelay?: number;
  displayCloseButton?: boolean;
  buttonBgColor?: string;
  buttonTextColor?: string;
  buttonRadius?: number;
  buttonWidthPercentage?: number;
  textButtonColor?: string;
  textButtonUnderline?: boolean;
}
