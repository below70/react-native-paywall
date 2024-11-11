import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Modal,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {PaywallProps} from './types';

const LondonPaywall: React.FC<PaywallProps> = ({
  visible,
  onContinue,
  onClose,
  headerText,
  descriptionText,
  imageComponent,
  textButtons,
  products,
  buttonText = 'Continue',
  backgroundColor = '#FFFFFF',
  closeButtonBgColor = 'rgba(0, 0, 0, 0.5)',
  closeButtonTextColor = '#FFFFFF',
  closeButtonDelay = 0,
  displayCloseButton = true,
  buttonBgColor = '#4CAF50',
  buttonTextColor = '#FFFFFF',
  buttonRadius = 55,
  buttonWidthPercentage = 80,
  textButtonColor = '#666666',
  textButtonUnderline = true,
}) => {
  const {width, height} = Dimensions.get('window');
  const insets = useSafeAreaInsets();
  const [selectedPlan, setSelectedPlan] = useState(0); // Default to the first product

  // State to manage close button visibility with delay
  const [showCloseButton, setShowCloseButton] = useState(
    displayCloseButton && closeButtonDelay === 0,
  );

  useEffect(() => {
    if (closeButtonDelay > 0) {
      const timer = setTimeout(() => {
        setShowCloseButton(true);
      }, closeButtonDelay);

      return () => clearTimeout(timer);
    }
  }, [closeButtonDelay]);

  if (!visible) return null;

  return (
    <Modal transparent visible={visible} animationType="slide">
      <View
        style={[
          styles.container,
          {width, height, backgroundColor, paddingTop: insets.top},
        ]}>
        {/* Close Button */}
        {showCloseButton && (
          <TouchableOpacity
            style={[
              styles.closeButton,
              {
                top: insets.top + 10,
                backgroundColor: closeButtonBgColor,
              },
            ]}
            onPress={onClose}>
            <Text
              style={[styles.closeButtonText, {color: closeButtonTextColor}]}>
              X
            </Text>
          </TouchableOpacity>
        )}

        {/* Image at the top with safe area padding */}
        <View style={[styles.imageContainer, {marginTop: insets.top}]}>
          {React.cloneElement(imageComponent as React.ReactElement, {
            style: [
              styles.image,
              (imageComponent as React.ReactElement).props.style,
              {borderRadius: 12},
            ],
          })}
        </View>

        {/* Header and Subheader Grouped */}
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>{headerText}</Text>
          <Text style={styles.descriptionText}>{descriptionText}</Text>
        </View>

        {/* Plan Selector in Column */}
        <View style={styles.planContainer}>
          {products.map((product, index) => (
            <TouchableOpacity
              key={product.identifier}
              style={[
                styles.planOption,
                selectedPlan === index && styles.selectedPlan,
              ]}
              onPress={() => setSelectedPlan(index)}>
              <Text
                style={[
                  styles.planText,
                  selectedPlan === index && styles.selectedPlanText,
                ]}>
                {product.product.title}
              </Text>
              <Text style={styles.planPrice}>
                {product.product.priceString}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Continue Button and Text Buttons */}
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={[
              styles.continueButton,
              {
                width: (width * buttonWidthPercentage) / 100,
                backgroundColor: buttonBgColor,
                borderRadius: buttonRadius,
              },
            ]}
            onPress={() => onContinue(selectedPlan)}>
            <Text style={[styles.continueText, {color: buttonTextColor}]}>
              {buttonText}
            </Text>
          </TouchableOpacity>

          <View style={styles.bottomLinksContainer}>
            {textButtons.map((button, index) => (
              <TouchableOpacity key={index} onPress={button.onPress}>
                <Text
                  style={[
                    styles.linkText,
                    {
                      color: textButtonColor,
                      textDecorationLine: textButtonUnderline
                        ? 'underline'
                        : 'none',
                    },
                  ]}>
                  {button.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  imageContainer: {
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 12,
  },
  closeButton: {
    position: 'absolute',
    left: 20,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  descriptionText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#666666',
    marginBottom: 5,
  },
  planContainer: {
    width: '100%',
    marginBottom: 20,
  },
  planOption: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  selectedPlan: {
    backgroundColor: '#000000',
  },
  planText: {
    fontSize: 20,
    color: 'gray',
  },
  selectedPlanText: {
    color: '#FFFFFF',
  },
  planPrice: {
    fontSize: 16,
    color: 'gray',
  },
  bottomContainer: {
    alignItems: 'center',
    width: '100%',
  },
  continueButton: {
    paddingVertical: 15,
    marginBottom: 20,
  },
  continueText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  bottomLinksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  linkText: {
    fontSize: 14,
    marginHorizontal: 10,
  },
});

export default LondonPaywall;
