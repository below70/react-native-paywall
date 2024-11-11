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

const IstanbulPaywall: React.FC<PaywallProps> = ({
  visible,
  onContinue,
  onClose,
  headerText,
  descriptionText,
  priceText,
  imageComponent,
  textButtons,
  backgroundColor = '#FFFFFF',
  closeButtonBgColor = 'rgba(0, 0, 0, 0.5)',
  closeButtonTextColor = '#FFFFFF',
  closeButtonDelay = 0,
  displayCloseButton = true,
  buttonText = 'Continue',
  buttonBgColor = '#4CAF50',
  buttonTextColor = '#FFFFFF',
  buttonRadius = 55,
  buttonWidthPercentage = 80,
  textButtonColor = '#666666',
  textButtonUnderline = true,
}) => {
  const {width, height} = Dimensions.get('window');
  const insets = useSafeAreaInsets();

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
      <View style={[styles.container, {width, height, backgroundColor}]}>
        {/* Image Container */}
        <View style={[styles.imageContainer, {width, height: width}]}>
          {/* Render the custom image component with standardized styling */}
          {React.cloneElement(imageComponent as React.ReactElement, {
            style: [
              styles.image,
              (imageComponent as React.ReactElement).props.style,
              {
                width: width, // Setting the width to the screen width
                height: width, // Setting height to be the same as width
                borderBottomLeftRadius: 100,
                borderBottomRightRadius: 100,
              },
            ],
          })}
        </View>

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

        {/* Text Content */}
        <View style={styles.textContainer}>
          <View>
            <Text style={styles.headerText}>{headerText}</Text>
            <Text style={styles.descriptionText}>{descriptionText}</Text>
          </View>
          <View>
            <Text style={styles.priceText}>{priceText}</Text>
          </View>
        </View>

        {/* Continue Button and Links */}
        <View>
          <TouchableOpacity
            style={[
              styles.continueButton,
              {
                width: (width * buttonWidthPercentage) / 100,
                backgroundColor: buttonBgColor,
                borderRadius: buttonRadius,
              },
            ]}
            onPress={() => onContinue(0)}>
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
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
  textContainer: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666666',
    marginBottom: 15,
  },
  priceText: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: 20,
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
    marginBottom: 10,
  },
  linkText: {
    fontSize: 16,
  },
});

export default IstanbulPaywall;
