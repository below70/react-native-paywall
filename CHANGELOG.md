## Changelog

All notable changes to this project will be documented in this file.

### [0.9.6] - 2024-11-21

#### Added

- Screenshots of paywalls (`Istanbul Paywall` and `London Paywall`) to the README for better visualization of the components.

---

### [0.9.5] - 2024-11-11

#### Added

- Support for multiple paywall components with unique customization.
- New props added for managing subscription options dynamically:
  - `products`: Array of available subscription products.
  - `selectedPlan`: Allows setting the selected subscription plan index.
  - `onContinue(selectedPlan)`: Updated to pass the selected subscription index.
  - `buttonText`: Customizable text for the main action button.
- Enhanced flexibility for displaying subscription plans in a column layout with product selection.

#### Changed

- `onContinue` callback now supports an argument to indicate the selected product index for handling different subscription plans.
- Updated `PaywallComponent` example to reflect the new prop structure and support multiple paywall types (e.g., `LondonPaywall`, `IstanbulPaywall`).

### [0.9.3] - 2024-11-11

#### Added

- New customizable props for `Paywall` component, including:

  - `backgroundColor`
  - `closeButtonBgColor`
  - `closeButtonTextColor`
  - `closeButtonDelay`
  - `displayCloseButton`
  - `buttonBgColor`
  - `buttonTextColor`
  - `buttonRadius`
  - `buttonWidthPercentage`
  - `textButtonColor`
  - `textButtonUnderline`

- `useSafeAreaInsets` added to ensure proper handling of device safe area.

### [0.9.1] - 2024-11-10

#### Changed

- Updated `peerDependencies` to support `react-native` versions from `0.70.0` to `0.76.x`.

### [0.9.0] - 2024-11-10

#### Added

- Initial release of `react-native-paywall` component with `visible`, `onContinue`, and `onClose` props.
- Basic paywall screen with customizable buttons and layout.
