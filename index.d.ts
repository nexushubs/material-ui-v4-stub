import { ComponentType, ComponentProps, Ref, CSSProperties as CSSProperties$1, HTMLAttributes, ReactNode, ElementType, ComponentPropsWithRef, ImgHTMLAttributes, ReactElement, FocusEventHandler, ChangeEvent, ReactEventHandler, InputHTMLAttributes, EventHandler, ReactInstance, ChangeEventHandler, KeyboardEventHandler, LabelHTMLAttributes, AnchorHTMLAttributes, SelectHTMLAttributes, MouseEvent, SyntheticEvent, MouseEventHandler, ThHTMLAttributes, TdHTMLAttributes, RefObject, TextareaHTMLAttributes } from 'react';

/**
 * `T extends ConsistentWith<T, U>` means that where `T` has overlapping properties with
 * `U`, their value types do not conflict.
 *
 * @internal
 */
type ConsistentWith<DecorationTargetProps, InjectedProps> = {
  [P in keyof DecorationTargetProps]: P extends keyof InjectedProps
    ? InjectedProps[P] extends DecorationTargetProps[P]
      ? DecorationTargetProps[P]
      : InjectedProps[P]
    : DecorationTargetProps[P];
};

/**
 * a function that takes {component} and returns a component that passes along
 * all the props to {component} except the {InjectedProps} and will accept
 * additional {AdditionalProps}
 */
type PropInjector<InjectedProps, AdditionalProps = {}> = <
  C extends ComponentType<ConsistentWith<ComponentProps<C>, InjectedProps>>
>(
  component: C
) => ComponentType<
  Omit<JSX.LibraryManagedAttributes<C, ComponentProps<C>>, keyof InjectedProps> &
    AdditionalProps
>;

/**
 * Remove properties `K` from `T`.
 *
 * @internal
 */
type Omit<T, K extends keyof any> = T extends any ? Pick<T, Exclude<keyof T, K>> : never;

/**
 * Generate a set of string literal types with the given default record `T` and
 * override record `U`.
 *
 * If the property value was `true`, the property key will be added to the
 * string union.
 *
 * @internal
 */
type OverridableStringUnion<T, U = {}> = GenerateStringUnion<Overwrite<T, U>>;

/**
 * Like `T & U`, but using the value types from `U` where their properties overlap.
 *
 * @internal
 */
type Overwrite<T, U> = Omit<T, keyof U> & U;

type GenerateStringUnion<T> = Extract<
  {
    [Key in keyof T]: true extends T[Key] ? Key : never;
  }[keyof T],
  string
>;

type ColorFormat = 'rgb' | 'rgba' | 'hsl' | 'hsla';
interface ColorObject {
  type: ColorFormat;
  values: [number, number, number] | [number, number, number, number];
}

declare function hexToRgb(hex: string): string;
declare function rgbToHex(color: string): string;
declare function hslToRgb(color: string): string;
declare function decomposeColor(color: string): ColorObject;
declare function recomposeColor(color: ColorObject): string;
declare function getContrastRatio(foreground: string, background: string): number;
declare function getLuminance(color: string): number;
declare function emphasize(color: string, coefficient?: number): string;
declare function fade(color: string, value: number): string;
declare function darken(color: string, coefficient: number): string;
declare function lighten(color: string, coefficient: number): string;

type BreakpointDefaults = Record<'xs' | 'sm' | 'md' | 'lg' | 'xl', true>;
interface BreakpointOverrides {}

type Breakpoint = OverridableStringUnion<BreakpointDefaults, BreakpointOverrides>;
type BreakpointValues = { [key in Breakpoint]: number };

interface Breakpoints {
  keys: Breakpoint[];
  values: BreakpointValues;
  up: (key: Breakpoint | number) => string;
  down: (key: Breakpoint | number) => string;
  between: (start: Breakpoint | number, end: Breakpoint | number) => string;
  only: (key: Breakpoint) => string;
  width: (key: Breakpoint) => number;
}

type BreakpointsOptions = Partial<
  {
    unit: string;
    step: number;
  } & Breakpoints
>;

/* tslint:disable:unified-signatures */

type SpacingArgument = number | string;

interface Spacing {
  (): number;
  (value: number): number;
  (topBottom: SpacingArgument, rightLeft: SpacingArgument): string;
  (top: SpacingArgument, rightLeft: SpacingArgument, bottom: SpacingArgument): string;
  (
    top: SpacingArgument,
    right: SpacingArgument,
    bottom: SpacingArgument,
    left: SpacingArgument
  ): string;
}

type SpacingOptions = number | ((factor: number) => string | number) | number[];

interface StandardLonghandProperties<TLength = string | 0> {
  /**
   * The CSS **`align-content`** property sets how the browser distributes space between and around content items along the cross-axis of a flexbox container, and the main-axis of a grid container.
   *
   * **Syntax**: `normal | <baseline-position> | <content-distribution> | <overflow-position>? <content-position>`
   *
   * **Initial value**: `normal`
   *
   * ---
   *
   * _Supported in Flex Layout_
   *
   * |  Chrome  | Firefox |  Safari   |  Edge  |   IE   |
   * | :------: | :-----: | :-------: | :----: | :----: |
   * |  **29**  | **28**  |   **9**   | **12** | **11** |
   * | 21 _-x-_ |         | 6.1 _-x-_ |        |        |
   *
   * ---
   *
   * _Supported in Grid Layout_
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **57** | **52**  | **10.1** | **16** | No  |
   *
   * ---
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/align-content
   */
  alignContent?: AlignContentProperty;
  /**
   * The CSS **`align-items`** property sets the `align-self` value on all direct children as a group. The align-self property sets the alignment of an item within its containing block. In Flexbox it controls the alignment of items on the Cross Axis, in Grid Layout it controls the alignment of items on the Block Axis within their grid area.
   *
   * **Syntax**: `normal | stretch | <baseline-position> | [ <overflow-position>? <self-position> ]`
   *
   * **Initial value**: `normal`
   *
   * ---
   *
   * _Supported in Flex Layout_
   *
   * |  Chrome  | Firefox | Safari  |  Edge  |   IE   |
   * | :------: | :-----: | :-----: | :----: | :----: |
   * |  **52**  | **20**  |  **9**  | **12** | **11** |
   * | 21 _-x-_ |         | 7 _-x-_ |        |        |
   *
   * ---
   *
   * _Supported in Grid Layout_
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **57** | **52**  | **10.1** | **16** | No  |
   *
   * ---
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/align-items
   */
  alignItems?: AlignItemsProperty;
  /**
   * The **`align-self`** CSS property aligns flex items of the current flex line overriding the `align-items` value. If any of the item's cross-axis margin is set to `auto`, then `align-self` is ignored. In Grid layout `align-self` aligns the item inside the grid area.
   *
   * **Syntax**: `auto | normal | stretch | <baseline-position> | <overflow-position>? <self-position>`
   *
   * **Initial value**: `auto`
   *
   * ---
   *
   * _Supported in Flex Layout_
   *
   * |  Chrome  | Firefox |  Safari   |  Edge  |   IE   |
   * | :------: | :-----: | :-------: | :----: | :----: |
   * |  **36**  | **20**  |   **9**   | **12** | **11** |
   * | 21 _-x-_ |         | 6.1 _-x-_ |        |        |
   *
   * ---
   *
   * _Supported in Grid Layout_
   *
   * | Chrome | Firefox |  Safari  |  Edge  |      IE      |
   * | :----: | :-----: | :------: | :----: | :----------: |
   * | **57** | **52**  | **10.1** | **16** | **10** _-x-_ |
   *
   * ---
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/align-self
   */
  alignSelf?: AlignSelfProperty;
  /**
   * The **`animation-delay`** CSS property sets when an animation starts. The animation can start later, immediately from its beginning, or immediately and partway through the animation.
   *
   * **Syntax**: `<time>#`
   *
   * **Initial value**: `0s`
   *
   * | Chrome  | Firefox | Safari  |  Edge  |   IE   |
   * | :-----: | :-----: | :-----: | :----: | :----: |
   * | **43**  | **16**  |  **9**  | **12** | **10** |
   * | 3 _-x-_ | 5 _-x-_ | 4 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/animation-delay
   */
  animationDelay?: GlobalsString;
  /**
   * The **`animation-direction`** CSS property sets whether an animation should play forwards, backwards, or alternating back and forth.
   *
   * **Syntax**: `<single-animation-direction>#`
   *
   * **Initial value**: `normal`
   *
   * | Chrome  | Firefox | Safari  |  Edge  |   IE   |
   * | :-----: | :-----: | :-----: | :----: | :----: |
   * | **43**  | **16**  |  **9**  | **12** | **10** |
   * | 3 _-x-_ | 5 _-x-_ | 4 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/animation-direction
   */
  animationDirection?: AnimationDirectionProperty;
  /**
   * The **`animation-duration`** CSS property sets the length of time that an animation takes to complete one cycle.
   *
   * **Syntax**: `<time>#`
   *
   * **Initial value**: `0s`
   *
   * | Chrome  | Firefox | Safari  |  Edge  |   IE   |
   * | :-----: | :-----: | :-----: | :----: | :----: |
   * | **43**  | **16**  |  **9**  | **12** | **10** |
   * | 3 _-x-_ | 5 _-x-_ | 4 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/animation-duration
   */
  animationDuration?: GlobalsString;
  /**
   * The **`animation-fill-mode`** CSS property sets how a CSS animation applies styles to its target before and after its execution.
   *
   * **Syntax**: `<single-animation-fill-mode>#`
   *
   * **Initial value**: `none`
   *
   * | Chrome  | Firefox | Safari  |  Edge  |   IE   |
   * | :-----: | :-----: | :-----: | :----: | :----: |
   * | **43**  | **16**  |  **9**  | **12** | **10** |
   * | 3 _-x-_ | 5 _-x-_ | 5 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/animation-fill-mode
   */
  animationFillMode?: AnimationFillModeProperty;
  /**
   * The **`animation-iteration-count`** CSS property sets the number of times an animation cycle should be played before stopping.
   *
   * **Syntax**: `<single-animation-iteration-count>#`
   *
   * **Initial value**: `1`
   *
   * | Chrome  | Firefox | Safari  |  Edge  |   IE   |
   * | :-----: | :-----: | :-----: | :----: | :----: |
   * | **43**  | **16**  |  **9**  | **12** | **10** |
   * | 3 _-x-_ | 5 _-x-_ | 4 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/animation-iteration-count
   */
  animationIterationCount?: AnimationIterationCountProperty;
  /**
   * The **`animation-name`** CSS property sets one or more animations to apply to an element. Each name is an `@keyframes` at-rule that sets the property values for the animation sequence.
   *
   * **Syntax**: `[ none | <keyframes-name> ]#`
   *
   * **Initial value**: `none`
   *
   * | Chrome  | Firefox | Safari  |  Edge  |   IE   |
   * | :-----: | :-----: | :-----: | :----: | :----: |
   * | **43**  | **16**  |  **9**  | **12** | **10** |
   * | 3 _-x-_ | 5 _-x-_ | 4 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/animation-name
   */
  animationName?: AnimationNameProperty;
  /**
   * The **`animation-play-state`** CSS property sets whether an animation is running or paused.
   *
   * **Syntax**: `<single-animation-play-state>#`
   *
   * **Initial value**: `running`
   *
   * | Chrome  | Firefox | Safari  |  Edge  |   IE   |
   * | :-----: | :-----: | :-----: | :----: | :----: |
   * | **43**  | **16**  |  **9**  | **12** | **10** |
   * | 3 _-x-_ | 5 _-x-_ | 4 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/animation-play-state
   */
  animationPlayState?: AnimationPlayStateProperty;
  /**
   * The `**animation-timing-function**` CSS property sets how an animation progresses through the duration of each cycle.
   *
   * **Syntax**: `<timing-function>#`
   *
   * **Initial value**: `ease`
   *
   * | Chrome  | Firefox | Safari  |  Edge  |   IE   |
   * | :-----: | :-----: | :-----: | :----: | :----: |
   * | **43**  | **16**  |  **9**  | **12** | **10** |
   * | 3 _-x-_ | 5 _-x-_ | 4 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/animation-timing-function
   */
  animationTimingFunction?: AnimationTimingFunctionProperty;
  /**
   * The **`-moz-appearance`** CSS property is used in Gecko (Firefox) to display an element using platform-native styling based on the operating system's theme.
   *
   * **Syntax**: `none | auto | button | textfield | <compat>`
   *
   * **Initial value**: `auto`
   *
   * |   Chrome    |   Firefox   |   Safari    |     Edge     | IE  |
   * | :---------: | :---------: | :---------: | :----------: | :-: |
   * | **1** _-x-_ | **1** _-x-_ | **3** _-x-_ | **12** _-x-_ | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/appearance
   */
  appearance?: AppearanceProperty;
  /**
   * The **`aspect-ratio`**    CSS property sets a _**preferred aspect ratio**_ for the box, which will be used in the calculation of auto sizes and some other layout functions.
   *
   * **Syntax**: `auto | <ratio>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **79** | **71**  |   No   | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/aspect-ratio
   */
  aspectRatio?: AspectRatioProperty;
  /**
   * The **`backdrop-filter`** CSS property lets you apply graphical effects such as blurring or color shifting to the area behind an element. Because it applies to everything _behind_ the element, to see the effect you must make the element or its background at least partially transparent.
   *
   * **Syntax**: `none | <filter-function-list>`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox |   Safari    |  Edge  | IE  |
   * | :----: | :-----: | :---------: | :----: | :-: |
   * | **76** |   n/a   | **9** _-x-_ | **17** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/backdrop-filter
   */
  backdropFilter?: BackdropFilterProperty;
  /**
   * The **`backface-visibility`** CSS property sets whether the back face of an element is visible when turned towards the user.
   *
   * **Syntax**: `visible | hidden`
   *
   * **Initial value**: `visible`
   *
   * |  Chrome  | Firefox  |    Safari     |  Edge  |   IE   |
   * | :------: | :------: | :-----------: | :----: | :----: |
   * |  **36**  |  **16**  | **5.1** _-x-_ | **12** | **10** |
   * | 12 _-x-_ | 10 _-x-_ |               |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/backface-visibility
   */
  backfaceVisibility?: BackfaceVisibilityProperty;
  /**
   * The **`background-attachment`** CSS property sets whether a background image's position is fixed within the viewport, or scrolls with its containing block.
   *
   * **Syntax**: `<attachment>#`
   *
   * **Initial value**: `scroll`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/background-attachment
   */
  backgroundAttachment?: BackgroundAttachmentProperty;
  /**
   * The **`background-blend-mode`** CSS property sets how an element's background images should blend with each other and with the element's background color.
   *
   * **Syntax**: `<blend-mode>#`
   *
   * **Initial value**: `normal`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **35** | **30**  | **8**  | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/background-blend-mode
   */
  backgroundBlendMode?: BackgroundBlendModeProperty;
  /**
   * The **`background-clip`** CSS property sets whether an element's background `<color>` or `<image>` extends underneath its border.
   *
   * **Syntax**: `<box>#`
   *
   * **Initial value**: `border-box`
   *
   * | Chrome | Firefox |   Safari    |  Edge  |  IE   |
   * | :----: | :-----: | :---------: | :----: | :---: |
   * | **1**  |  **4**  | **3** _-x-_ | **12** | **9** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/background-clip
   */
  backgroundClip?: BackgroundClipProperty;
  /**
   * The **`background-color`** CSS property sets the background color of an element.
   *
   * **Syntax**: `<color>`
   *
   * **Initial value**: `transparent`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/background-color
   */
  backgroundColor?: BackgroundColorProperty;
  /**
   * The **`background-image`** CSS property sets one or more background images on an element.
   *
   * **Syntax**: `<bg-image>#`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/background-image
   */
  backgroundImage?: BackgroundImageProperty;
  /**
   * The **`background-origin`** CSS property sets the _background positioning area_. In other words, it sets the origin position of an image set with the `background-image` property.
   *
   * **Syntax**: `<box>#`
   *
   * **Initial value**: `padding-box`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **4**  | **3**  | **12** | **9** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/background-origin
   */
  backgroundOrigin?: BackgroundOriginProperty;
  /**
   * The **`background-position`** CSS property sets the initial position for each background image. The position is relative to the position layer set by `background-origin`.
   *
   * **Syntax**: `<bg-position>#`
   *
   * **Initial value**: `0% 0%`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/background-position
   */
  backgroundPosition?: BackgroundPositionProperty<TLength>;
  /**
   * The **`background-position-x`** CSS property sets the initial horizontal position for each background image. The position is relative to the position layer set by `background-origin`.
   *
   * **Syntax**: `[ center | [ [ left | right | x-start | x-end ]? <length-percentage>? ]! ]#`
   *
   * **Initial value**: `left`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  | **49**  | **1**  | **12** | **6** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/background-position-x
   */
  backgroundPositionX?: BackgroundPositionXProperty<TLength>;
  /**
   * The **`background-position-y`** CSS property sets the initial vertical position, relative to the background position layer defined by `background-origin`, for each defined background image.
   *
   * **Syntax**: `[ center | [ [ top | bottom | y-start | y-end ]? <length-percentage>? ]! ]#`
   *
   * **Initial value**: `top`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  | **49**  | **1**  | **12** | **6** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/background-position-y
   */
  backgroundPositionY?: BackgroundPositionYProperty<TLength>;
  /**
   * The **`background-repeat`** CSS property sets how background images are repeated. A background image can be repeated along the horizontal and vertical axes, or not repeated at all.
   *
   * **Syntax**: `<repeat-style>#`
   *
   * **Initial value**: `repeat`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/background-repeat
   */
  backgroundRepeat?: BackgroundRepeatProperty;
  /**
   * The **`background-size`** CSS property sets the size of the element's background image. The image can be left to its natural size, stretched, or constrained to fit the available space.
   *
   * **Syntax**: `<bg-size>#`
   *
   * **Initial value**: `auto auto`
   *
   * | Chrome  | Firefox | Safari  |  Edge  |  IE   |
   * | :-----: | :-----: | :-----: | :----: | :---: |
   * |  **3**  |  **4**  |  **5**  | **12** | **9** |
   * | 1 _-x-_ |         | 3 _-x-_ |        |       |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/background-size
   */
  backgroundSize?: BackgroundSizeProperty<TLength>;
  /**
   * **Syntax**: `clip | ellipsis | <string>`
   *
   * **Initial value**: `clip`
   */
  blockOverflow?: BlockOverflowProperty;
  /**
   * The **`block-size`** CSS property defines the horizontal or vertical size of an element's block, depending on its writing mode. It corresponds to either the `width` or the `height` property, depending on the value of `writing-mode`.
   *
   * **Syntax**: `<'width'>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **57** | **41**  | **12.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/block-size
   */
  blockSize?: BlockSizeProperty<TLength>;
  /**
   * The **`border-block-color`** CSS property defines the color of the logical block borders of an element, which maps to a physical border color depending on the element's writing mode, directionality, and text orientation. It corresponds to the `border-top-color` and `border-bottom-color`, or `border-right-color` and `border-left-color` property depending on the values defined for `writing-mode`, `direction`, and `text-orientation`.
   *
   * **Syntax**: `<'border-top-color'>{1,2}`
   *
   * **Initial value**: `currentcolor`
   *
   * | Chrome | Firefox | Safari | Edge | IE  |
   * | :----: | :-----: | :----: | :--: | :-: |
   * |  n/a   | **66**  |   No   | n/a  | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/border-block-color
   */
  borderBlockColor?: BorderBlockColorProperty;
  /**
   * The **`border-block-end-color`** CSS property defines the color of the logical block-end border of an element, which maps to a physical border color depending on the element's writing mode, directionality, and text orientation. It corresponds to the `border-top-color`, `border-right-color`, `border-bottom-color`, or `border-left-color` property depending on the values defined for `writing-mode`, `direction`, and `text-orientation`.
   *
   * **Syntax**: `<'border-top-color'>`
   *
   * **Initial value**: `currentcolor`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **69** | **41**  | **12.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/border-block-end-color
   */
  borderBlockEndColor?: BorderBlockEndColorProperty;
  /**
   * The **`border-block-end-style`** CSS property defines the style of the logical block end border of an element, which maps to a physical border style depending on the element's writing mode, directionality, and text orientation. It corresponds to the `border-top-style`, `border-right-style`, `border-bottom-style`, or `border-left-style` property depending on the values defined for `writing-mode`, `direction`, and `text-orientation`.
   *
   * **Syntax**: `<'border-top-style'>`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **69** | **41**  | **12.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/border-block-end-style
   */
  borderBlockEndStyle?: BorderBlockEndStyleProperty;
  /**
   * The **`border-block-end-width`** CSS property defines the width of the logical block-end border of an element, which maps to a physical border width depending on the element's writing mode, directionality, and text orientation. It corresponds to the `border-top-width`, `border-right-width`, `border-bottom-width`, or `border-left-width` property depending on the values defined for `writing-mode`, `direction`, and `text-orientation`.
   *
   * **Syntax**: `<'border-top-width'>`
   *
   * **Initial value**: `medium`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **69** | **41**  | **12.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/border-block-end-width
   */
  borderBlockEndWidth?: BorderBlockEndWidthProperty<TLength>;
  /**
   * The **`border-block-start-color`** CSS property defines the color of the logical block-start border of an element, which maps to a physical border color depending on the element's writing mode, directionality, and text orientation. It corresponds to the `border-top-color`, `border-right-color`, `border-bottom-color`, or `border-left-color` property depending on the values defined for `writing-mode`, `direction`, and `text-orientation`.
   *
   * **Syntax**: `<'border-top-color'>`
   *
   * **Initial value**: `currentcolor`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **69** | **41**  | **12.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/border-block-start-color
   */
  borderBlockStartColor?: BorderBlockStartColorProperty;
  /**
   * The **`border-block-start-style`** CSS property defines the style of the logical block start border of an element, which maps to a physical border style depending on the element's writing mode, directionality, and text orientation. It corresponds to the `border-top-style`, `border-right-style`, `border-bottom-style`, or `border-left-style` property depending on the values defined for `writing-mode`, `direction`, and `text-orientation`.
   *
   * **Syntax**: `<'border-top-style'>`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **69** | **41**  | **12.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/border-block-start-style
   */
  borderBlockStartStyle?: BorderBlockStartStyleProperty;
  /**
   * The **`border-block-start-width`** CSS property defines the width of the logical block-start border of an element, which maps to a physical border width depending on the element's writing mode, directionality, and text orientation. It corresponds to the `border-top-width`, `border-right-width`, `border-bottom-width`, or `border-left-width` property depending on the values defined for `writing-mode`, `direction`, and `text-orientation`.
   *
   * **Syntax**: `<'border-top-width'>`
   *
   * **Initial value**: `medium`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **69** | **41**  | **12.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/border-block-start-width
   */
  borderBlockStartWidth?: BorderBlockStartWidthProperty<TLength>;
  /**
   * The **`border-block-style`** CSS property defines the style of the logical block borders of an element, which maps to a physical border style depending on the element's writing mode, directionality, and text orientation. It corresponds to the `border-top-style` and `border-bottom-style`, or `border-left-style` and `border-right-style` properties depending on the values defined for `writing-mode`, `direction`, and `text-orientation`.
   *
   * **Syntax**: `<'border-top-style'>`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **69** | **66**  |   No   | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/border-block-style
   */
  borderBlockStyle?: BorderBlockStyleProperty;
  /**
   * The **`border-block-width`** CSS property defines the width of the logical block borders of an element, which maps to a physical border width depending on the element's writing mode, directionality, and text orientation. It corresponds to the `border-top-width` and `border-bottom-width`, or `border-left-width`, and `border-right-width` property depending on the values defined for `writing-mode`, `direction`, and `text-orientation`.
   *
   * **Syntax**: `<'border-top-width'>`
   *
   * **Initial value**: `medium`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **69** | **66**  |   No   | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/border-block-width
   */
  borderBlockWidth?: BorderBlockWidthProperty<TLength>;
  /**
   * The **`border-bottom-color`** CSS property sets the color of an element's bottom border. It can also be set with the shorthand CSS properties `border-color` or `border-bottom`.
   *
   * **Syntax**: `<'border-top-color'>`
   *
   * **Initial value**: `currentcolor`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/border-bottom-color
   */
  borderBottomColor?: BorderBottomColorProperty;
  /**
   * The **`border-bottom-left-radius`** CSS property rounds the bottom-left corner of an element.
   *
   * **Syntax**: `<length-percentage>{1,2}`
   *
   * **Initial value**: `0`
   *
   * | Chrome  | Firefox | Safari  |  Edge  |  IE   |
   * | :-----: | :-----: | :-----: | :----: | :---: |
   * |  **4**  |  **4**  |  **5**  | **12** | **9** |
   * | 1 _-x-_ |         | 3 _-x-_ |        |       |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/border-bottom-left-radius
   */
  borderBottomLeftRadius?: BorderBottomLeftRadiusProperty<TLength>;
  /**
   * The **`border-bottom-right-radius`** CSS property rounds the bottom-right corner of an element.
   *
   * **Syntax**: `<length-percentage>{1,2}`
   *
   * **Initial value**: `0`
   *
   * | Chrome  | Firefox | Safari  |  Edge  |  IE   |
   * | :-----: | :-----: | :-----: | :----: | :---: |
   * |  **4**  |  **4**  |  **5**  | **12** | **9** |
   * | 1 _-x-_ |         | 3 _-x-_ |        |       |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/border-bottom-right-radius
   */
  borderBottomRightRadius?: BorderBottomRightRadiusProperty<TLength>;
  /**
   * The **`border-bottom-style`** CSS property sets the line style of an element's bottom `border`.
   *
   * **Syntax**: `<line-style>`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari |  Edge  |   IE    |
   * | :----: | :-----: | :----: | :----: | :-----: |
   * | **1**  |  **1**  | **1**  | **12** | **5.5** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/border-bottom-style
   */
  borderBottomStyle?: BorderBottomStyleProperty;
  /**
   * The **`border-bottom-width`** CSS property sets the width of the bottom border of a box.
   *
   * **Syntax**: `<line-width>`
   *
   * **Initial value**: `medium`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/border-bottom-width
   */
  borderBottomWidth?: BorderBottomWidthProperty<TLength>;
  /**
   * The **`border-collapse`** CSS property sets whether cells inside a `<table>` have shared or separate borders.
   *
   * **Syntax**: `collapse | separate`
   *
   * **Initial value**: `separate`
   *
   * | Chrome | Firefox | Safari  |  Edge  |  IE   |
   * | :----: | :-----: | :-----: | :----: | :---: |
   * | **1**  |  **1**  | **1.2** | **12** | **5** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/border-collapse
   */
  borderCollapse?: BorderCollapseProperty;
  /**
   * The **`border-end-end-radius`** CSS property defines a logical border radius on an element, which maps to a physical border radius that depends on on the element's `writing-mode`, `direction`, and `text-orientation`.
   *
   * **Syntax**: `<length-percentage>{1,2}`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari | Edge | IE  |
   * | :----: | :-----: | :----: | :--: | :-: |
   * |   No   | **66**  |   No   |  No  | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/border-end-end-radius
   */
  borderEndEndRadius?: BorderEndEndRadiusProperty<TLength>;
  /**
   * The **`border-end-start-radius`** CSS property defines a logical border radius on an element, which maps to a physical border radius depending on the element's `writing-mode`, `direction`, and `text-orientation`.
   *
   * **Syntax**: `<length-percentage>{1,2}`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari | Edge | IE  |
   * | :----: | :-----: | :----: | :--: | :-: |
   * |   No   | **66**  |   No   |  No  | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/border-end-start-radius
   */
  borderEndStartRadius?: BorderEndStartRadiusProperty<TLength>;
  /**
   * The **`border-image-outset`** CSS property sets the distance by which an element's border image is set out from its border box.
   *
   * **Syntax**: `[ <length> | <number> ]{1,4}`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  |   IE   |
   * | :----: | :-----: | :----: | :----: | :----: |
   * | **15** | **15**  | **6**  | **12** | **11** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/border-image-outset
   */
  borderImageOutset?: BorderImageOutsetProperty<TLength>;
  /**
   * The **`border-image-repeat`** CSS property defines how the edge regions of a source image are adjusted to fit the dimensions of an element's border image.
   *
   * **Syntax**: `[ stretch | repeat | round | space ]{1,2}`
   *
   * **Initial value**: `stretch`
   *
   * | Chrome | Firefox | Safari |  Edge  |   IE   |
   * | :----: | :-----: | :----: | :----: | :----: |
   * | **15** | **15**  | **6**  | **12** | **11** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/border-image-repeat
   */
  borderImageRepeat?: BorderImageRepeatProperty;
  /**
   * The **`border-image-slice`** CSS property divides the image specified by `border-image-source` into regions. These regions form the components of an element's border image.
   *
   * **Syntax**: `<number-percentage>{1,4} && fill?`
   *
   * **Initial value**: `100%`
   *
   * | Chrome | Firefox | Safari |  Edge  |   IE   |
   * | :----: | :-----: | :----: | :----: | :----: |
   * | **15** | **15**  | **6**  | **12** | **11** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/border-image-slice
   */
  borderImageSlice?: BorderImageSliceProperty;
  /**
   * The **`border-image-source`** CSS property sets the source image used to create an element's border image.
   *
   * **Syntax**: `none | <image>`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari |  Edge  |   IE   |
   * | :----: | :-----: | :----: | :----: | :----: |
   * | **15** | **15**  | **6**  | **12** | **11** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/border-image-source
   */
  borderImageSource?: BorderImageSourceProperty;
  /**
   * The **`border-image-width`** CSS property sets the width of an element's border image.
   *
   * **Syntax**: `[ <length-percentage> | <number> | auto ]{1,4}`
   *
   * **Initial value**: `1`
   *
   * | Chrome | Firefox | Safari |  Edge  |   IE   |
   * | :----: | :-----: | :----: | :----: | :----: |
   * | **15** | **13**  | **6**  | **12** | **11** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/border-image-width
   */
  borderImageWidth?: BorderImageWidthProperty<TLength>;
  /**
   * The **`border-inline-color`** CSS property defines the color of the logical inline borders of an element, which maps to a physical border color depending on the element's writing mode, directionality, and text orientation. It corresponds to the `border-top-color` and `border-bottom-color`, or `border-right-color` and `border-left-color` property depending on the values defined for `writing-mode`, `direction`, and `text-orientation`.
   *
   * **Syntax**: `<'border-top-color'>{1,2}`
   *
   * **Initial value**: `currentcolor`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **69** | **66**  |   No   | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/border-inline-color
   */
  borderInlineColor?: BorderInlineColorProperty;
  /**
   * The **`border-inline-end-color`** CSS property defines the color of the logical inline-end border of an element, which maps to a physical border color depending on the element's writing mode, directionality, and text orientation. It corresponds to the `border-top-color`, `border-right-color`, `border-bottom-color`, or `border-left-color` property depending on the values defined for `writing-mode`, `direction`, and `text-orientation`.
   *
   * **Syntax**: `<'border-top-color'>`
   *
   * **Initial value**: `currentcolor`
   *
   * | Chrome |           Firefox           |  Safari  |  Edge  | IE  |
   * | :----: | :-------------------------: | :------: | :----: | :-: |
   * | **69** |           **41**            | **12.1** | **79** | No  |
   * |        | 3 _(-moz-border-end-color)_ |          |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/border-inline-end-color
   */
  borderInlineEndColor?: BorderInlineEndColorProperty;
  /**
   * The **`border-inline-end-style`** CSS property defines the style of the logical inline end border of an element, which maps to a physical border style depending on the element's writing mode, directionality, and text orientation. It corresponds to the `border-top-style`, `border-right-style`, `border-bottom-style`, or `border-left-style` property depending on the values defined for `writing-mode`, `direction`, and `text-orientation`.
   *
   * **Syntax**: `<'border-top-style'>`
   *
   * **Initial value**: `none`
   *
   * | Chrome |           Firefox           |  Safari  |  Edge  | IE  |
   * | :----: | :-------------------------: | :------: | :----: | :-: |
   * | **69** |           **41**            | **12.1** | **79** | No  |
   * |        | 3 _(-moz-border-end-style)_ |          |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/border-inline-end-style
   */
  borderInlineEndStyle?: BorderInlineEndStyleProperty;
  /**
   * The **`border-inline-end-width`** CSS property defines the width of the logical inline-end border of an element, which maps to a physical border width depending on the element's writing mode, directionality, and text orientation. It corresponds to the `border-top-width`, `border-right-width`, `border-bottom-width`, or `border-left-width` property depending on the values defined for `writing-mode`, `direction`, and `text-orientation`.
   *
   * **Syntax**: `<'border-top-width'>`
   *
   * **Initial value**: `medium`
   *
   * | Chrome |           Firefox           |  Safari  |  Edge  | IE  |
   * | :----: | :-------------------------: | :------: | :----: | :-: |
   * | **69** |           **41**            | **12.1** | **79** | No  |
   * |        | 3 _(-moz-border-end-width)_ |          |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/border-inline-end-width
   */
  borderInlineEndWidth?: BorderInlineEndWidthProperty<TLength>;
  /**
   * The **`border-inline-start-color`** CSS property defines the color of the logical inline start border of an element, which maps to a physical border color depending on the element's writing mode, directionality, and text orientation. It corresponds to the `border-top-color`, `border-right-color`, `border-bottom-color`, or `border-left-color` property depending on the values defined for `writing-mode`, `direction`, and `text-orientation`.
   *
   * **Syntax**: `<'border-top-color'>`
   *
   * **Initial value**: `currentcolor`
   *
   * | Chrome |            Firefox            |  Safari  |  Edge  | IE  |
   * | :----: | :---------------------------: | :------: | :----: | :-: |
   * | **69** |            **41**             | **12.1** | **79** | No  |
   * |        | 3 _(-moz-border-start-color)_ |          |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/border-inline-start-color
   */
  borderInlineStartColor?: BorderInlineStartColorProperty;
  /**
   * The **`border-inline-start-style`** CSS property defines the style of the logical inline start border of an element, which maps to a physical border style depending on the element's writing mode, directionality, and text orientation. It corresponds to the `border-top-style`, `border-right-style`, `border-bottom-style`, or `border-left-style` property depending on the values defined for `writing-mode`, `direction`, and `text-orientation`.
   *
   * **Syntax**: `<'border-top-style'>`
   *
   * **Initial value**: `none`
   *
   * | Chrome |            Firefox            |  Safari  |  Edge  | IE  |
   * | :----: | :---------------------------: | :------: | :----: | :-: |
   * | **69** |            **41**             | **12.1** | **79** | No  |
   * |        | 3 _(-moz-border-start-style)_ |          |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/border-inline-start-style
   */
  borderInlineStartStyle?: BorderInlineStartStyleProperty;
  /**
   * The **`border-inline-start-width`** CSS property defines the width of the logical inline-start border of an element, which maps to a physical border width depending on the element's writing mode, directionality, and text orientation. It corresponds to the `border-top-width`, `border-right-width`, `border-bottom-width`, or `border-left-width` property depending on the values defined for `writing-mode`, `direction`, and `text-orientation`.
   *
   * **Syntax**: `<'border-top-width'>`
   *
   * **Initial value**: `medium`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **69** | **41**  | **12.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/border-inline-start-width
   */
  borderInlineStartWidth?: BorderInlineStartWidthProperty<TLength>;
  /**
   * The **`border-inline-style`** CSS property defines the style of the logical inline borders of an element, which maps to a physical border style depending on the element's writing mode, directionality, and text orientation. It corresponds to the `border-top-style` and `border-bottom-style`, or `border-left-style` and `border-right-style` properties depending on the values defined for `writing-mode`, `direction`, and `text-orientation`.
   *
   * **Syntax**: `<'border-top-style'>`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **69** | **66**  |   No   | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/border-inline-style
   */
  borderInlineStyle?: BorderInlineStyleProperty;
  /**
   * The **`border-inline-width`** CSS property defines the width of the logical inline borders of an element, which maps to a physical border width depending on the element's writing mode, directionality, and text orientation. It corresponds to the `border-top-width` and `border-bottom-width`, or `border-left-width`, and `border-right-width` property depending on the values defined for `writing-mode`, `direction`, and `text-orientation`.
   *
   * **Syntax**: `<'border-top-width'>`
   *
   * **Initial value**: `medium`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **69** | **66**  |   No   | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/border-inline-width
   */
  borderInlineWidth?: BorderInlineWidthProperty<TLength>;
  /**
   * The **`border-left-color`** CSS property sets the color of an element's left border. It can also be set with the shorthand CSS properties `border-color` or `border-left`.
   *
   * **Syntax**: `<color>`
   *
   * **Initial value**: `currentcolor`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/border-left-color
   */
  borderLeftColor?: BorderLeftColorProperty;
  /**
   * The **`border-left-style`** CSS property sets the line style of an element's left `border`.
   *
   * **Syntax**: `<line-style>`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari |  Edge  |   IE    |
   * | :----: | :-----: | :----: | :----: | :-----: |
   * | **1**  |  **1**  | **1**  | **12** | **5.5** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/border-left-style
   */
  borderLeftStyle?: BorderLeftStyleProperty;
  /**
   * The **`border-left-width`** CSS property sets the width of the left border of an element.
   *
   * **Syntax**: `<line-width>`
   *
   * **Initial value**: `medium`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/border-left-width
   */
  borderLeftWidth?: BorderLeftWidthProperty<TLength>;
  /**
   * The **`border-right-color`** CSS property sets the color of an element's right border. It can also be set with the shorthand CSS properties `border-color` or `border-right`.
   *
   * **Syntax**: `<color>`
   *
   * **Initial value**: `currentcolor`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/border-right-color
   */
  borderRightColor?: BorderRightColorProperty;
  /**
   * The **`border-right-style`** CSS property sets the line style of an element's right `border`.
   *
   * **Syntax**: `<line-style>`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari |  Edge  |   IE    |
   * | :----: | :-----: | :----: | :----: | :-----: |
   * | **1**  |  **1**  | **1**  | **12** | **5.5** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/border-right-style
   */
  borderRightStyle?: BorderRightStyleProperty;
  /**
   * The **`border-right-width`** CSS property sets the width of the right border of an element.
   *
   * **Syntax**: `<line-width>`
   *
   * **Initial value**: `medium`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/border-right-width
   */
  borderRightWidth?: BorderRightWidthProperty<TLength>;
  /**
   * The **`border-spacing`** CSS property sets the distance between the borders of adjacent `<table>` cells. This property applies only when `border-collapse` is `separate`.
   *
   * **Syntax**: `<length> <length>?`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **8** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/border-spacing
   */
  borderSpacing?: BorderSpacingProperty<TLength>;
  /**
   * The **`border-start-end-radius`** CSS property defines a logical border radius on an element, which maps to a physical border radius depending on the element's `writing-mode`, `direction`, and `text-orientation`.
   *
   * **Syntax**: `<length-percentage>{1,2}`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari | Edge | IE  |
   * | :----: | :-----: | :----: | :--: | :-: |
   * |   No   | **66**  |   No   |  No  | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/border-start-end-radius
   */
  borderStartEndRadius?: BorderStartEndRadiusProperty<TLength>;
  /**
   * The **`border-start-start-radius`** CSS property defines a logical border radius on an element, which maps to a physical border radius that depends on the element's `writing-mode`, `direction`, and `text-orientation`.
   *
   * **Syntax**: `<length-percentage>{1,2}`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari | Edge | IE  |
   * | :----: | :-----: | :----: | :--: | :-: |
   * |   No   | **66**  |   No   |  No  | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/border-start-start-radius
   */
  borderStartStartRadius?: BorderStartStartRadiusProperty<TLength>;
  /**
   * The **`border-top-color`** CSS property sets the color of an element's top border. It can also be set with the shorthand CSS properties `border-color` or `border-top`.
   *
   * **Syntax**: `<color>`
   *
   * **Initial value**: `currentcolor`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/border-top-color
   */
  borderTopColor?: BorderTopColorProperty;
  /**
   * The **`border-top-left-radius`** CSS property rounds the top-left corner of an element.
   *
   * **Syntax**: `<length-percentage>{1,2}`
   *
   * **Initial value**: `0`
   *
   * | Chrome  | Firefox | Safari  |  Edge  |  IE   |
   * | :-----: | :-----: | :-----: | :----: | :---: |
   * |  **4**  |  **4**  |  **5**  | **12** | **9** |
   * | 1 _-x-_ |         | 3 _-x-_ |        |       |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/border-top-left-radius
   */
  borderTopLeftRadius?: BorderTopLeftRadiusProperty<TLength>;
  /**
   * The **`border-top-right-radius`** CSS property rounds the top-right corner of an element.
   *
   * **Syntax**: `<length-percentage>{1,2}`
   *
   * **Initial value**: `0`
   *
   * | Chrome  | Firefox | Safari  |  Edge  |  IE   |
   * | :-----: | :-----: | :-----: | :----: | :---: |
   * |  **4**  |  **4**  |  **5**  | **12** | **9** |
   * | 1 _-x-_ |         | 3 _-x-_ |        |       |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/border-top-right-radius
   */
  borderTopRightRadius?: BorderTopRightRadiusProperty<TLength>;
  /**
   * The **`border-top-style`** CSS property sets the line style of an element's top `border`.
   *
   * **Syntax**: `<line-style>`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari |  Edge  |   IE    |
   * | :----: | :-----: | :----: | :----: | :-----: |
   * | **1**  |  **1**  | **1**  | **12** | **5.5** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/border-top-style
   */
  borderTopStyle?: BorderTopStyleProperty;
  /**
   * The **`border-top-width`** CSS property sets the width of the top border of an element.
   *
   * **Syntax**: `<line-width>`
   *
   * **Initial value**: `medium`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/border-top-width
   */
  borderTopWidth?: BorderTopWidthProperty<TLength>;
  /**
   * The **`bottom`** CSS property participates in specifying the vertical position of a _positioned element_. It has no effect on non-positioned elements.
   *
   * **Syntax**: `<length> | <percentage> | auto`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **5** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/bottom
   */
  bottom?: BottomProperty<TLength>;
  /**
   * The **`box-decoration-break`** CSS property specifies how an element's fragments should be rendered when broken across multiple lines, columns, or pages.
   *
   * **Syntax**: `slice | clone`
   *
   * **Initial value**: `slice`
   *
   * |    Chrome    | Firefox |    Safari     |     Edge     | IE  |
   * | :----------: | :-----: | :-----------: | :----------: | :-: |
   * | **22** _-x-_ | **32**  | **6.1** _-x-_ | **79** _-x-_ | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/box-decoration-break
   */
  boxDecorationBreak?: BoxDecorationBreakProperty;
  /**
   * The **`box-shadow`** CSS property adds shadow effects around an element's frame. You can set multiple effects separated by commas. A box shadow is described by X and Y offsets relative to the element, blur and spread radii, and color.
   *
   * **Syntax**: `none | <shadow>#`
   *
   * **Initial value**: `none`
   *
   * | Chrome  | Firefox | Safari  |  Edge  |  IE   |
   * | :-----: | :-----: | :-----: | :----: | :---: |
   * | **10**  |  **4**  | **5.1** | **12** | **9** |
   * | 1 _-x-_ |         | 3 _-x-_ |        |       |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/box-shadow
   */
  boxShadow?: BoxShadowProperty;
  /**
   * The **`box-sizing`** CSS property defines how the user agent should calculate the total width and height of an element.
   *
   * **Syntax**: `content-box | border-box`
   *
   * **Initial value**: `content-box`
   *
   * | Chrome  | Firefox | Safari  |  Edge  |  IE   |
   * | :-----: | :-----: | :-----: | :----: | :---: |
   * | **10**  | **29**  | **5.1** | **12** | **8** |
   * | 1 _-x-_ | 1 _-x-_ | 3 _-x-_ |        |       |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/box-sizing
   */
  boxSizing?: BoxSizingProperty;
  /**
   * The **`break-after`** CSS property defines how page, column, or region breaks should behave after a generated box. If there is no generated box, the property is ignored.
   *
   * **Syntax**: `auto | avoid | always | all | avoid-page | page | left | right | recto | verso | avoid-column | column | avoid-region | region`
   *
   * **Initial value**: `auto`
   *
   * ---
   *
   * _Supported in Multi-column Layout_
   *
   * | Chrome | Firefox | Safari |  Edge  |   IE   |
   * | :----: | :-----: | :----: | :----: | :----: |
   * | **50** |   No    |   No   | **12** | **10** |
   *
   * ---
   *
   * _Supported in Paged Media_
   *
   * | Chrome | Firefox | Safari |  Edge  |   IE   |
   * | :----: | :-----: | :----: | :----: | :----: |
   * | **50** | **65**  | **10** | **12** | **10** |
   *
   * ---
   *
   * _Supported in CSS Regions_
   *
   * | Chrome | Firefox | Safari | Edge | IE  |
   * | :----: | :-----: | :----: | :--: | :-: |
   * |   No   |   No    |   No   |  No  | No  |
   *
   * ---
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/break-after
   */
  breakAfter?: BreakAfterProperty;
  /**
   * The **`break-before`** CSS property sets how page, column, or region breaks should behave before a generated box. If there is no generated box, the property is ignored.
   *
   * **Syntax**: `auto | avoid | always | all | avoid-page | page | left | right | recto | verso | avoid-column | column | avoid-region | region`
   *
   * **Initial value**: `auto`
   *
   * ---
   *
   * _Supported in Multi-column Layout_
   *
   * | Chrome | Firefox | Safari |  Edge  |   IE   |
   * | :----: | :-----: | :----: | :----: | :----: |
   * | **50** | **65**  |   No   | **12** | **10** |
   *
   * ---
   *
   * _Supported in Paged Media_
   *
   * | Chrome | Firefox | Safari |  Edge  |   IE   |
   * | :----: | :-----: | :----: | :----: | :----: |
   * | **50** | **65**  | **10** | **12** | **10** |
   *
   * ---
   *
   * _Supported in CSS Regions_
   *
   * | Chrome | Firefox | Safari | Edge | IE  |
   * | :----: | :-----: | :----: | :--: | :-: |
   * |   No   |   No    |   No   |  No  | No  |
   *
   * ---
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/break-before
   */
  breakBefore?: BreakBeforeProperty;
  /**
   * The **`break-inside`** CSS property defines how page, column, or region breaks should behave inside a generated box. If there is no generated box, the property is ignored.
   *
   * **Syntax**: `auto | avoid | avoid-page | avoid-column | avoid-region`
   *
   * **Initial value**: `auto`
   *
   * ---
   *
   * _Supported in Multi-column Layout_
   *
   * | Chrome | Firefox | Safari |  Edge  |   IE   |
   * | :----: | :-----: | :----: | :----: | :----: |
   * | **50** | **65**  | **10** | **12** | **10** |
   *
   * ---
   *
   * _Supported in Paged Media_
   *
   * | Chrome | Firefox | Safari |  Edge  |   IE   |
   * | :----: | :-----: | :----: | :----: | :----: |
   * | **50** | **65**  | **10** | **12** | **10** |
   *
   * ---
   *
   * _Supported in CSS Regions_
   *
   * | Chrome | Firefox | Safari | Edge | IE  |
   * | :----: | :-----: | :----: | :--: | :-: |
   * |   No   |   No    |   No   |  No  | No  |
   *
   * ---
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/break-inside
   */
  breakInside?: BreakInsideProperty;
  /**
   * The **`caption-side`** CSS property puts the content of a table's `<caption>` on the specified side. The values are relative to the `writing-mode` of the table.
   *
   * **Syntax**: `top | bottom | block-start | block-end | inline-start | inline-end`
   *
   * **Initial value**: `top`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **8** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/caption-side
   */
  captionSide?: CaptionSideProperty;
  /**
   * The **`caret-color`** CSS property sets the color of the insertion caret, the visible marker where the next character typed will be inserted. The caret appears in elements such as `<input>` or those with the `contenteditable` attribute. The caret is typically a thin vertical line that flashes to help make it more noticeable. By default, it is black, but its color can be altered with this property.
   *
   * **Syntax**: `auto | <color>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **57** | **53**  | **11.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/caret-color
   */
  caretColor?: CaretColorProperty;
  /**
   * The **`clear`** CSS property sets whether an element must be moved below (cleared) floating elements that precede it. The `clear` property applies to floating and non-floating elements.
   *
   * **Syntax**: `none | left | right | both | inline-start | inline-end`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/clear
   */
  clear?: ClearProperty;
  /**
   * The `**clip-path**` CSS property creates a clipping region that sets what part of an element should be shown. Parts that are inside the region are shown, while those outside are hidden.
   *
   * **Syntax**: `<clip-source> | [ <basic-shape> || <geometry-box> ] | none`
   *
   * **Initial value**: `none`
   *
   * |  Chrome  | Firefox |  Safari   |  Edge  |   IE   |
   * | :------: | :-----: | :-------: | :----: | :----: |
   * |  **55**  | **3.5** |  **9.1**  | **12** | **10** |
   * | 23 _-x-_ |         | 6.1 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/clip-path
   */
  clipPath?: ClipPathProperty;
  /**
   * The **`color`** CSS property sets the foreground color value of an element's text and text decorations, and sets the `currentcolor` value. `currentcolor` may be used as an indirect value on _other_ properties and is the default for other color properties, such as `border-color`.
   *
   * **Syntax**: `<color>`
   *
   * **Initial value**: Varies from one browser to another
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **3** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/color
   */
  color?: ColorProperty;
  /**
   * The **`color-adjust`** CSS property sets what, if anything, the user agent may do to optimize the appearance of the element on the output device. By default, the browser is allowed to make any adjustments to the element's appearance it determines to be necessary and prudent given the type and capabilities of the output device.
   *
   * **Syntax**: `economy | exact`
   *
   * **Initial value**: `economy`
   *
   * |    Chrome    | Firefox |   Safari    |     Edge     | IE  |
   * | :----------: | :-----: | :---------: | :----------: | :-: |
   * | **49** _-x-_ | **48**  | **6** _-x-_ | **79** _-x-_ | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/color-adjust
   */
  colorAdjust?: ColorAdjustProperty;
  /**
   * The **`column-count`** CSS property breaks an element's content into the specified number of columns.
   *
   * **Syntax**: `<integer> | auto`
   *
   * **Initial value**: `auto`
   *
   * | Chrome  | Firefox | Safari  |  Edge  |   IE   |
   * | :-----: | :-----: | :-----: | :----: | :----: |
   * | **50**  | **52**  |  **9**  | **12** | **10** |
   * | 1 _-x-_ |         | 3 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/column-count
   */
  columnCount?: ColumnCountProperty;
  /**
   * The **`column-fill`** CSS property controls how an element's contents are balanced when broken into columns.
   *
   * **Syntax**: `auto | balance | balance-all`
   *
   * **Initial value**: `balance`
   *
   * | Chrome | Firefox | Safari  |  Edge  |   IE   |
   * | :----: | :-----: | :-----: | :----: | :----: |
   * | **50** | **52**  |  **9**  | **12** | **10** |
   * |        |         | 8 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/column-fill
   */
  columnFill?: ColumnFillProperty;
  /**
   * The **`column-gap`** CSS property sets the size of the gap (gutter) between an element's columns.
   *
   * **Syntax**: `normal | <length-percentage>`
   *
   * **Initial value**: `normal`
   *
   * ---
   *
   * _Supported in Flex Layout_
   *
   * | Chrome | Firefox |   Safari    | Edge | IE  |
   * | :----: | :-----: | :---------: | :--: | :-: |
   * |   No   | **63**  | **3** _-x-_ |  No  | No  |
   *
   * ---
   *
   * _Supported in Grid Layout_
   *
   * |     Chrome      |     Firefox     |        Safari         |  Edge  | IE  |
   * | :-------------: | :-------------: | :-------------------: | :----: | :-: |
   * |     **66**      |     **61**      | **10.1** _(grid-gap)_ | **16** | No  |
   * | 57 _(grid-gap)_ | 52 _(grid-gap)_ |                       |        |     |
   *
   * ---
   *
   * _Supported in Multi-column Layout_
   *
   * | Chrome  | Firefox | Safari  |  Edge  |   IE   |
   * | :-----: | :-----: | :-----: | :----: | :----: |
   * | **50**  | **52**  | **10**  | **12** | **10** |
   * | 1 _-x-_ |         | 3 _-x-_ |        |        |
   *
   * ---
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/column-gap
   */
  columnGap?: ColumnGapProperty<TLength>;
  /**
   * The **`column-rule-color`** CSS property sets the color of the rule (line) drawn between columns in a multi-column layout.
   *
   * **Syntax**: `<color>`
   *
   * **Initial value**: `currentcolor`
   *
   * | Chrome  | Firefox | Safari  |  Edge  |   IE   |
   * | :-----: | :-----: | :-----: | :----: | :----: |
   * | **50**  | **52**  |  **9**  | **12** | **10** |
   * | 1 _-x-_ |         | 3 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/column-rule-color
   */
  columnRuleColor?: ColumnRuleColorProperty;
  /**
   * The **`column-rule-style`** CSS property sets the style of the line drawn between columns in a multi-column layout.
   *
   * **Syntax**: `<'border-style'>`
   *
   * **Initial value**: `none`
   *
   * | Chrome  | Firefox | Safari  |  Edge  |   IE   |
   * | :-----: | :-----: | :-----: | :----: | :----: |
   * | **50**  | **52**  |  **9**  | **12** | **10** |
   * | 1 _-x-_ |         | 3 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/column-rule-style
   */
  columnRuleStyle?: ColumnRuleStyleProperty;
  /**
   * The **`column-rule-width`** CSS property sets the width of the rule (line) drawn between columns in a multi-column layout.
   *
   * **Syntax**: `<'border-width'>`
   *
   * **Initial value**: `medium`
   *
   * | Chrome  | Firefox | Safari  |  Edge  |   IE   |
   * | :-----: | :-----: | :-----: | :----: | :----: |
   * | **50**  | **52**  |  **9**  | **12** | **10** |
   * | 1 _-x-_ |         | 3 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/column-rule-width
   */
  columnRuleWidth?: ColumnRuleWidthProperty<TLength>;
  /**
   * The **`column-span`** CSS property makes it possible for an element to span across all columns when its value is set to `all`.
   *
   * **Syntax**: `none | all`
   *
   * **Initial value**: `none`
   *
   * | Chrome  | Firefox |  Safari   |  Edge  |   IE   |
   * | :-----: | :-----: | :-------: | :----: | :----: |
   * | **50**  | **71**  |   **9**   | **12** | **10** |
   * | 6 _-x-_ |         | 5.1 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/column-span
   */
  columnSpan?: ColumnSpanProperty;
  /**
   * The **`column-width`** CSS property specifies the ideal column width in a multi-column layout. The container will have as many columns as can fit without any of them having a width less than the `column-width` value. If the width of the container is narrower than the specified value, the single column's width will be smaller than the declared column width.
   *
   * **Syntax**: `<length> | auto`
   *
   * **Initial value**: `auto`
   *
   * | Chrome  | Firefox | Safari  |  Edge  |   IE   |
   * | :-----: | :-----: | :-----: | :----: | :----: |
   * | **50**  | **50**  |  **9**  | **12** | **10** |
   * | 1 _-x-_ |         | 3 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/column-width
   */
  columnWidth?: ColumnWidthProperty<TLength>;
  /**
   * The **`contain`** CSS property allows an author to indicate that an element and its contents are, as much as possible, _independent_ of the rest of the document tree. This allows the browser to recalculate layout, style, paint, size, or any combination of them for a limited area of the DOM and not the entire page.
   *
   * **Syntax**: `none | strict | content | [ size || layout || style || paint ]`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **52** | **69**  |   No   | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/contain
   */
  contain?: ContainProperty;
  /**
   * The **`content`** CSS property replaces an element with a generated value. Objects inserted using the `content` property are _anonymous replaced elements._
   *
   * **Syntax**: `normal | none | [ <content-replacement> | <content-list> ] [/ <string> ]?`
   *
   * **Initial value**: `normal`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **8** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/content
   */
  content?: ContentProperty;
  /**
   * The **`counter-increment`** CSS property increases or decreases the value of a CSS counter by a given value.
   *
   * **Syntax**: `[ <custom-ident> <integer>? ]+ | none`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **2**  |  **1**  | **3**  | **12** | **8** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/counter-increment
   */
  counterIncrement?: CounterIncrementProperty;
  /**
   * The **`counter-reset`** CSS property resets a CSS counter to a given value.
   *
   * **Syntax**: `[ <custom-ident> <integer>? ]+ | none`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **2**  |  **1**  | **3**  | **12** | **8** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/counter-reset
   */
  counterReset?: CounterResetProperty;
  /**
   * The **`counter-set`** CSS property sets a CSS counter to a given value. It manipulates the value of existing counters, and will only create new counters if there isn't already a counter of the given name on the element.
   *
   * **Syntax**: `[ <custom-ident> <integer>? ]+ | none`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari | Edge | IE  |
   * | :----: | :-----: | :----: | :--: | :-: |
   * |   No   | **68**  |   No   |  No  | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/counter-set
   */
  counterSet?: CounterSetProperty;
  /**
   * The **`cursor`** CSS property sets mouse cursor to display when the mouse pointer is over an element.
   *
   * **Syntax**: `[ [ <url> [ <x> <y> ]? , ]* [ auto | default | none | context-menu | help | pointer | progress | wait | cell | crosshair | text | vertical-text | alias | copy | move | no-drop | not-allowed | e-resize | n-resize | ne-resize | nw-resize | s-resize | se-resize | sw-resize | w-resize | ew-resize | ns-resize | nesw-resize | nwse-resize | col-resize | row-resize | all-scroll | zoom-in | zoom-out | grab | grabbing ] ]`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari  |  Edge  |  IE   |
   * | :----: | :-----: | :-----: | :----: | :---: |
   * | **1**  |  **1**  | **1.2** | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/cursor
   */
  cursor?: CursorProperty;
  /**
   * The **`direction`** CSS property sets the direction of text, table columns, and horizontal overflow. Use `rtl` for languages written from right to left (like Hebrew or Arabic), and `ltr` for those written from left to right (like English and most other languages).
   *
   * **Syntax**: `ltr | rtl`
   *
   * **Initial value**: `ltr`
   *
   * | Chrome | Firefox | Safari |  Edge  |   IE    |
   * | :----: | :-----: | :----: | :----: | :-----: |
   * | **2**  |  **1**  | **1**  | **12** | **5.5** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/direction
   */
  direction?: DirectionProperty;
  /**
   * The **`display`** CSS property defines the _display type_ of an element, which consists of the two basic qualities of how an element generates boxes — the **outer display type** defining how the box participates in flow layout, and the **inner display type** defining how the children of the box are laid out.
   *
   * **Syntax**: `[ <display-outside> || <display-inside> ] | <display-listitem> | <display-internal> | <display-box> | <display-legacy>`
   *
   * **Initial value**: `inline`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/display
   */
  display?: DisplayProperty;
  /**
   * The **`empty-cells`** CSS property sets whether borders and backgrounds appear around `<table>` cells that have no visible content.
   *
   * **Syntax**: `show | hide`
   *
   * **Initial value**: `show`
   *
   * | Chrome | Firefox | Safari  |  Edge  |  IE   |
   * | :----: | :-----: | :-----: | :----: | :---: |
   * | **1**  |  **1**  | **1.2** | **12** | **8** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/empty-cells
   */
  emptyCells?: EmptyCellsProperty;
  /**
   * The **`filter`** CSS property applies graphical effects like blur or color shift to an element. Filters are commonly used to adjust the rendering of images, backgrounds, and borders.
   *
   * **Syntax**: `none | <filter-function-list>`
   *
   * **Initial value**: `none`
   *
   * |  Chrome  | Firefox | Safari  |  Edge  | IE  |
   * | :------: | :-----: | :-----: | :----: | :-: |
   * |  **53**  | **35**  | **9.1** | **12** | No  |
   * | 18 _-x-_ |         | 6 _-x-_ |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/filter
   */
  filter?: FilterProperty;
  /**
   * The **`flex-basis`** CSS property sets the initial main size of a flex item. It sets the size of the content box unless otherwise set with `box-sizing`.
   *
   * **Syntax**: `content | <'width'>`
   *
   * **Initial value**: `auto`
   *
   * |  Chrome  | Firefox | Safari  |  Edge  |   IE   |
   * | :------: | :-----: | :-----: | :----: | :----: |
   * |  **29**  | **22**  |  **9**  | **12** | **11** |
   * | 22 _-x-_ |         | 7 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/flex-basis
   */
  flexBasis?: FlexBasisProperty<TLength>;
  /**
   * The **`flex-direction`** CSS property sets how flex items are placed in the flex container defining the main axis and the direction (normal or reversed).
   *
   * **Syntax**: `row | row-reverse | column | column-reverse`
   *
   * **Initial value**: `row`
   *
   * |  Chrome  | Firefox | Safari  |  Edge  |    IE    |
   * | :------: | :-----: | :-----: | :----: | :------: |
   * |  **29**  | **20**  |  **9**  | **12** |  **11**  |
   * | 21 _-x-_ |         | 7 _-x-_ |        | 10 _-x-_ |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/flex-direction
   */
  flexDirection?: FlexDirectionProperty;
  /**
   * The **`flex-grow`** CSS property sets how much of the available space in the flex container should be assigned to that item (the flex grow factor). If all sibling items have the same flex grow factor, then all items will receive the same share of available space, otherwise it is distributed according to the ratio defined by the different flex grow factors.
   *
   * **Syntax**: `<number>`
   *
   * **Initial value**: `0`
   *
   * |  Chrome  | Firefox |  Safari   |  Edge  |            IE            |
   * | :------: | :-----: | :-------: | :----: | :----------------------: |
   * |  **29**  | **20**  |   **9**   | **12** |          **11**          |
   * | 22 _-x-_ |         | 6.1 _-x-_ |        | 10 _(-ms-flex-positive)_ |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/flex-grow
   */
  flexGrow?: GlobalsNumber;
  /**
   * The **`flex-shrink`** CSS property sets the flex shrink factor of a flex item. If the size of flex items is larger than the flex container, items shrink to fit according to `flex-shrink`.
   *
   * **Syntax**: `<number>`
   *
   * **Initial value**: `1`
   *
   * |  Chrome  | Firefox | Safari  |  Edge  |   IE   |
   * | :------: | :-----: | :-----: | :----: | :----: |
   * |  **29**  | **20**  |  **9**  | **12** | **10** |
   * | 22 _-x-_ |         | 8 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/flex-shrink
   */
  flexShrink?: GlobalsNumber;
  /**
   * The **`flex-wrap`** CSS property sets whether flex items are forced onto one line or can wrap onto multiple lines. If wrapping is allowed, it sets the direction that lines are stacked.
   *
   * **Syntax**: `nowrap | wrap | wrap-reverse`
   *
   * **Initial value**: `nowrap`
   *
   * |  Chrome  | Firefox |  Safari   |  Edge  |   IE   |
   * | :------: | :-----: | :-------: | :----: | :----: |
   * |  **29**  | **28**  |   **9**   | **12** | **11** |
   * | 21 _-x-_ |         | 6.1 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/flex-wrap
   */
  flexWrap?: FlexWrapProperty;
  /**
   * The **`float`** CSS property places an element on the left or right side of its container, allowing text and inline elements to wrap around it. The element is removed from the normal flow of the page, though still remaining a part of the flow (in contrast to absolute positioning).
   *
   * **Syntax**: `left | right | none | inline-start | inline-end`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/float
   */
  float?: FloatProperty;
  /**
   * The **`font-family`** CSS property specifies a prioritized list of one or more font family names and/or generic family names for the selected element.
   *
   * **Syntax**: `[ <family-name> | <generic-family> ]#`
   *
   * **Initial value**: depends on user agent
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **3** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/font-family
   */
  fontFamily?: FontFamilyProperty;
  /**
   * The **`font-feature-settings`** CSS property controls advanced typographic features in OpenType fonts.
   *
   * **Syntax**: `normal | <feature-tag-value>#`
   *
   * **Initial value**: `normal`
   *
   * |  Chrome  | Firefox  | Safari  |  Edge  |   IE   |
   * | :------: | :------: | :-----: | :----: | :----: |
   * |  **48**  |  **34**  | **9.1** | **15** | **10** |
   * | 16 _-x-_ | 15 _-x-_ |         |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/font-feature-settings
   */
  fontFeatureSettings?: FontFeatureSettingsProperty;
  /**
   * The **`font-kerning`** CSS property sets the use of the kerning information stored in a font.
   *
   * **Syntax**: `auto | normal | none`
   *
   * **Initial value**: `auto`
   *
   * |    Chrome    | Firefox | Safari |     Edge     | IE  |
   * | :----------: | :-----: | :----: | :----------: | :-: |
   * | **32** _-x-_ | **32**  | **7**  | **79** _-x-_ | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/font-kerning
   */
  fontKerning?: FontKerningProperty;
  /**
   * The **`font-language-override`** CSS property controls the use of language-specific glyphs in a typeface.
   *
   * **Syntax**: `normal | <string>`
   *
   * **Initial value**: `normal`
   *
   * | Chrome | Firefox | Safari | Edge | IE  |
   * | :----: | :-----: | :----: | :--: | :-: |
   * |   No   | **34**  |   No   |  No  | No  |
   * |        | 4 _-x-_ |        |      |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/font-language-override
   */
  fontLanguageOverride?: FontLanguageOverrideProperty;
  /**
   * The **`font-optical-sizing`** CSS property sets whether text rendering is optimized for viewing at different sizes. This only works for fonts that have an optical size variation axis.
   *
   * **Syntax**: `auto | none`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **79** | **62**  | **11** | **17** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/font-optical-sizing
   */
  fontOpticalSizing?: FontOpticalSizingProperty;
  /**
   * The **`font-size`** CSS property sets the size of the font. This property is also used to compute the size of `em`, `ex`, and other relative `<length>` units.
   *
   * **Syntax**: `<absolute-size> | <relative-size> | <length-percentage>`
   *
   * **Initial value**: `medium`
   *
   * | Chrome | Firefox | Safari |  Edge  |   IE    |
   * | :----: | :-----: | :----: | :----: | :-----: |
   * | **1**  |  **1**  | **1**  | **12** | **5.5** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/font-size
   */
  fontSize?: FontSizeProperty<TLength>;
  /**
   * The **`font-size-adjust`** CSS property sets how the font size should be chosen based on the height of lowercase rather than capital letters.
   *
   * **Syntax**: `none | <number>`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari | Edge | IE  |
   * | :----: | :-----: | :----: | :--: | :-: |
   * |  n/a   |  **1**  |   No   | n/a  | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/font-size-adjust
   */
  fontSizeAdjust?: FontSizeAdjustProperty;
  /**
   * The **`font-stretch`** CSS property selects a normal, condensed, or expanded face from a font.
   *
   * **Syntax**: `<font-stretch-absolute>`
   *
   * **Initial value**: `normal`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **60** |  **9**  | **11** | **12** | **9** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/font-stretch
   */
  fontStretch?: FontStretchProperty;
  /**
   * The **`font-style`** CSS property sets whether a font should be styled with a normal, italic, or oblique face from its `font-family`.
   *
   * **Syntax**: `normal | italic | oblique <angle>?`
   *
   * **Initial value**: `normal`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/font-style
   */
  fontStyle?: FontStyleProperty;
  /**
   * The **`font-synthesis`** CSS property controls which missing typefaces, bold or italic, may be synthesized by the browser.
   *
   * **Syntax**: `none | [ weight || style ]`
   *
   * **Initial value**: `weight style`
   *
   * | Chrome | Firefox | Safari | Edge | IE  |
   * | :----: | :-----: | :----: | :--: | :-: |
   * |   No   | **34**  | **9**  |  No  | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/font-synthesis
   */
  fontSynthesis?: FontSynthesisProperty;
  /**
   * The **font-variant** CSS property is a shorthand for the longhand properties `font-variant-caps`, `font-variant-numeric`, `font-variant-alternates`, `font-variant-ligatures`, and `font-variant-east-asian`. You can also set the CSS Level 2 (Revision 1) values of `font-variant`, (that is, `normal` or `small-caps`), by using the `font` shorthand.
   *
   * **Syntax**: `normal | none | [ <common-lig-values> || <discretionary-lig-values> || <historical-lig-values> || <contextual-alt-values> || stylistic( <feature-value-name> ) || historical-forms || styleset( <feature-value-name># ) || character-variant( <feature-value-name># ) || swash( <feature-value-name> ) || ornaments( <feature-value-name> ) || annotation( <feature-value-name> ) || [ small-caps | all-small-caps | petite-caps | all-petite-caps | unicase | titling-caps ] || <numeric-figure-values> || <numeric-spacing-values> || <numeric-fraction-values> || ordinal || slashed-zero || <east-asian-variant-values> || <east-asian-width-values> || ruby ]`
   *
   * **Initial value**: `normal`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/font-variant
   */
  fontVariant?: FontVariantProperty;
  /**
   * The **`font-variant-caps`** CSS property controls the use of alternate glyphs for capital letters.
   *
   * **Syntax**: `normal | small-caps | all-small-caps | petite-caps | all-petite-caps | unicase | titling-caps`
   *
   * **Initial value**: `normal`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **52** | **34**  |   No   | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/font-variant-caps
   */
  fontVariantCaps?: FontVariantCapsProperty;
  /**
   * The **`font-variant-east-asian`** CSS property controls the use of alternate glyphs for East Asian scripts, like Japanese and Chinese.
   *
   * **Syntax**: `normal | [ <east-asian-variant-values> || <east-asian-width-values> || ruby ]`
   *
   * **Initial value**: `normal`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **63** | **34**  |   No   | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/font-variant-east-asian
   */
  fontVariantEastAsian?: FontVariantEastAsianProperty;
  /**
   * The **`font-variant-ligatures`** CSS property controls which ligatures and contextual forms are used in textual content of the elements it applies to. This leads to more harmonized forms in the resulting text.
   *
   * **Syntax**: `normal | none | [ <common-lig-values> || <discretionary-lig-values> || <historical-lig-values> || <contextual-alt-values> ]`
   *
   * **Initial value**: `normal`
   *
   * |  Chrome  | Firefox | Safari  |  Edge  | IE  |
   * | :------: | :-----: | :-----: | :----: | :-: |
   * |  **34**  | **34**  | **9.1** | **79** | No  |
   * | 31 _-x-_ |         | 7 _-x-_ |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/font-variant-ligatures
   */
  fontVariantLigatures?: FontVariantLigaturesProperty;
  /**
   * The **`font-variant-numeric`** CSS property controls the usage of alternate glyphs for numbers, fractions, and ordinal markers.
   *
   * **Syntax**: `normal | [ <numeric-figure-values> || <numeric-spacing-values> || <numeric-fraction-values> || ordinal || slashed-zero ]`
   *
   * **Initial value**: `normal`
   *
   * | Chrome | Firefox | Safari  |  Edge  | IE  |
   * | :----: | :-----: | :-----: | :----: | :-: |
   * | **52** | **34**  | **9.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/font-variant-numeric
   */
  fontVariantNumeric?: FontVariantNumericProperty;
  /**
   * The **`font-variant-position`** CSS property controls the use of alternate, smaller glyphs that are positioned as superscript or subscript.
   *
   * **Syntax**: `normal | sub | super`
   *
   * **Initial value**: `normal`
   *
   * | Chrome | Firefox | Safari | Edge | IE  |
   * | :----: | :-----: | :----: | :--: | :-: |
   * |   No   | **34**  |   No   |  No  | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/font-variant-position
   */
  fontVariantPosition?: FontVariantPositionProperty;
  /**
   * The **`font-variation-settings`** CSS property provides low-level control over variable font characteristics, by specifying the four letter axis names of the characteristics you want to vary, along with their values.
   *
   * **Syntax**: `normal | [ <string> <number> ]#`
   *
   * **Initial value**: `normal`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **62** | **62**  | **11** | **17** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/font-variation-settings
   */
  fontVariationSettings?: FontVariationSettingsProperty;
  /**
   * The **`font-weight`** CSS property specifies the weight (or boldness) of the font. The font weights available to you will depend on the `font-family` you are using. Some fonts are only available in `normal` and `bold`.
   *
   * **Syntax**: `<font-weight-absolute> | bolder | lighter`
   *
   * **Initial value**: `normal`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **2**  |  **1**  | **1**  | **12** | **3** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/font-weight
   */
  fontWeight?: FontWeightProperty;
  /**
   * The **`grid-auto-columns`** CSS property specifies the size of an implicitly-created grid column track.
   *
   * **Syntax**: `<track-size>+`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox |  Safari  |          Edge           |             IE              |
   * | :----: | :-----: | :------: | :---------------------: | :-------------------------: |
   * | **57** | **70**  | **10.1** |         **16**          | **10** _(-ms-grid-columns)_ |
   * |        |         |          | 12 _(-ms-grid-columns)_ |                             |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/grid-auto-columns
   */
  gridAutoColumns?: GridAutoColumnsProperty<TLength>;
  /**
   * The **`grid-auto-flow`** CSS property controls how the auto-placement algorithm works, specifying exactly how auto-placed items get flowed into the grid.
   *
   * **Syntax**: `[ row | column ] || dense`
   *
   * **Initial value**: `row`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **57** | **52**  | **10.1** | **16** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/grid-auto-flow
   */
  gridAutoFlow?: GridAutoFlowProperty;
  /**
   * The **`grid-auto-rows`** CSS property specifies the size of an implicitly-created grid row track.
   *
   * **Syntax**: `<track-size>+`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox |  Safari  |         Edge         |            IE            |
   * | :----: | :-----: | :------: | :------------------: | :----------------------: |
   * | **57** | **70**  | **10.1** |        **16**        | **10** _(-ms-grid-rows)_ |
   * |        |         |          | 12 _(-ms-grid-rows)_ |                          |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/grid-auto-rows
   */
  gridAutoRows?: GridAutoRowsProperty<TLength>;
  /**
   * The **`grid-column-end`** CSS property specifies a grid item’s end position within the grid column by contributing a line, a span, or nothing (automatic) to its grid placement, thereby specifying the block-end edge of its grid area.
   *
   * **Syntax**: `<grid-line>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **57** | **52**  | **10.1** | **16** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/grid-column-end
   */
  gridColumnEnd?: GridColumnEndProperty;
  /**
   * The **`grid-column-start`** CSS property specifies a grid item’s start position within the grid column by contributing a line, a span, or nothing (automatic) to its grid placement. This start position defines the block-start edge of the grid area.
   *
   * **Syntax**: `<grid-line>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **57** | **52**  | **10.1** | **16** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/grid-column-start
   */
  gridColumnStart?: GridColumnStartProperty;
  /**
   * The **`grid-row-end`** CSS property specifies a grid item’s end position within the grid row by contributing a line, a span, or nothing (automatic) to its grid placement, thereby specifying the inline-end edge of its grid area.
   *
   * **Syntax**: `<grid-line>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **57** | **52**  | **10.1** | **16** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/grid-row-end
   */
  gridRowEnd?: GridRowEndProperty;
  /**
   * The **`grid-row-start`** CSS property specifies a grid item’s start position within the grid row by contributing a line, a span, or nothing (automatic) to its grid placement, thereby specifying the inline-start edge of its grid area.
   *
   * **Syntax**: `<grid-line>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **57** | **52**  | **10.1** | **16** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/grid-row-start
   */
  gridRowStart?: GridRowStartProperty;
  /**
   * The **`grid-template-areas`** CSS property specifies named grid areas.
   *
   * **Syntax**: `none | <string>+`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **57** | **52**  | **10.1** | **16** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/grid-template-areas
   */
  gridTemplateAreas?: GridTemplateAreasProperty;
  /**
   * The **`grid-template-columns`** CSS property defines the line names and track sizing functions of the grid columns.
   *
   * **Syntax**: `none | <track-list> | <auto-track-list> | subgrid <line-name-list>?`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **57** | **52**  | **10.1** | **16** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/grid-template-columns
   */
  gridTemplateColumns?: GridTemplateColumnsProperty<TLength>;
  /**
   * The **`grid-template-rows`** CSS property defines the line names and track sizing functions of the grid rows.
   *
   * **Syntax**: `none | <track-list> | <auto-track-list> | subgrid <line-name-list>?`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **57** | **52**  | **10.1** | **16** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/grid-template-rows
   */
  gridTemplateRows?: GridTemplateRowsProperty<TLength>;
  /**
   * The **`hanging-punctuation`** CSS property specifies whether a punctuation mark should hang at the start or end of a line of text. Hanging punctuation may be placed outside the line box.
   *
   * **Syntax**: `none | [ first || [ force-end | allow-end ] || last ]`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari | Edge | IE  |
   * | :----: | :-----: | :----: | :--: | :-: |
   * |   No   |   No    | **10** |  No  | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/hanging-punctuation
   */
  hangingPunctuation?: HangingPunctuationProperty;
  /**
   * The **`height`** CSS property specifies the height of an element. By default, the property defines the height of the content area. If `box-sizing` is set to `border-box`, however, it instead determines the height of the border area.
   *
   * **Syntax**: `auto | <length> | <percentage> | min-content | max-content | fit-content(<length-percentage>)`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/height
   */
  height?: HeightProperty<TLength>;
  /**
   * The **`hyphens`** CSS property specifies how words should be hyphenated when text wraps across multiple lines. You can prevent hyphenation entirely, use hyphenation in manually-specified points within the text, or let the browser automatically insert hyphens where appropriate.
   *
   * **Syntax**: `none | manual | auto`
   *
   * **Initial value**: `manual`
   *
   * |  Chrome  | Firefox |    Safari     |     Edge     |      IE      |
   * | :------: | :-----: | :-----------: | :----------: | :----------: |
   * |  **55**  | **43**  | **5.1** _-x-_ | **12** _-x-_ | **10** _-x-_ |
   * | 13 _-x-_ | 6 _-x-_ |               |              |              |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/hyphens
   */
  hyphens?: HyphensProperty;
  /**
   * The **`image-orientation`** CSS property specifies a layout-independent correction to the orientation of an image. It should _not_ be used for any other orientation adjustments; instead, the `transform` property should be used with the `rotate` `<transform-function>`.
   *
   * **Syntax**: `from-image | <angle> | [ <angle>? flip ]`
   *
   * **Initial value**: `0deg`
   *
   * | Chrome | Firefox | Safari | Edge | IE  |
   * | :----: | :-----: | :----: | :--: | :-: |
   * |   No   | **26**  |   No   |  No  | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/image-orientation
   */
  imageOrientation?: ImageOrientationProperty;
  /**
   * The **`image-rendering`** CSS property sets an image scaling algorithm. The property applies to an element itself, to any images set in its other properties, and to its descendants.
   *
   * **Syntax**: `auto | crisp-edges | pixelated`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **13** | **3.6** | **6**  | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/image-rendering
   */
  imageRendering?: ImageRenderingProperty;
  /**
   * **Syntax**: `[ from-image || <resolution> ] && snap?`
   *
   * **Initial value**: `1dppx`
   */
  imageResolution?: ImageResolutionProperty;
  /**
   * The `initial-letter` CSS property sets styling for dropped, raised, and sunken initial letters.
   *
   * **Syntax**: `normal | [ <number> <integer>? ]`
   *
   * **Initial value**: `normal`
   *
   * | Chrome | Firefox | Safari | Edge | IE  |
   * | :----: | :-----: | :----: | :--: | :-: |
   * |   No   |   No    | **9**  |  No  | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/initial-letter
   */
  initialLetter?: InitialLetterProperty;
  /**
   * The **`inline-size`** CSS property defines the horizontal or vertical size of an element's block, depending on its writing mode. It corresponds to either the `width` or the `height` property, depending on the value of `writing-mode`.
   *
   * **Syntax**: `<'width'>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **57** | **41**  | **12.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/inline-size
   */
  inlineSize?: InlineSizeProperty<TLength>;
  /**
   * The **`inset`** CSS property defines the logical block and inline start and end offsets of an element, which map to physical offsets depending on the element's writing mode, directionality, and text orientation. It corresponds to the `top` and `bottom`, or `right` and `left` properties depending on the values defined for `writing-mode`, `direction`, and `text-orientation`.
   *
   * **Syntax**: `<'top'>{1,4}`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari | Edge | IE  |
   * | :----: | :-----: | :----: | :--: | :-: |
   * |   No   | **66**  |   No   |  No  | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/inset
   */
  inset?: InsetProperty<TLength>;
  /**
   * The **`inset-block`** CSS property defines the logical block start and end offsets of an element, which maps to physical offsets depending on the element's writing mode, directionality, and text orientation. It corresponds to the `top` and `bottom`, or `right` and `left` properties depending on the values defined for `writing-mode`, `direction`, and `text-orientation`.
   *
   * **Syntax**: `<'top'>{1,2}`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari | Edge | IE  |
   * | :----: | :-----: | :----: | :--: | :-: |
   * |  n/a   | **63**  |   No   | n/a  | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/inset-block
   */
  insetBlock?: InsetBlockProperty<TLength>;
  /**
   * The **`inset-block-end`** CSS property defines the logical block end offset of an element, which maps to a physical inset depending on the element's writing mode, directionality, and text orientation. It corresponds to the `top`, `right`, `bottom`, or `left` property depending on the values defined for `writing-mode`, `direction`, and `text-orientation`.
   *
   * **Syntax**: `<'top'>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari | Edge | IE  |
   * | :----: | :-----: | :----: | :--: | :-: |
   * |  n/a   | **63**  |   No   | n/a  | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/inset-block-end
   */
  insetBlockEnd?: InsetBlockEndProperty<TLength>;
  /**
   * The **`inset-block-start`** CSS property defines the logical block start offset of an element, which maps to a physical inset depending on the element's writing mode, directionality, and text orientation. It corresponds to the `top`, `right`, `bottom`, or `left` property depending on the values defined for `writing-mode`, `direction`, and `text-orientation`.
   *
   * **Syntax**: `<'top'>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari | Edge | IE  |
   * | :----: | :-----: | :----: | :--: | :-: |
   * |  n/a   | **63**  |   No   | n/a  | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/inset-block-start
   */
  insetBlockStart?: InsetBlockStartProperty<TLength>;
  /**
   * The **`inset-inline`** CSS property defines the logical block start and end offsets of an element, which maps to physical offsets depending on the element's writing mode, directionality, and text orientation. It corresponds to the `top` and `bottom`, or `right` and `left` properties depending on the values defined for `writing-mode`, `direction`, and `text-orientation`.
   *
   * **Syntax**: `<'top'>{1,2}`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari | Edge | IE  |
   * | :----: | :-----: | :----: | :--: | :-: |
   * |  n/a   | **63**  |   No   | n/a  | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/inset-inline
   */
  insetInline?: InsetInlineProperty<TLength>;
  /**
   * The **`inset-inline-end`** CSS property defines the logical inline end inset of an element, which maps to a physical inset depending on the element's writing mode, directionality, and text orientation. It corresponds to the `top`, `right`, `bottom`, or `left` property depending on the values defined for `writing-mode`, `direction`, and `text-orientation`.
   *
   * **Syntax**: `<'top'>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari | Edge | IE  |
   * | :----: | :-----: | :----: | :--: | :-: |
   * |  n/a   | **63**  |   No   | n/a  | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/inset-inline-end
   */
  insetInlineEnd?: InsetInlineEndProperty<TLength>;
  /**
   * The **`inset-inline-start`** CSS property defines the logical inline start inset of an element, which maps to a physical offset depending on the element's writing mode, directionality, and text orientation. It corresponds to the `top`, `right`, `bottom`, or `left` property depending on the values defined for `writing-mode`, `direction`, and `text-orientation`.
   *
   * **Syntax**: `<'top'>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari | Edge | IE  |
   * | :----: | :-----: | :----: | :--: | :-: |
   * |  n/a   | **63**  |   No   | n/a  | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/inset-inline-start
   */
  insetInlineStart?: InsetInlineStartProperty<TLength>;
  /**
   * The **`isolation`** CSS property determines whether an element must create a new stacking context.
   *
   * **Syntax**: `auto | isolate`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **41** | **36**  | **8**  | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/isolation
   */
  isolation?: IsolationProperty;
  /**
   * The CSS **`justify-content`** property defines how the browser distributes space between and around content items along the main-axis of a flex container, and the inline axis of a grid container.
   *
   * **Syntax**: `normal | <content-distribution> | <overflow-position>? [ <content-position> | left | right ]`
   *
   * **Initial value**: `normal`
   *
   * ---
   *
   * _Supported in Flex Layout_
   *
   * |  Chrome  | Firefox |  Safari   |  Edge  |   IE   |
   * | :------: | :-----: | :-------: | :----: | :----: |
   * |  **52**  | **20**  |   **9**   | **12** | **11** |
   * | 21 _-x-_ |         | 6.1 _-x-_ |        |        |
   *
   * ---
   *
   * _Supported in Grid Layout_
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **57** | **52**  | **10.1** | **16** | No  |
   *
   * ---
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/justify-content
   */
  justifyContent?: JustifyContentProperty;
  /**
   * The CSS **`justify-items`** property defines the default `justify-self` for all items of the box, giving them all a default way of justifying each box along the appropriate axis.
   *
   * **Syntax**: `normal | stretch | <baseline-position> | <overflow-position>? [ <self-position> | left | right ] | legacy | legacy && [ left | right | center ]`
   *
   * **Initial value**: `legacy`
   *
   * ---
   *
   * _Supported in Flex Layout_
   *
   * | Chrome | Firefox | Safari |  Edge  |   IE   |
   * | :----: | :-----: | :----: | :----: | :----: |
   * | **52** | **20**  | **9**  | **12** | **11** |
   *
   * ---
   *
   * _Supported in Grid Layout_
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **57** | **45**  | **10.1** | **16** | No  |
   *
   * ---
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/justify-items
   */
  justifyItems?: JustifyItemsProperty;
  /**
   * The CSS **`justify-self`** property set the way a box is justified inside its alignment container along the appropriate axis.
   *
   * **Syntax**: `auto | normal | stretch | <baseline-position> | <overflow-position>? [ <self-position> | left | right ]`
   *
   * **Initial value**: `auto`
   *
   * ---
   *
   * _Supported in Flex Layout_
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **57** | **45**  | **10.1** | **16** | No  |
   *
   * ---
   *
   * _Supported in Grid Layout_
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **57** | **45**  | **10.1** | **16** | No  |
   *
   * ---
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/justify-self
   */
  justifySelf?: JustifySelfProperty;
  /**
   * The **`left`** CSS property participates in specifying the horizontal position of a _positioned element_. It has no effect on non-positioned elements.
   *
   * **Syntax**: `<length> | <percentage> | auto`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  |   IE    |
   * | :----: | :-----: | :----: | :----: | :-----: |
   * | **1**  |  **1**  | **1**  | **12** | **5.5** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/left
   */
  left?: LeftProperty<TLength>;
  /**
   * The **`letter-spacing`** CSS property sets the spacing behavior between text characters.
   *
   * **Syntax**: `normal | <length>`
   *
   * **Initial value**: `normal`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/letter-spacing
   */
  letterSpacing?: LetterSpacingProperty<TLength>;
  /**
   * The **`line-break`** CSS property sets how to break lines of Chinese, Japanese, or Korean (CJK) text when working with punctuation and symbols.
   *
   * **Syntax**: `auto | loose | normal | strict | anywhere`
   *
   * **Initial value**: `auto`
   *
   * | Chrome  | Firefox |   Safari    |  Edge  |   IE    |
   * | :-----: | :-----: | :---------: | :----: | :-----: |
   * | **58**  | **69**  | **3** _-x-_ | **14** | **5.5** |
   * | 1 _-x-_ |         |             |        |         |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/line-break
   */
  lineBreak?: LineBreakProperty;
  /**
   * The **`line-height`** CSS property sets the amount of space used for lines, such as in text. On block-level elements, it specifies the minimum height of line boxes within the element. On non-replaced inline elements, it specifies the height that is used to calculate line box height.
   *
   * **Syntax**: `normal | <number> | <length> | <percentage>`
   *
   * **Initial value**: `normal`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/line-height
   */
  lineHeight?: LineHeightProperty<TLength>;
  /**
   * The **`line-height-step`** CSS property sets the step unit for line box heights. When the property is set, line box heights are rounded up to the closest multiple of the unit.
   *
   * **Syntax**: `<length>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari | Edge | IE  |
   * | :----: | :-----: | :----: | :--: | :-: |
   * |  n/a   |   No    |   No   | n/a  | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/line-height-step
   */
  lineHeightStep?: LineHeightStepProperty<TLength>;
  /**
   * The **`list-style-image`** CSS property sets an image to be used as the list item marker.
   *
   * **Syntax**: `<url> | none`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/list-style-image
   */
  listStyleImage?: ListStyleImageProperty;
  /**
   * The **`list-style-position`** CSS property sets the position of the `::marker` relative to a list item.
   *
   * **Syntax**: `inside | outside`
   *
   * **Initial value**: `outside`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/list-style-position
   */
  listStylePosition?: ListStylePositionProperty;
  /**
   * The **`list-style-type`** CSS property sets the marker (such as a disc, character, or custom counter style) of a list item element.
   *
   * **Syntax**: `<counter-style> | <string> | none`
   *
   * **Initial value**: `disc`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/list-style-type
   */
  listStyleType?: ListStyleTypeProperty;
  /**
   * The **`margin-block`** CSS property defines the logical block start and end margins of an element, which maps to physical margins depending on the element's writing mode, directionality, and text orientation.
   *
   * **Syntax**: `<'margin-left'>{1,2}`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **69** | **66**  |   No   | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/margin-block
   */
  marginBlock?: MarginBlockProperty<TLength>;
  /**
   * The **`margin-block-end`** CSS property defines the logical block end margin of an element, which maps to a physical margin depending on the element's writing mode, directionality, and text orientation.
   *
   * **Syntax**: `<'margin-left'>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **69** | **41**  | **12.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/margin-block-end
   */
  marginBlockEnd?: MarginBlockEndProperty<TLength>;
  /**
   * The **`margin-block-start`** CSS property defines the logical block start margin of an element, which maps to a physical margin depending on the element's writing mode, directionality, and text orientation.
   *
   * **Syntax**: `<'margin-left'>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **69** | **41**  | **12.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/margin-block-start
   */
  marginBlockStart?: MarginBlockStartProperty<TLength>;
  /**
   * The **`margin-bottom`** CSS property sets the margin area on the bottom of an element. A positive value places it farther from its neighbors, while a negative value places it closer.
   *
   * **Syntax**: `<length> | <percentage> | auto`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **3** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/margin-bottom
   */
  marginBottom?: MarginBottomProperty<TLength>;
  /**
   * The **`margin-inline`** CSS property defines the logical inline start and end margins of an element, which maps to physical margins depending on the element's writing mode, directionality, and text orientation.
   *
   * **Syntax**: `<'margin-left'>{1,2}`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **69** | **66**  |   No   | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/margin-inline
   */
  marginInline?: MarginInlineProperty<TLength>;
  /**
   * The **`margin-inline-end`** CSS property defines the logical inline end margin of an element, which maps to a physical margin depending on the element's writing mode, directionality, and text orientation. In other words, it corresponds to the `margin-top`, `margin-right`, `margin-bottom` or `margin-left` property depending on the values defined for `writing-mode`, `direction`, and `text-orientation`.
   *
   * **Syntax**: `<'margin-left'>`
   *
   * **Initial value**: `0`
   *
   * |          Chrome          |        Firefox        |          Safari          |  Edge  | IE  |
   * | :----------------------: | :-------------------: | :----------------------: | :----: | :-: |
   * |          **69**          |        **41**         |         **12.1**         | **79** | No  |
   * | 2 _(-webkit-margin-end)_ | 3 _(-moz-margin-end)_ | 3 _(-webkit-margin-end)_ |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/margin-inline-end
   */
  marginInlineEnd?: MarginInlineEndProperty<TLength>;
  /**
   * The **`margin-inline-start`** CSS property defines the logical inline start margin of an element, which maps to a physical margin depending on the element's writing mode, directionality, and text orientation. It corresponds to the `margin-top`, `margin-right`, `margin-bottom`, or `margin-left` property depending on the values defined for `writing-mode`, `direction`, and `text-orientation`.
   *
   * **Syntax**: `<'margin-left'>`
   *
   * **Initial value**: `0`
   *
   * |           Chrome           |         Firefox         |           Safari           |  Edge  | IE  |
   * | :------------------------: | :---------------------: | :------------------------: | :----: | :-: |
   * |           **69**           |         **41**          |          **12.1**          | **79** | No  |
   * | 2 _(-webkit-margin-start)_ | 3 _(-moz-margin-start)_ | 3 _(-webkit-margin-start)_ |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/margin-inline-start
   */
  marginInlineStart?: MarginInlineStartProperty<TLength>;
  /**
   * The **`margin-left`** CSS property sets the margin area on the left side of an element. A positive value places it farther from its neighbors, while a negative value places it closer.
   *
   * **Syntax**: `<length> | <percentage> | auto`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **3** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/margin-left
   */
  marginLeft?: MarginLeftProperty<TLength>;
  /**
   * The **`margin-right`** CSS property sets the margin area on the right side of an element. A positive value places it farther from its neighbors, while a negative value places it closer.
   *
   * **Syntax**: `<length> | <percentage> | auto`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **3** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/margin-right
   */
  marginRight?: MarginRightProperty<TLength>;
  /**
   * The **`margin-top`** CSS property sets the margin area on the top of an element. A positive value places it farther from its neighbors, while a negative value places it closer.
   *
   * **Syntax**: `<length> | <percentage> | auto`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **3** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/margin-top
   */
  marginTop?: MarginTopProperty<TLength>;
  /**
   * The **`mask-border-mode`** CSS property specifies the blending mode used in a mask border.
   *
   * **Syntax**: `luminance | alpha`
   *
   * **Initial value**: `alpha`
   */
  maskBorderMode?: MaskBorderModeProperty;
  /**
   * The **`mask-border-outset`** CSS property specifies the distance by which an element's mask border is set out from its border box.
   *
   * **Syntax**: `[ <length> | <number> ]{1,4}`
   *
   * **Initial value**: `0`
   */
  maskBorderOutset?: MaskBorderOutsetProperty<TLength>;
  /**
   * The **`mask-border-repeat`** CSS property sets how the edge regions of a source image are adjusted to fit the dimensions of an element's mask border.
   *
   * **Syntax**: `[ stretch | repeat | round | space ]{1,2}`
   *
   * **Initial value**: `stretch`
   */
  maskBorderRepeat?: MaskBorderRepeatProperty;
  /**
   * The **`mask-border-slice`** CSS property divides the image set by `mask-border-source` into regions. These regions are used to form the components of an element's mask border.
   *
   * **Syntax**: `<number-percentage>{1,4} fill?`
   *
   * **Initial value**: `0`
   */
  maskBorderSlice?: MaskBorderSliceProperty;
  /**
   * The **`mask-border-source`** CSS property sets the source image used to create an element's mask border.
   *
   * **Syntax**: `none | <image>`
   *
   * **Initial value**: `none`
   */
  maskBorderSource?: MaskBorderSourceProperty;
  /**
   * The **`mask-border-width`** CSS property sets the width of an element's mask border.
   *
   * **Syntax**: `[ <length-percentage> | <number> | auto ]{1,4}`
   *
   * **Initial value**: `auto`
   */
  maskBorderWidth?: MaskBorderWidthProperty<TLength>;
  /**
   * The **`mask-clip`** CSS property determines the area, which is affected by a mask. The painted content of an element must be restricted to this area.
   *
   * **Syntax**: `[ <geometry-box> | no-clip ]#`
   *
   * **Initial value**: `border-box`
   *
   * |   Chrome    | Firefox |   Safari    |     Edge     | IE  |
   * | :---------: | :-----: | :---------: | :----------: | :-: |
   * | **1** _-x-_ | **53**  | **4** _-x-_ | **79** _-x-_ | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/mask-clip
   */
  maskClip?: MaskClipProperty;
  /**
   * The **`mask-composite`** CSS property represents a compositing operation used on the current mask layer with the mask layers below it.
   *
   * **Syntax**: `<compositing-operator>#`
   *
   * **Initial value**: `add`
   *
   * | Chrome | Firefox | Safari | Edge  | IE  |
   * | :----: | :-----: | :----: | :---: | :-: |
   * |   No   | **53**  |   No   | 18-79 | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/mask-composite
   */
  maskComposite?: MaskCompositeProperty;
  /**
   * The **`mask-image`** CSS property sets the image that is used as mask layer for an element.
   *
   * **Syntax**: `<mask-reference>#`
   *
   * **Initial value**: `none`
   *
   * |   Chrome    | Firefox |   Safari    |  Edge  | IE  |
   * | :---------: | :-----: | :---------: | :----: | :-: |
   * | **1** _-x-_ | **53**  | **4** _-x-_ | **16** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/mask-image
   */
  maskImage?: MaskImageProperty;
  /**
   * The **`mask-mode`** CSS property sets whether the mask reference defined by `mask-image` is treated as a luminance or alpha mask.
   *
   * **Syntax**: `<masking-mode>#`
   *
   * **Initial value**: `match-source`
   *
   * | Chrome | Firefox | Safari | Edge | IE  |
   * | :----: | :-----: | :----: | :--: | :-: |
   * |   No   | **53**  |   No   |  No  | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/mask-mode
   */
  maskMode?: MaskModeProperty;
  /**
   * The **`mask-origin`** CSS property sets the origin of a mask.
   *
   * **Syntax**: `<geometry-box>#`
   *
   * **Initial value**: `border-box`
   *
   * |   Chrome    | Firefox |   Safari    |     Edge     | IE  |
   * | :---------: | :-----: | :---------: | :----------: | :-: |
   * | **1** _-x-_ | **53**  | **4** _-x-_ | **79** _-x-_ | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/mask-origin
   */
  maskOrigin?: MaskOriginProperty;
  /**
   * The **`mask-position`** CSS property sets the initial position, relative to the mask position layer set by `mask-origin`, for each defined mask image.
   *
   * **Syntax**: `<position>#`
   *
   * **Initial value**: `center`
   *
   * |   Chrome    | Firefox |    Safari     |  Edge  | IE  |
   * | :---------: | :-----: | :-----------: | :----: | :-: |
   * | **1** _-x-_ | **53**  | **3.2** _-x-_ | **18** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/mask-position
   */
  maskPosition?: MaskPositionProperty<TLength>;
  /**
   * The **`mask-repeat`** CSS property sets how mask images are repeated. A mask image can be repeated along the horizontal axis, the vertical axis, both axes, or not repeated at all.
   *
   * **Syntax**: `<repeat-style>#`
   *
   * **Initial value**: `no-repeat`
   *
   * |   Chrome    | Firefox |    Safari     |  Edge  | IE  |
   * | :---------: | :-----: | :-----------: | :----: | :-: |
   * | **1** _-x-_ | **53**  | **3.2** _-x-_ | **18** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/mask-repeat
   */
  maskRepeat?: MaskRepeatProperty;
  /**
   * The **`mask-size`** CSS property specifies the sizes of the mask images. The size of the image can be fully or partially constrained in order to preserve its intrinsic ratio.
   *
   * **Syntax**: `<bg-size>#`
   *
   * **Initial value**: `auto`
   *
   * |   Chrome    | Firefox |   Safari    |  Edge  | IE  |
   * | :---------: | :-----: | :---------: | :----: | :-: |
   * | **4** _-x-_ | **53**  | **4** _-x-_ | **18** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/mask-size
   */
  maskSize?: MaskSizeProperty<TLength>;
  /**
   * The **`mask-type`** CSS property sets whether an SVG `<mask>` element is used as a _luminance_ or an _alpha_ mask. It applies to the `<mask>` element itself.
   *
   * **Syntax**: `luminance | alpha`
   *
   * **Initial value**: `luminance`
   *
   * | Chrome | Firefox | Safari  |  Edge  | IE  |
   * | :----: | :-----: | :-----: | :----: | :-: |
   * | **24** | **35**  | **6.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/mask-type
   */
  maskType?: MaskTypeProperty;
  /**
   * The `**max-block-size**` CSS property specifies the maximum size of an element in the direction opposite that of the writing direction as specified by `writing-mode`. That is, if the writing direction is horizontal, then `max-block-size` is equivalent to `max-height`; if the writing direction is vertical, `max-block-size` is the same as `max-width`.
   *
   * **Syntax**: `<'max-width'>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **57** | **41**  | **12.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/max-block-size
   */
  maxBlockSize?: MaxBlockSizeProperty<TLength>;
  /**
   * The **`max-height`** CSS property sets the maximum height of an element. It prevents the used value of the `height` property from becoming larger than the value specified for `max-height`.
   *
   * **Syntax**: `auto | <length> | <percentage> | min-content | max-content | fit-content(<length-percentage>)`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari  |  Edge  |  IE   |
   * | :----: | :-----: | :-----: | :----: | :---: |
   * | **18** |  **1**  | **1.3** | **12** | **7** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/max-height
   */
  maxHeight?: MaxHeightProperty<TLength>;
  /**
   * The **`max-inline-size`** CSS property defines the horizontal or vertical maximum size of an element's block depending on its writing mode. It corresponds to the `max-width` or the `max-height` property depending on the value defined for `writing-mode`. If the writing mode is vertically oriented, the value of `max-inline-size` relates to the maximal height of the element, otherwise it relates to the maximal width of the element. It relates to `max-block-size`, which defines the other dimension of the element.
   *
   * **Syntax**: `<'max-width'>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox |   Safari   |  Edge  | IE  |
   * | :----: | :-----: | :--------: | :----: | :-: |
   * | **57** | **41**  |  **12.1**  | **79** | No  |
   * |        |         | 10.1 _-x-_ |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/max-inline-size
   */
  maxInlineSize?: MaxInlineSizeProperty<TLength>;
  /**
   * **Syntax**: `none | <integer>`
   *
   * **Initial value**: `none`
   */
  maxLines?: MaxLinesProperty;
  /**
   * The **`max-width`** CSS property sets the maximum width of an element. It prevents the used value of the `width` property from becoming larger than the value specified by `max-width`.
   *
   * **Syntax**: `auto | <length> | <percentage> | min-content | max-content | fit-content(<length-percentage>)`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **7** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/max-width
   */
  maxWidth?: MaxWidthProperty<TLength>;
  /**
   * The **`min-block-size`** CSS property defines the minimum horizontal or vertical size of an element's block, depending on its writing mode. It corresponds to either the `min-width` or the `min-height` property, depending on the value of `writing-mode`.
   *
   * **Syntax**: `<'min-width'>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **57** | **41**  | **12.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/min-block-size
   */
  minBlockSize?: MinBlockSizeProperty<TLength>;
  /**
   * The **`min-height`** CSS property sets the minimum height of an element. It prevents the used value of the `height` property from becoming smaller than the value specified for `min-height`.
   *
   * **Syntax**: `auto | <length> | <percentage> | min-content | max-content | fit-content(<length-percentage>)`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari  |  Edge  |  IE   |
   * | :----: | :-----: | :-----: | :----: | :---: |
   * | **1**  |  **3**  | **1.3** | **12** | **7** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/min-height
   */
  minHeight?: MinHeightProperty<TLength>;
  /**
   * The **`min-inline-size`** CSS property defines the horizontal or vertical minimal size of an element's block, depending on its writing mode. It corresponds to either the `min-width` or the `min-height` property, depending on the value of `writing-mode`.
   *
   * **Syntax**: `<'min-width'>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **57** | **41**  | **12.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/min-inline-size
   */
  minInlineSize?: MinInlineSizeProperty<TLength>;
  /**
   * The **`min-width`** CSS property sets the minimum width of an element. It prevents the used value of the `width` property from becoming smaller than the value specified for `min-width`.
   *
   * **Syntax**: `auto | <length> | <percentage> | min-content | max-content | fit-content(<length-percentage>)`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **7** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/min-width
   */
  minWidth?: MinWidthProperty<TLength>;
  /**
   * The **`mix-blend-mode`** CSS property sets how an element's content should blend with the content of the element's parent and the element's background.
   *
   * **Syntax**: `<blend-mode>`
   *
   * **Initial value**: `normal`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **41** | **32**  | **8**  | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/mix-blend-mode
   */
  mixBlendMode?: MixBlendModeProperty;
  /**
   * The **`offset-distance`** CSS property specifies a position along an `offset-path`.
   *
   * **Syntax**: `<length-percentage>`
   *
   * **Initial value**: `0`
   *
   * |         Chrome         | Firefox | Safari |  Edge  | IE  |
   * | :--------------------: | :-----: | :----: | :----: | :-: |
   * |         **55**         | **72**  |   No   | **79** | No  |
   * | 46 _(motion-distance)_ |         |        |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/offset-distance
   */
  motionDistance?: OffsetDistanceProperty<TLength>;
  /**
   * The **`offset-path`** CSS property specifies a motion path for an element to follow and defines the element's positioning within the parent container or SVG coordinate system.
   *
   * **Syntax**: `none | ray( [ <angle> && <size>? && contain? ] ) | <path()> | <url> | [ <basic-shape> || <geometry-box> ]`
   *
   * **Initial value**: `none`
   *
   * |       Chrome       | Firefox | Safari |  Edge  | IE  |
   * | :----------------: | :-----: | :----: | :----: | :-: |
   * |       **55**       | **72**  |   No   | **79** | No  |
   * | 46 _(motion-path)_ |         |        |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/offset-path
   */
  motionPath?: OffsetPathProperty;
  /**
   * The **`offset-rotate`** CSS property defines the direction of the element while positioning along the offset path.
   *
   * **Syntax**: `[ auto | reverse ] || <angle>`
   *
   * **Initial value**: `auto`
   *
   * |         Chrome         | Firefox | Safari |  Edge  | IE  |
   * | :--------------------: | :-----: | :----: | :----: | :-: |
   * |         **56**         | **72**  |   No   | **79** | No  |
   * | 46 _(motion-rotation)_ |         |        |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/offset-rotate
   */
  motionRotation?: OffsetRotateProperty;
  /**
   * The **`object-fit`** CSS property sets how the content of a replaced element, such as an `<img>` or `<video>`, should be resized to fit its container.
   *
   * **Syntax**: `fill | contain | cover | none | scale-down`
   *
   * **Initial value**: `fill`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **31** | **36**  | **10** | **16** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/object-fit
   */
  objectFit?: ObjectFitProperty;
  /**
   * The **`object-position`** CSS property specifies the alignment of the selected replaced element's contents within the element's box. Areas of the box which aren't covered by the replaced element's object will show the element's background.
   *
   * **Syntax**: `<position>`
   *
   * **Initial value**: `50% 50%`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **31** | **36**  | **10** | **16** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/object-position
   */
  objectPosition?: ObjectPositionProperty<TLength>;
  /**
   * **Syntax**: `auto | <position>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **79** | **72**  |   No   | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/offset-anchor
   */
  offsetAnchor?: OffsetAnchorProperty<TLength>;
  /**
   * The **`offset-distance`** CSS property specifies a position along an `offset-path`.
   *
   * **Syntax**: `<length-percentage>`
   *
   * **Initial value**: `0`
   *
   * |         Chrome         | Firefox | Safari |  Edge  | IE  |
   * | :--------------------: | :-----: | :----: | :----: | :-: |
   * |         **55**         | **72**  |   No   | **79** | No  |
   * | 46 _(motion-distance)_ |         |        |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/offset-distance
   */
  offsetDistance?: OffsetDistanceProperty<TLength>;
  /**
   * The **`offset-path`** CSS property specifies a motion path for an element to follow and defines the element's positioning within the parent container or SVG coordinate system.
   *
   * **Syntax**: `none | ray( [ <angle> && <size>? && contain? ] ) | <path()> | <url> | [ <basic-shape> || <geometry-box> ]`
   *
   * **Initial value**: `none`
   *
   * |       Chrome       | Firefox | Safari |  Edge  | IE  |
   * | :----------------: | :-----: | :----: | :----: | :-: |
   * |       **55**       | **72**  |   No   | **79** | No  |
   * | 46 _(motion-path)_ |         |        |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/offset-path
   */
  offsetPath?: OffsetPathProperty;
  /**
   * The **`offset-rotate`** CSS property defines the direction of the element while positioning along the offset path.
   *
   * **Syntax**: `[ auto | reverse ] || <angle>`
   *
   * **Initial value**: `auto`
   *
   * |         Chrome         | Firefox | Safari |  Edge  | IE  |
   * | :--------------------: | :-----: | :----: | :----: | :-: |
   * |         **56**         | **72**  |   No   | **79** | No  |
   * | 46 _(motion-rotation)_ |         |        |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/offset-rotate
   */
  offsetRotate?: OffsetRotateProperty;
  /**
   * The **`offset-rotate`** CSS property defines the direction of the element while positioning along the offset path.
   *
   * **Syntax**: `[ auto | reverse ] || <angle>`
   *
   * **Initial value**: `auto`
   *
   * |         Chrome         | Firefox | Safari |  Edge  | IE  |
   * | :--------------------: | :-----: | :----: | :----: | :-: |
   * |         **56**         | **72**  |   No   | **79** | No  |
   * | 46 _(motion-rotation)_ |         |        |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/offset-rotate
   */
  offsetRotation?: OffsetRotateProperty;
  /**
   * The **`opacity`** CSS property sets the transparency of an element or the degree to which content behind an element is visible.
   *
   * **Syntax**: `<alpha-value>`
   *
   * **Initial value**: `1.0`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **2**  | **12** | **9** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/opacity
   */
  opacity?: OpacityProperty;
  /**
   * The **`order`** CSS property sets the order to lay out an item in a flex or grid container. Items in a container are sorted by ascending `order` value and then by their source code order.
   *
   * **Syntax**: `<integer>`
   *
   * **Initial value**: `0`
   *
   * |  Chrome  | Firefox | Safari  |  Edge  |    IE    |
   * | :------: | :-----: | :-----: | :----: | :------: |
   * |  **29**  | **20**  |  **9**  | **12** |  **11**  |
   * | 21 _-x-_ |         | 7 _-x-_ |        | 10 _-x-_ |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/order
   */
  order?: GlobalsNumber;
  /**
   * The **`orphans`** CSS property sets the minimum number of lines in a block container that must be shown at the _bottom_ of a page, region, or column.
   *
   * **Syntax**: `<integer>`
   *
   * **Initial value**: `2`
   *
   * | Chrome | Firefox | Safari  |  Edge  |  IE   |
   * | :----: | :-----: | :-----: | :----: | :---: |
   * | **25** |   No    | **1.3** | **12** | **8** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/orphans
   */
  orphans?: GlobalsNumber;
  /**
   * The **`outline-color`** CSS property sets the color of an element's outline.
   *
   * **Syntax**: `<color> | invert`
   *
   * **Initial value**: `invert`, for browsers supporting it, `currentColor` for the other
   *
   * | Chrome | Firefox | Safari  |  Edge  |  IE   |
   * | :----: | :-----: | :-----: | :----: | :---: |
   * | **1**  | **1.5** | **1.2** | **12** | **8** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/outline-color
   */
  outlineColor?: OutlineColorProperty;
  /**
   * The **`outline-offset`** CSS property sets the amount of space between an outline and the edge or border of an element.
   *
   * **Syntax**: `<length>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari  |  Edge  | IE  |
   * | :----: | :-----: | :-----: | :----: | :-: |
   * | **1**  | **1.5** | **1.2** | **15** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/outline-offset
   */
  outlineOffset?: OutlineOffsetProperty<TLength>;
  /**
   * The **`outline-style`** CSS property sets the style of an element's outline. An outline is a line that is drawn around an element, outside the `border`.
   *
   * **Syntax**: `auto | <'border-style'>`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari  |  Edge  |  IE   |
   * | :----: | :-----: | :-----: | :----: | :---: |
   * | **1**  | **1.5** | **1.2** | **12** | **8** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/outline-style
   */
  outlineStyle?: OutlineStyleProperty;
  /**
   * The **`outline-width`** CSS property sets the thickness of an element's outline. An outline is a line that is drawn around an element, outside the `border`.
   *
   * **Syntax**: `<line-width>`
   *
   * **Initial value**: `medium`
   *
   * | Chrome | Firefox | Safari  |  Edge  |  IE   |
   * | :----: | :-----: | :-----: | :----: | :---: |
   * | **1**  | **1.5** | **1.2** | **12** | **8** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/outline-width
   */
  outlineWidth?: OutlineWidthProperty<TLength>;
  /**
   * **Syntax**: `auto | none`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **56** | **66**  |   No   | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/overflow-anchor
   */
  overflowAnchor?: OverflowAnchorProperty;
  /**
   * **Syntax**: `visible | hidden | clip | scroll | auto`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari | Edge | IE  |
   * | :----: | :-----: | :----: | :--: | :-: |
   * |   No   | **69**  |   No   |  No  | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/overflow-block
   */
  overflowBlock?: OverflowBlockProperty;
  /**
   * The **`overflow-clip-box`** CSS property specifies relative to which box the clipping happens when there is an overflow. It is short hand for the `overflow-clip-box-inline` and `overflow-clip-box-block` properties.
   *
   * **Syntax**: `padding-box | content-box`
   *
   * **Initial value**: `padding-box`
   *
   * | Chrome | Firefox | Safari | Edge | IE  |
   * | :----: | :-----: | :----: | :--: | :-: |
   * |   No   | **29**  |   No   |  No  | No  |
   *
   * @see https://developer.mozilla.org/docs/Mozilla/CSS/overflow-clip-box
   */
  overflowClipBox?: OverflowClipBoxProperty;
  /**
   * **Syntax**: `visible | hidden | clip | scroll | auto`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari | Edge | IE  |
   * | :----: | :-----: | :----: | :--: | :-: |
   * |   No   | **69**  |   No   |  No  | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/overflow-inline
   */
  overflowInline?: OverflowInlineProperty;
  /**
   * The `**overflow-wrap**` CSS property sets whether the browser should insert line breaks within words to prevent text from overflowing its content box.
   *
   * **Syntax**: `normal | break-word | anywhere`
   *
   * **Initial value**: `normal`
   *
   * |     Chrome      |      Firefox      |     Safari      |       Edge       |          IE           |
   * | :-------------: | :---------------: | :-------------: | :--------------: | :-------------------: |
   * |     **23**      |      **49**       |     **6.1**     |      **18**      | **5.5** _(word-wrap)_ |
   * | 1 _(word-wrap)_ | 3.5 _(word-wrap)_ | 1 _(word-wrap)_ | 12 _(word-wrap)_ |                       |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/overflow-wrap
   */
  overflowWrap?: OverflowWrapProperty;
  /**
   * The **`overflow-x`** CSS property sets what shows when content overflows a block-level element's left and right edges. This may be nothing, a scroll bar, or the overflow content.
   *
   * **Syntax**: `visible | hidden | clip | scroll | auto`
   *
   * **Initial value**: `visible`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  | **3.5** | **3**  | **12** | **5** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/overflow-x
   */
  overflowX?: OverflowXProperty;
  /**
   * The **`overflow-y`** CSS property sets what shows when content overflows a block-level element's top and bottom edges. This may be nothing, a scroll bar, or the overflow content.
   *
   * **Syntax**: `visible | hidden | clip | scroll | auto`
   *
   * **Initial value**: `visible`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  | **1.5** | **3**  | **12** | **5** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/overflow-y
   */
  overflowY?: OverflowYProperty;
  /**
   * The **`overscroll-behavior`** CSS property sets what a browser does when reaching the boundary of a scrolling area. It's a shorthand for `overscroll-behavior-x` and `overscroll-behavior-y`.
   *
   * **Syntax**: `[ contain | none | auto ]{1,2}`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **63** | **59**  |   No   | **18** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/overscroll-behavior
   */
  overscrollBehavior?: OverscrollBehaviorProperty;
  /**
   * The **`overscroll-behavior-block`** CSS property sets the browser's behavior when the block direction boundary of a scrolling area is reached.
   *
   * **Syntax**: `contain | none | auto`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **77** | **73**  |   No   | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/overscroll-behavior-block
   */
  overscrollBehaviorBlock?: OverscrollBehaviorBlockProperty;
  /**
   * The **`overscroll-behavior-inline`** CSS property sets the browser's behavior when the inline direction boundary of a scrolling area is reached.
   *
   * **Syntax**: `contain | none | auto`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **77** | **73**  |   No   | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/overscroll-behavior-inline
   */
  overscrollBehaviorInline?: OverscrollBehaviorInlineProperty;
  /**
   * The **`overscroll-behavior-x`** CSS property sets the browser's behavior when the horizontal boundary of a scrolling area is reached.
   *
   * **Syntax**: `contain | none | auto`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **63** | **59**  |   No   | **18** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/overscroll-behavior-x
   */
  overscrollBehaviorX?: OverscrollBehaviorXProperty;
  /**
   * The **`overscroll-behavior-y`** CSS property sets the browser's behavior when the vertical boundary of a scrolling area is reached.
   *
   * **Syntax**: `contain | none | auto`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **63** | **59**  |   No   | **18** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/overscroll-behavior-y
   */
  overscrollBehaviorY?: OverscrollBehaviorYProperty;
  /**
   * The **`padding-block`** CSS property defines the logical block start and end padding of an element, which maps to physical padding properties depending on the element's writing mode, directionality, and text orientation.
   *
   * **Syntax**: `<'padding-left'>{1,2}`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **69** | **66**  |   No   | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/padding-block
   */
  paddingBlock?: PaddingBlockProperty<TLength>;
  /**
   * The **`padding-block-end`** CSS property defines the logical block end padding of an element, which maps to a physical padding depending on the element's writing mode, directionality, and text orientation. It corresponds to the `padding-top`, `padding-right`, `padding-bottom`, or `padding-left` property depending on the values defined for `writing-mode`, `direction`, and `text-orientation`.
   *
   * **Syntax**: `<'padding-left'>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **69** | **41**  | **12.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/padding-block-end
   */
  paddingBlockEnd?: PaddingBlockEndProperty<TLength>;
  /**
   * The **`padding-block-start`** CSS property defines the logical block start padding of an element, which maps to a physical padding depending on the element's writing mode, directionality, and text orientation. It corresponds to the `padding-top`, `padding-right`, `padding-bottom`, or `padding-left` property depending on the values defined for `writing-mode`, `direction`, and `text-orientation`.
   *
   * **Syntax**: `<'padding-left'>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **69** | **41**  | **12.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/padding-block-start
   */
  paddingBlockStart?: PaddingBlockStartProperty<TLength>;
  /**
   * The **`padding-bottom`** CSS property sets the height of the padding area on the bottom of an element.
   *
   * **Syntax**: `<length> | <percentage>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/padding-bottom
   */
  paddingBottom?: PaddingBottomProperty<TLength>;
  /**
   * The **`padding-inline`** CSS property defines the logical inline start and end padding of an element, which maps to physical padding properties depending on the element's writing mode, directionality, and text orientation.
   *
   * **Syntax**: `<'padding-left'>{1,2}`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **69** | **66**  |   No   | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/padding-inline
   */
  paddingInline?: PaddingInlineProperty<TLength>;
  /**
   * The **`padding-inline-end`** CSS property defines the logical inline end padding of an element, which maps to a physical padding depending on the element's writing mode, directionality, and text orientation. It corresponds to the `padding-top`, `padding-right`, `padding-bottom`, or `padding-left` property depending on the values defined for `writing-mode`, `direction`, and `text-orientation`.
   *
   * **Syntax**: `<'padding-left'>`
   *
   * **Initial value**: `0`
   *
   * |          Chrome           |        Firefox         |          Safari           |  Edge  | IE  |
   * | :-----------------------: | :--------------------: | :-----------------------: | :----: | :-: |
   * |          **69**           |         **41**         |         **12.1**          | **79** | No  |
   * | 2 _(-webkit-padding-end)_ | 3 _(-moz-padding-end)_ | 3 _(-webkit-padding-end)_ |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/padding-inline-end
   */
  paddingInlineEnd?: PaddingInlineEndProperty<TLength>;
  /**
   * The **`padding-inline-start`** CSS property defines the logical inline start padding of an element, which maps to a physical padding depending on the element's writing mode, directionality, and text orientation. It corresponds to the `padding-top`, `padding-right`, `padding-bottom`, or `padding-left` property depending on the values defined for `writing-mode`, `direction`, and `text-orientation`.
   *
   * **Syntax**: `<'padding-left'>`
   *
   * **Initial value**: `0`
   *
   * |           Chrome            |         Firefox          |           Safari            |  Edge  | IE  |
   * | :-------------------------: | :----------------------: | :-------------------------: | :----: | :-: |
   * |           **69**            |          **41**          |          **12.1**           | **79** | No  |
   * | 2 _(-webkit-padding-start)_ | 3 _(-moz-padding-start)_ | 3 _(-webkit-padding-start)_ |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/padding-inline-start
   */
  paddingInlineStart?: PaddingInlineStartProperty<TLength>;
  /**
   * The **`padding-left`** CSS property sets the width of the padding area on the left side of an element.
   *
   * **Syntax**: `<length> | <percentage>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/padding-left
   */
  paddingLeft?: PaddingLeftProperty<TLength>;
  /**
   * The **`padding-right`** CSS property sets the width of the padding area on the right side of an element.
   *
   * **Syntax**: `<length> | <percentage>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/padding-right
   */
  paddingRight?: PaddingRightProperty<TLength>;
  /**
   * The **`padding-top`** padding area on the top of an element.
   *
   * **Syntax**: `<length> | <percentage>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/padding-top
   */
  paddingTop?: PaddingTopProperty<TLength>;
  /**
   * The **`page-break-after`** CSS property adjusts page breaks _after_ the current element.
   *
   * **Syntax**: `auto | always | avoid | left | right | recto | verso`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari  |  Edge  |  IE   |
   * | :----: | :-----: | :-----: | :----: | :---: |
   * | **1**  |  **1**  | **1.2** | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/page-break-after
   */
  pageBreakAfter?: PageBreakAfterProperty;
  /**
   * The **`page-break-before`** CSS property adjusts page breaks _before_ the current element.
   *
   * **Syntax**: `auto | always | avoid | left | right | recto | verso`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari  |  Edge  |  IE   |
   * | :----: | :-----: | :-----: | :----: | :---: |
   * | **1**  |  **1**  | **1.2** | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/page-break-before
   */
  pageBreakBefore?: PageBreakBeforeProperty;
  /**
   * The **`page-break-inside`** CSS property adjusts page breaks _inside_ the current element.
   *
   * **Syntax**: `auto | avoid`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari  |  Edge  |  IE   |
   * | :----: | :-----: | :-----: | :----: | :---: |
   * | **1**  | **19**  | **1.3** | **12** | **8** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/page-break-inside
   */
  pageBreakInside?: PageBreakInsideProperty;
  /**
   * The **`paint-order`** CSS property lets you control the order in which the fill and stroke (and painting markers) of text content and shapes are drawn.
   *
   * **Syntax**: `normal | [ fill || stroke || markers ]`
   *
   * **Initial value**: `normal`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **35** | **60**  | **8**  | **17** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/paint-order
   */
  paintOrder?: PaintOrderProperty;
  /**
   * The **`perspective`** CSS property determines the distance between the z=0 plane and the user in order to give a 3D-positioned element some perspective. Each 3D element with z>0 becomes larger; each 3D-element with z<0 becomes smaller. The strength of the effect is determined by the value of this property.
   *
   * **Syntax**: `none | <length>`
   *
   * **Initial value**: `none`
   *
   * |  Chrome  | Firefox  | Safari  |  Edge  |   IE   |
   * | :------: | :------: | :-----: | :----: | :----: |
   * |  **36**  |  **16**  |  **9**  | **12** | **10** |
   * | 12 _-x-_ | 10 _-x-_ | 4 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/perspective
   */
  perspective?: PerspectiveProperty<TLength>;
  /**
   * The **`perspective-origin`** CSS property determines the position at which the viewer is looking. It is used as the _vanishing point_ by the `perspective` property.
   *
   * **Syntax**: `<position>`
   *
   * **Initial value**: `50% 50%`
   *
   * |  Chrome  | Firefox  | Safari  |  Edge  |   IE   |
   * | :------: | :------: | :-----: | :----: | :----: |
   * |  **36**  |  **16**  |  **9**  | **12** | **10** |
   * | 12 _-x-_ | 10 _-x-_ | 4 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/perspective-origin
   */
  perspectiveOrigin?: PerspectiveOriginProperty<TLength>;
  /**
   * The `**place-content**` CSS property is a shorthand for `align-content` and `justify-content`. It can be used in any layout method which utilizes both of these alignment values.
   *
   * **Syntax**: `<'align-content'> <'justify-content'>?`
   *
   * **Initial value**: `normal`
   *
   * ---
   *
   * _Supported in Flex Layout_
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **59** | **45**  | **9**  | **79** | No  |
   *
   * ---
   *
   * _Supported in Grid Layout_
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **59** | **53**  | **11** | **79** | No  |
   *
   * ---
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/place-content
   */
  placeContent?: PlaceContentProperty;
  /**
   * The **`pointer-events`** CSS property sets under what circumstances (if any) a particular graphic element can become the target of mouse events.
   *
   * **Syntax**: `auto | none | visiblePainted | visibleFill | visibleStroke | visible | painted | fill | stroke | all | inherit`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  |   IE   |
   * | :----: | :-----: | :----: | :----: | :----: |
   * | **1**  | **1.5** | **4**  | **12** | **11** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/pointer-events
   */
  pointerEvents?: PointerEventsProperty;
  /**
   * The **`position`** CSS property sets how an element is positioned in a document. The `top`, `right`, `bottom`, and `left` properties determine the final location of positioned elements.
   *
   * **Syntax**: `static | relative | absolute | sticky | fixed`
   *
   * **Initial value**: `static`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/position
   */
  position?: PositionProperty;
  /**
   * The **`quotes`** CSS property sets how quotation marks appear.
   *
   * **Syntax**: `none | auto | [ <string> <string> ]+`
   *
   * **Initial value**: depends on user agent
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **11** | **1.5** | **9**  | **12** | **8** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/quotes
   */
  quotes?: QuotesProperty;
  /**
   * The **`resize`** CSS property sets whether an element is resizable, and if so, in which directions.
   *
   * **Syntax**: `none | both | horizontal | vertical | block | inline`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **1**  |  **4**  | **3**  | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/resize
   */
  resize?: ResizeProperty;
  /**
   * The **`right`** CSS property participates in specifying the horizontal position of a _positioned element_. It has no effect on non-positioned elements.
   *
   * **Syntax**: `<length> | <percentage> | auto`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  |   IE    |
   * | :----: | :-----: | :----: | :----: | :-----: |
   * | **1**  |  **1**  | **1**  | **12** | **5.5** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/right
   */
  right?: RightProperty<TLength>;
  /**
   * The **`rotate`** CSS property allows you to specify rotation transforms individually and independantly of the `transform` property. This maps better to typical user interface usage, and saves having to remember the exact order of transform functions to specify in the `transform` value.
   *
   * **Syntax**: `none | <angle> | [ x | y | z | <number>{3} ] && <angle>`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari | Edge | IE  |
   * | :----: | :-----: | :----: | :--: | :-: |
   * |   No   | **72**  |   No   |  No  | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/rotate
   */
  rotate?: RotateProperty;
  /**
   * The **`row-gap`** CSS property sets the size of the gap (gutter) between an element's grid rows.
   *
   * **Syntax**: `normal | <length-percentage>`
   *
   * **Initial value**: `normal`
   *
   * ---
   *
   * _Supported in Flex Layout_
   *
   * | Chrome | Firefox | Safari | Edge | IE  |
   * | :----: | :-----: | :----: | :--: | :-: |
   * |   No   | **63**  |   No   |  No  | No  |
   *
   * ---
   *
   * _Supported in Grid Layout_
   *
   * |       Chrome        |       Firefox       |          Safari           |  Edge  | IE  |
   * | :-----------------: | :-----------------: | :-----------------------: | :----: | :-: |
   * |       **66**        |       **61**        | **10.1** _(grid-row-gap)_ | **16** | No  |
   * | 57 _(grid-row-gap)_ | 52 _(grid-row-gap)_ |                           |        |     |
   *
   * ---
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/row-gap
   */
  rowGap?: RowGapProperty<TLength>;
  /**
   * The `**ruby-align**` CSS property defines the distribution of the different ruby elements over the base.
   *
   * **Syntax**: `start | center | space-between | space-around`
   *
   * **Initial value**: `space-around`
   *
   * | Chrome | Firefox | Safari | Edge | IE  |
   * | :----: | :-----: | :----: | :--: | :-: |
   * |   No   | **38**  |   No   |  No  | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/ruby-align
   */
  rubyAlign?: RubyAlignProperty;
  /**
   * **Syntax**: `separate | collapse | auto`
   *
   * **Initial value**: `separate`
   */
  rubyMerge?: RubyMergeProperty;
  /**
   * The `**ruby-position**` CSS property defines the position of a ruby element relatives to its base element. It can be position over the element (`over`), under it (`under`), or between the characters, on their right side (`inter-character`).
   *
   * **Syntax**: `over | under | inter-character`
   *
   * **Initial value**: `over`
   *
   * | Chrome | Firefox | Safari | Edge  | IE  |
   * | :----: | :-----: | :----: | :---: | :-: |
   * |   No   | **38**  |   No   | 12-79 | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/ruby-position
   */
  rubyPosition?: RubyPositionProperty;
  /**
   * The **`scale`** CSS property allows you to specify scale transforms individually and independantly of the `transform` property. This maps better to typical user interface usage, and saves having to remember the exact order of transform functions to specify in the `transform` value.
   *
   * **Syntax**: `none | <number>{1,3}`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari | Edge | IE  |
   * | :----: | :-----: | :----: | :--: | :-: |
   * |   No   | **72**  |   No   |  No  | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/scale
   */
  scale?: ScaleProperty;
  /**
   * The **`scroll-behavior`** CSS property sets the behavior for a scrolling box when scrolling is triggered by the navigation or CSSOM scrolling APIs.
   *
   * **Syntax**: `auto | smooth`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **61** | **36**  |   No   | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/scroll-behavior
   */
  scrollBehavior?: ScrollBehaviorProperty;
  /**
   * The **`scroll-margin`** property is a shorthand property which sets all of the `scroll-margin` longhands, assigning values much like the `margin` property does for the `margin-*` longhands.
   *
   * **Syntax**: `<length>{1,4}`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox |            Safari             |  Edge  | IE  |
   * | :----: | :-----: | :---------------------------: | :----: | :-: |
   * | **69** | **68**  | **11** _(scroll-snap-margin)_ | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/scroll-margin
   */
  scrollMargin?: ScrollMarginProperty<TLength>;
  /**
   * The `scroll-margin-block` property is a shorthand property which sets the scroll-margin longhands in the block dimension.
   *
   * **Syntax**: `<length>{1,2}`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **69** | **68**  |   No   | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/scroll-margin-block
   */
  scrollMarginBlock?: ScrollMarginBlockProperty<TLength>;
  /**
   * The `scroll-margin-block-end` property defines the margin of the scroll snap area at the end of the block dimension that is used for snapping this box to the snapport. The scroll snap area is determined by taking the transformed border box, finding its rectangular bounding box (axis-aligned in the scroll container’s coordinate space), then adding the specified outsets.
   *
   * **Syntax**: `<length>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **69** | **68**  |   No   | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/scroll-margin-block-end
   */
  scrollMarginBlockEnd?: ScrollMarginBlockEndProperty<TLength>;
  /**
   * The `scroll-margin-block-start` property defines the margin of the scroll snap area at the start of the block dimension that is used for snapping this box to the snapport. The scroll snap area is determined by taking the transformed border box, finding its rectangular bounding box (axis-aligned in the scroll container’s coordinate space), then adding the specified outsets.
   *
   * **Syntax**: `<length>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **69** | **68**  |   No   | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/scroll-margin-block-start
   */
  scrollMarginBlockStart?: ScrollMarginBlockStartProperty<TLength>;
  /**
   * The `scroll-margin-bottom` property defines the bottom margin of the scroll snap area that is used for snapping this box to the snapport. The scroll snap area is determined by taking the transformed border box, finding its rectangular bounding box (axis-aligned in the scroll container’s coordinate space), then adding the specified outsets.
   *
   * **Syntax**: `<length>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox |                Safari                |  Edge  | IE  |
   * | :----: | :-----: | :----------------------------------: | :----: | :-: |
   * | **69** | **68**  | **11** _(scroll-snap-margin-bottom)_ | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/scroll-margin-bottom
   */
  scrollMarginBottom?: ScrollMarginBottomProperty<TLength>;
  /**
   * The `scroll-margin-inline` property is a shorthand property which sets the scroll-margin longhands in the inline dimension.
   *
   * **Syntax**: `<length>{1,2}`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari | Edge | IE  |
   * | :----: | :-----: | :----: | :--: | :-: |
   * |   No   | **68**  |   No   |  No  | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/scroll-margin-inline
   */
  scrollMarginInline?: ScrollMarginInlineProperty<TLength>;
  /**
   * The `scroll-margin-inline-end` property defines the margin of the scroll snap area at the end of the inline dimension that is used for snapping this box to the snapport. The scroll snap area is determined by taking the transformed border box, finding its rectangular bounding box (axis-aligned in the scroll container’s coordinate space), then adding the specified outsets.
   *
   * **Syntax**: `<length>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **69** | **68**  |   No   | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/scroll-margin-inline-end
   */
  scrollMarginInlineEnd?: ScrollMarginInlineEndProperty<TLength>;
  /**
   * The `scroll-margin-inline-start` property defines the margin of the scroll snap area at the start of the inline dimension that is used for snapping this box to the snapport. The scroll snap area is determined by taking the transformed border box, finding its rectangular bounding box (axis-aligned in the scroll container’s coordinate space), then adding the specified outsets.
   *
   * **Syntax**: `<length>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **69** | **68**  |   No   | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/scroll-margin-inline-start
   */
  scrollMarginInlineStart?: ScrollMarginInlineStartProperty<TLength>;
  /**
   * The `scroll-margin-left` property defines the left margin of the scroll snap area that is used for snapping this box to the snapport. The scroll snap area is determined by taking the transformed border box, finding its rectangular bounding box (axis-aligned in the scroll container’s coordinate space), then adding the specified outsets.
   *
   * **Syntax**: `<length>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox |               Safari               |  Edge  | IE  |
   * | :----: | :-----: | :--------------------------------: | :----: | :-: |
   * | **69** | **68**  | **11** _(scroll-snap-margin-left)_ | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/scroll-margin-left
   */
  scrollMarginLeft?: ScrollMarginLeftProperty<TLength>;
  /**
   * The `scroll-margin-right` property defines the right margin of the scroll snap area that is used for snapping this box to the snapport. The scroll snap area is determined by taking the transformed border box, finding its rectangular bounding box (axis-aligned in the scroll container’s coordinate space), then adding the specified outsets.
   *
   * **Syntax**: `<length>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox |               Safari                |  Edge  | IE  |
   * | :----: | :-----: | :---------------------------------: | :----: | :-: |
   * | **69** | **68**  | **11** _(scroll-snap-margin-right)_ | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/scroll-margin-right
   */
  scrollMarginRight?: ScrollMarginRightProperty<TLength>;
  /**
   * The `scroll-margin-top` property defines the top margin of the scroll snap area that is used for snapping this box to the snapport. The scroll snap area is determined by taking the transformed border box, finding its rectangular bounding box (axis-aligned in the scroll container’s coordinate space), then adding the specified outsets.
   *
   * **Syntax**: `<length>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox |              Safari               |  Edge  | IE  |
   * | :----: | :-----: | :-------------------------------: | :----: | :-: |
   * | **69** | **68**  | **11** _(scroll-snap-margin-top)_ | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/scroll-margin-top
   */
  scrollMarginTop?: ScrollMarginTopProperty<TLength>;
  /**
 * The scroll-padding property is a shorthand property which sets all of the scroll-padding longhands, assigning values much like the padding property does for the padding-\* longhands.  
  
The scroll-padding properties define offsets for the optimal viewing region of the scrollport: the region used as the target region for placing things in view of the user. This allows the author to exclude regions of the scrollport that are obscured by other content (such as fixed-positioned toolbars or sidebars) or simply to put more breathing room between a targetted element and the edges of the scrollport.
 * 
 * **Syntax**: `[ auto | <length-percentage> ]{1,4}`
 * 
 * **Initial value**: `auto`
 * 
 * | Chrome | Firefox | Safari |  Edge  | IE  |
 * | :----: | :-----: | :----: | :----: | :-: |
 * | **69** | **68**  | **11** | **79** | No  |
 * 
 * @see https://developer.mozilla.org/docs/Web/CSS/scroll-padding
 */
  scrollPadding?: ScrollPaddingProperty<TLength>;
  /**
 * The `scroll-padding-block` property is a shorthand property which sets the scroll-padding longhands for the block dimension.  
  
The scroll-padding properties define offsets for the optimal viewing region of the scrollport: the region used as the target region for placing things in view of the user. This allows the author to exclude regions of the scrollport that are obscured by other content (such as fixed-positioned toolbars or sidebars) or simply to put more breathing room between a targetted element and the edges of the scrollport.
 * 
 * **Syntax**: `[ auto | <length-percentage> ]{1,2}`
 * 
 * **Initial value**: `auto`
 * 
 * | Chrome | Firefox | Safari |  Edge  | IE  |
 * | :----: | :-----: | :----: | :----: | :-: |
 * | **69** | **68**  |   No   | **79** | No  |
 * 
 * @see https://developer.mozilla.org/docs/Web/CSS/scroll-padding-block
 */
  scrollPaddingBlock?: ScrollPaddingBlockProperty<TLength>;
  /**
   * The `scroll-padding-block-end` property defines offsets for the end edge in the block dimension of the optimal viewing region of the scrollport: the region used as the target region for placing things in view of the user. This allows the author to exclude regions of the scrollport that are obscured by other content (such as fixed-positioned toolbars or sidebars) or simply to put more breathing room between a targetted element and the edges of the scrollport.
   *
   * **Syntax**: `auto | <length-percentage>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **69** | **68**  |   No   | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/scroll-padding-block-end
   */
  scrollPaddingBlockEnd?: ScrollPaddingBlockEndProperty<TLength>;
  /**
   * The `scroll-padding-block-start` property defines offsets for the start edge in the block dimension of the optimal viewing region of the scrollport: the region used as the target region for placing things in view of the user. This allows the author to exclude regions of the scrollport that are obscured by other content (such as fixed-positioned toolbars or sidebars) or simply to put more breathing room between a targetted element and the edges of the scrollport.
   *
   * **Syntax**: `auto | <length-percentage>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **69** | **68**  |   No   | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/scroll-padding-block-start
   */
  scrollPaddingBlockStart?: ScrollPaddingBlockStartProperty<TLength>;
  /**
   * The `scroll-padding-bottom` property defines offsets for the bottom of the optimal viewing region of the scrollport: the region used as the target region for placing things in view of the user. This allows the author to exclude regions of the scrollport that are obscured by other content (such as fixed-positioned toolbars or sidebars) or simply to put more breathing room between a targetted element and the edges of the scrollport.
   *
   * **Syntax**: `auto | <length-percentage>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **69** | **68**  | **11** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/scroll-padding-bottom
   */
  scrollPaddingBottom?: ScrollPaddingBottomProperty<TLength>;
  /**
 * The `scroll-padding-inline` property is a shorthand property which sets the scroll-padding longhands for the inline dimension.  
  
The scroll-padding properties define offsets for the optimal viewing region of the scrollport: the region used as the target region for placing things in view of the user. This allows the author to exclude regions of the scrollport that are obscured by other content (such as fixed-positioned toolbars or sidebars) or simply to put more breathing room between a targetted element and the edges of the scrollport.
 * 
 * **Syntax**: `[ auto | <length-percentage> ]{1,2}`
 * 
 * **Initial value**: `auto`
 * 
 * | Chrome | Firefox | Safari |  Edge  | IE  |
 * | :----: | :-----: | :----: | :----: | :-: |
 * | **69** | **68**  |   No   | **79** | No  |
 * 
 * @see https://developer.mozilla.org/docs/Web/CSS/scroll-padding-inline
 */
  scrollPaddingInline?: ScrollPaddingInlineProperty<TLength>;
  /**
   * The `scroll-padding-inline-end` property defines offsets for the end edge in the inline dimension of the optimal viewing region of the scrollport: the region used as the target region for placing things in view of the user. This allows the author to exclude regions of the scrollport that are obscured by other content (such as fixed-positioned toolbars or sidebars) or simply to put more breathing room between a targetted element and the edges of the scrollport.
   *
   * **Syntax**: `auto | <length-percentage>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **69** | **68**  |   No   | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/scroll-padding-inline-end
   */
  scrollPaddingInlineEnd?: ScrollPaddingInlineEndProperty<TLength>;
  /**
   * The `scroll-padding-inline-start` property defines offsets for the start edge in the inline dimension of the optimal viewing region of the scrollport: the region used as the target region for placing things in view of the user. This allows the author to exclude regions of the scrollport that are obscured by other content (such as fixed-positioned toolbars or sidebars) or simply to put more breathing room between a targetted element and the edges of the scrollport.
   *
   * **Syntax**: `auto | <length-percentage>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **69** | **68**  |   No   | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/scroll-padding-inline-start
   */
  scrollPaddingInlineStart?: ScrollPaddingInlineStartProperty<TLength>;
  /**
   * The `scroll-padding-left` property defines offsets for the left of the optimal viewing region of the scrollport: the region used as the target region for placing things in view of the user. This allows the author to exclude regions of the scrollport that are obscured by other content (such as fixed-positioned toolbars or sidebars) or simply to put more breathing room between a targetted element and the edges of the scrollport.
   *
   * **Syntax**: `auto | <length-percentage>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **69** | **68**  | **11** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/scroll-padding-left
   */
  scrollPaddingLeft?: ScrollPaddingLeftProperty<TLength>;
  /**
   * The `scroll-padding-right` property defines offsets for the right of the optimal viewing region of the scrollport: the region used as the target region for placing things in view of the user. This allows the author to exclude regions of the scrollport that are obscured by other content (such as fixed-positioned toolbars or sidebars) or simply to put more breathing room between a targetted element and the edges of the scrollport.
   *
   * **Syntax**: `auto | <length-percentage>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **69** | **68**  | **11** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/scroll-padding-right
   */
  scrollPaddingRight?: ScrollPaddingRightProperty<TLength>;
  /**
   * The `scroll-padding-top` property defines offsets for the top of the optimal viewing region of the scrollport: the region used as the target region for placing things in view of the user. This allows the author to exclude regions of the scrollport that are obscured by other content (such as fixed-positioned toolbars or sidebars) or simply to put more breathing room between a targetted element and the edges of the scrollport.
   *
   * **Syntax**: `auto | <length-percentage>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **69** | **68**  | **11** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/scroll-padding-top
   */
  scrollPaddingTop?: ScrollPaddingTopProperty<TLength>;
  /**
   * The `scroll-snap-align` property specifies the box’s snap position as an alignment of its snap area (as the alignment subject) within its snap container’s snapport (as the alignment container). The two values specify the snapping alignment in the block axis and inline axis, respectively. If only one value is specified, the second value defaults to the same value.
   *
   * **Syntax**: `[ none | start | end | center ]{1,2}`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **69** | **68**  | **11** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/scroll-snap-align
   */
  scrollSnapAlign?: ScrollSnapAlignProperty;
  /**
   * The **`scroll-margin`** property is a shorthand property which sets all of the `scroll-margin` longhands, assigning values much like the `margin` property does for the `margin-*` longhands.
   *
   * **Syntax**: `<length>{1,4}`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox |            Safari             |  Edge  | IE  |
   * | :----: | :-----: | :---------------------------: | :----: | :-: |
   * | **69** | **68**  | **11** _(scroll-snap-margin)_ | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/scroll-margin
   */
  scrollSnapMargin?: ScrollMarginProperty<TLength>;
  /**
   * The `scroll-margin-bottom` property defines the bottom margin of the scroll snap area that is used for snapping this box to the snapport. The scroll snap area is determined by taking the transformed border box, finding its rectangular bounding box (axis-aligned in the scroll container’s coordinate space), then adding the specified outsets.
   *
   * **Syntax**: `<length>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox |                Safari                |  Edge  | IE  |
   * | :----: | :-----: | :----------------------------------: | :----: | :-: |
   * | **69** | **68**  | **11** _(scroll-snap-margin-bottom)_ | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/scroll-margin-bottom
   */
  scrollSnapMarginBottom?: ScrollMarginBottomProperty<TLength>;
  /**
   * The `scroll-margin-left` property defines the left margin of the scroll snap area that is used for snapping this box to the snapport. The scroll snap area is determined by taking the transformed border box, finding its rectangular bounding box (axis-aligned in the scroll container’s coordinate space), then adding the specified outsets.
   *
   * **Syntax**: `<length>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox |               Safari               |  Edge  | IE  |
   * | :----: | :-----: | :--------------------------------: | :----: | :-: |
   * | **69** | **68**  | **11** _(scroll-snap-margin-left)_ | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/scroll-margin-left
   */
  scrollSnapMarginLeft?: ScrollMarginLeftProperty<TLength>;
  /**
   * The `scroll-margin-right` property defines the right margin of the scroll snap area that is used for snapping this box to the snapport. The scroll snap area is determined by taking the transformed border box, finding its rectangular bounding box (axis-aligned in the scroll container’s coordinate space), then adding the specified outsets.
   *
   * **Syntax**: `<length>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox |               Safari                |  Edge  | IE  |
   * | :----: | :-----: | :---------------------------------: | :----: | :-: |
   * | **69** | **68**  | **11** _(scroll-snap-margin-right)_ | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/scroll-margin-right
   */
  scrollSnapMarginRight?: ScrollMarginRightProperty<TLength>;
  /**
   * The `scroll-margin-top` property defines the top margin of the scroll snap area that is used for snapping this box to the snapport. The scroll snap area is determined by taking the transformed border box, finding its rectangular bounding box (axis-aligned in the scroll container’s coordinate space), then adding the specified outsets.
   *
   * **Syntax**: `<length>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox |              Safari               |  Edge  | IE  |
   * | :----: | :-----: | :-------------------------------: | :----: | :-: |
   * | **69** | **68**  | **11** _(scroll-snap-margin-top)_ | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/scroll-margin-top
   */
  scrollSnapMarginTop?: ScrollMarginTopProperty<TLength>;
  /**
   * The **`scroll-snap-stop`** CSS property defines whether the scroll container is allowed to "pass over" possible snap positions.
   *
   * **Syntax**: `normal | always`
   *
   * **Initial value**: `normal`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **75** |   No    |   No   | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/scroll-snap-stop
   */
  scrollSnapStop?: ScrollSnapStopProperty;
  /**
   * The **`scroll-snap-type`** CSS property sets how strictly snap points are enforced on the scroll container in case there is one.
   *
   * **Syntax**: `none | [ x | y | block | inline | both ] [ mandatory | proximity ]?`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari  |     Edge     |      IE      |
   * | :----: | :-----: | :-----: | :----------: | :----------: |
   * | **69** |  39-68  | **11**  | **12** _-x-_ | **10** _-x-_ |
   * |        |         | 9 _-x-_ |              |              |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/scroll-snap-type
   */
  scrollSnapType?: ScrollSnapTypeProperty;
  /**
   * The **`scrollbar-color`** CSS property sets the color of the scrollbar track and thumb.
   *
   * **Syntax**: `auto | dark | light | <color>{2}`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari | Edge | IE  |
   * | :----: | :-----: | :----: | :--: | :-: |
   * |   No   | **64**  |   No   |  No  | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/scrollbar-color
   */
  scrollbarColor?: ScrollbarColorProperty;
  /**
   * The `scrollbar-width` property allows the author to set the maximum thickness of an element’s scrollbars when they are shown.
   *
   * **Syntax**: `auto | thin | none`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari | Edge | IE  |
   * | :----: | :-----: | :----: | :--: | :-: |
   * |   No   | **64**  |   No   |  No  | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/scrollbar-width
   */
  scrollbarWidth?: ScrollbarWidthProperty;
  /**
   * The **`shape-image-threshold`** CSS property sets the alpha channel threshold used to extract the shape using an image as the value for `shape-outside`.
   *
   * **Syntax**: `<alpha-value>`
   *
   * **Initial value**: `0.0`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **37** | **62**  | **10.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/shape-image-threshold
   */
  shapeImageThreshold?: ShapeImageThresholdProperty;
  /**
   * The **`shape-margin`** CSS property sets a margin for a CSS shape created using `shape-outside`.
   *
   * **Syntax**: `<length-percentage>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox |     Safari     |  Edge  | IE  |
   * | :----: | :-----: | :------------: | :----: | :-: |
   * | **37** | **62**  | **10.1** _-x-_ | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/shape-margin
   */
  shapeMargin?: ShapeMarginProperty<TLength>;
  /**
   * The **`shape-outside`** CSS property defines a shape—which may be non-rectangular—around which adjacent inline content should wrap. By default, inline content wraps around its margin box; `shape-outside` provides a way to customize this wrapping, making it possible to wrap text around complex objects rather than simple boxes.
   *
   * **Syntax**: `none | <shape-box> || <basic-shape> | <image>`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **37** | **62**  | **10.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/shape-outside
   */
  shapeOutside?: ShapeOutsideProperty;
  /**
   * The **`tab-size`** CSS property is used to customize the width of a tab (`U+0009`) character.
   *
   * **Syntax**: `<integer> | <length>`
   *
   * **Initial value**: `8`
   *
   * | Chrome |   Firefox   | Safari  |  Edge  | IE  |
   * | :----: | :---------: | :-----: | :----: | :-: |
   * | **21** | **4** _-x-_ | **6.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/tab-size
   */
  tabSize?: TabSizeProperty<TLength>;
  /**
   * The **`table-layout`** CSS property sets the algorithm used to lay out `<table>` cells, rows, and columns.
   *
   * **Syntax**: `auto | fixed`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **14** |  **1**  | **1**  | **12** | **5** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/table-layout
   */
  tableLayout?: TableLayoutProperty;
  /**
   * The **`text-align`** CSS property sets the horizontal alignment of an inline or table-cell box. This means it works like `vertical-align` but in the horizontal direction.
   *
   * **Syntax**: `start | end | left | right | center | justify | match-parent`
   *
   * **Initial value**: `start`, or a nameless value that acts as `left` if _direction_ is `ltr`, `right` if _direction_ is `rtl` if `start` is not supported by the browser.
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **3** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/text-align
   */
  textAlign?: TextAlignProperty;
  /**
   * The **`text-align-last`** CSS property sets how the last line of a block or a line, right before a forced line break, is aligned.
   *
   * **Syntax**: `auto | start | end | left | right | center | justify`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  |   IE    |
   * | :----: | :-----: | :----: | :----: | :-----: |
   * | **47** | **49**  |   No   | **12** | **5.5** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/text-align-last
   */
  textAlignLast?: TextAlignLastProperty;
  /**
   * The **`text-combine-upright`** CSS property sets the combination of characters into the space of a single character. If the combined text is wider than 1em, the user agent must fit the contents within 1em. The resulting composition is treated as a single upright glyph for layout and decoration. This property only has an effect in vertical writing modes.
   *
   * **Syntax**: `none | all | [ digits <integer>? ]`
   *
   * **Initial value**: `none`
   *
   * |           Chrome           | Firefox |              Safari              |                  Edge                  |                   IE                   |
   * | :------------------------: | :-----: | :------------------------------: | :------------------------------------: | :------------------------------------: |
   * |           **48**           | **48**  | **5.1** _(-webkit-text-combine)_ | **12** _(-ms-text-combine-horizontal)_ | **11** _(-ms-text-combine-horizontal)_ |
   * | 9 _(-webkit-text-combine)_ |         |                                  |                                        |                                        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/text-combine-upright
   */
  textCombineUpright?: TextCombineUprightProperty;
  /**
   * The **`text-decoration-color`** CSS property sets the color of decorations added to text by `text-decoration-line`.
   *
   * **Syntax**: `<color>`
   *
   * **Initial value**: `currentcolor`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **57** | **36**  | **12.1** | **79** | No  |
   * |        |         | 8 _-x-_  |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/text-decoration-color
   */
  textDecorationColor?: TextDecorationColorProperty;
  /**
   * The **`text-decoration-line`** CSS property sets the kind of decoration that is used on text in an element, such as an underline or overline.
   *
   * **Syntax**: `none | [ underline || overline || line-through || blink ] | spelling-error | grammar-error`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **57** | **36**  | **12.1** | **79** | No  |
   * |        |         | 8 _-x-_  |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/text-decoration-line
   */
  textDecorationLine?: TextDecorationLineProperty;
  /**
   * The **`text-decoration-skip`** CSS property sets what parts of an element’s content any text decoration affecting the element must skip over. It controls all text decoration lines drawn by the element and also any text decoration lines drawn by its ancestors.
   *
   * **Syntax**: `none | [ objects || [ spaces | [ leading-spaces || trailing-spaces ] ] || edges || box-decoration ]`
   *
   * **Initial value**: `objects`
   *
   * | Chrome | Firefox |  Safari  | Edge | IE  |
   * | :----: | :-----: | :------: | :--: | :-: |
   * | 57-64  |   No    | **12.1** |  No  | No  |
   * |        |         | 8 _-x-_  |      |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/text-decoration-skip
   */
  textDecorationSkip?: TextDecorationSkipProperty;
  /**
   * The **`text-decoration-skip-ink`** CSS property specifies how overlines and underlines are drawn when they pass over glyph ascenders and descenders.
   *
   * **Syntax**: `auto | all | none`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **64** | **70**  |   No   | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/text-decoration-skip-ink
   */
  textDecorationSkipInk?: TextDecorationSkipInkProperty;
  /**
   * The **`text-decoration-style`** CSS property sets the style of the lines specified by `text-decoration-line`. The style applies to all lines that are set with `text-decoration-line`.
   *
   * **Syntax**: `solid | double | dotted | dashed | wavy`
   *
   * **Initial value**: `solid`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **57** | **36**  | **12.1** | **79** | No  |
   * |        |         | 8 _-x-_  |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/text-decoration-style
   */
  textDecorationStyle?: TextDecorationStyleProperty;
  /**
   * The **`text-decoration-thickness`** CSS property sets the thickness, or width, of the decoration line that is used on text in an element, such as a line-through, underline, or overline.
   *
   * **Syntax**: `auto | from-font | <length> | <percentage> `
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox |  Safari  | Edge | IE  |
   * | :----: | :-----: | :------: | :--: | :-: |
   * |   No   | **70**  | **12.1** |  No  | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/text-decoration-thickness
   */
  textDecorationThickness?: TextDecorationThicknessProperty<TLength>;
  /**
   * The **`text-decoration-thickness`** CSS property sets the thickness, or width, of the decoration line that is used on text in an element, such as a line-through, underline, or overline.
   *
   * **Syntax**: `auto | from-font | <length> | <percentage> `
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox |  Safari  | Edge | IE  |
   * | :----: | :-----: | :------: | :--: | :-: |
   * |   No   | **70**  | **12.1** |  No  | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/text-decoration-thickness
   */
  textDecorationWidth?: TextDecorationThicknessProperty<TLength>;
  /**
   * The **`text-emphasis-color`** CSS property sets the color of emphasis marks. This value can also be set using the `text-emphasis` shorthand.
   *
   * **Syntax**: `<color>`
   *
   * **Initial value**: `currentcolor`
   *
   * | Chrome | Firefox | Safari  |  Edge  | IE  |
   * | :----: | :-----: | :-----: | :----: | :-: |
   * | **25** | **46**  | **6.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/text-emphasis-color
   */
  textEmphasisColor?: TextEmphasisColorProperty;
  /**
   * The **`text-emphasis-position`** CSS property sets where emphasis marks are drawn. Like ruby text, if there isn't enough room for emphasis marks, the line height is increased.
   *
   * **Syntax**: `[ over | under ] && [ right | left ]`
   *
   * **Initial value**: `over right`
   *
   * | Chrome | Firefox | Safari  |  Edge  | IE  |
   * | :----: | :-----: | :-----: | :----: | :-: |
   * | **25** | **46**  | **6.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/text-emphasis-position
   */
  textEmphasisPosition?: GlobalsString;
  /**
   * The **`text-emphasis-style`** CSS property sets the appearance of emphasis marks. It can also be set, and reset, using the `text-emphasis` shorthand.
   *
   * **Syntax**: `none | [ [ filled | open ] || [ dot | circle | double-circle | triangle | sesame ] ] | <string>`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari  |  Edge  | IE  |
   * | :----: | :-----: | :-----: | :----: | :-: |
   * | **25** | **46**  | **6.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/text-emphasis-style
   */
  textEmphasisStyle?: TextEmphasisStyleProperty;
  /**
   * The **`text-indent`** CSS property sets the length of empty space (indentation) that is put before lines of text in a block.
   *
   * **Syntax**: `<length-percentage> && hanging? && each-line?`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **3** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/text-indent
   */
  textIndent?: TextIndentProperty<TLength>;
  /**
   * The **`text-justify`** CSS property sets what type of justification should be applied to text when `text-align``: justify;` is set on an element.
   *
   * **Syntax**: `auto | inter-character | inter-word | none`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  |   IE   |
   * | :----: | :-----: | :----: | :----: | :----: |
   * |  n/a   | **55**  |   No   | **12** | **11** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/text-justify
   */
  textJustify?: TextJustifyProperty;
  /**
   * The **`text-orientation`** CSS property sets the orientation of the text characters in a line. It only affects text in vertical mode (when `writing-mode` is not `horizontal-tb`). It is useful for controlling the display of languages that use vertical script, and also for making vertical table headers.
   *
   * **Syntax**: `mixed | upright | sideways`
   *
   * **Initial value**: `mixed`
   *
   * |  Chrome  | Firefox |    Safari     |  Edge  | IE  |
   * | :------: | :-----: | :-----------: | :----: | :-: |
   * |  **48**  | **41**  | **5.1** _-x-_ | **79** | No  |
   * | 11 _-x-_ |         |               |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/text-orientation
   */
  textOrientation?: TextOrientationProperty;
  /**
   * The **`text-overflow`** CSS property sets how hidden overflow content is signaled to users. It can be clipped, display an ellipsis ('`…`'), or display a custom string.
   *
   * **Syntax**: `[ clip | ellipsis | <string> ]{1,2}`
   *
   * **Initial value**: `clip`
   *
   * | Chrome | Firefox | Safari  |  Edge  |  IE   |
   * | :----: | :-----: | :-----: | :----: | :---: |
   * | **1**  |  **7**  | **1.3** | **12** | **6** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/text-overflow
   */
  textOverflow?: TextOverflowProperty;
  /**
   * The **`text-rendering`** CSS property provides information to the rendering engine about what to optimize for when rendering text.
   *
   * **Syntax**: `auto | optimizeSpeed | optimizeLegibility | geometricPrecision`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **4**  |  **1**  | **5**  | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/text-rendering
   */
  textRendering?: TextRenderingProperty;
  /**
   * The **`text-shadow`** CSS property adds shadows to text. It accepts a comma-separated list of shadows to be applied to the text and any of its `decorations`. Each shadow is described by some combination of X and Y offsets from the element, blur radius, and color.
   *
   * **Syntax**: `none | <shadow-t>#`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari  |  Edge  |   IE   |
   * | :----: | :-----: | :-----: | :----: | :----: |
   * | **2**  | **3.5** | **1.1** | **12** | **10** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/text-shadow
   */
  textShadow?: TextShadowProperty;
  /**
   * The **`text-size-adjust`** CSS property controls the text inflation algorithm used on some smartphones and tablets. Other browsers will ignore this property.
   *
   * **Syntax**: `none | auto | <percentage>`
   *
   * **Initial value**: `auto` for smartphone browsers supporting inflation, `none` in other cases (and then not modifiable).
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **54** |   No    |   No   | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/text-size-adjust
   */
  textSizeAdjust?: TextSizeAdjustProperty;
  /**
   * The **`text-transform`** CSS property specifies how to capitalize an element's text. It can be used to make text appear in all-uppercase or all-lowercase, or with each word capitalized. It also can help improve legibility for ruby
   *
   * **Syntax**: `none | capitalize | uppercase | lowercase | full-width | full-size-kana`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/text-transform
   */
  textTransform?: TextTransformProperty;
  /**
   * The **`text-underline-offset`** CSS property sets the offset distance of an underline text decoration line (applied using `text-decoration`) from its original position.
   *
   * **Syntax**: `auto | from-font | <length> | <percentage> `
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox |  Safari  | Edge | IE  |
   * | :----: | :-----: | :------: | :--: | :-: |
   * |   No   | **70**  | **12.1** |  No  | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/text-underline-offset
   */
  textUnderlineOffset?: TextUnderlineOffsetProperty<TLength>;
  /**
   * The **`text-underline-position`** CSS property specifies the position of the underline which is set using the `text-decoration` property's `underline` value.
   *
   * **Syntax**: `auto | from-font | [ under || [ left | right ] ]`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox |  Safari  |  Edge  |  IE   |
   * | :----: | :-----: | :------: | :----: | :---: |
   * | **33** | **74**  | **12.1** | **12** | **6** |
   * |        |         | 9 _-x-_  |        |       |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/text-underline-position
   */
  textUnderlinePosition?: TextUnderlinePositionProperty;
  /**
   * The **`top`** CSS property participates in specifying the vertical position of a _positioned element_. It has no effect on non-positioned elements.
   *
   * **Syntax**: `<length> | <percentage> | auto`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **5** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/top
   */
  top?: TopProperty<TLength>;
  /**
   * The **`touch-action`** CSS property sets how a region can be manipulated by a touchscreen user (for example, by zooming features built into the browser).
   *
   * **Syntax**: `auto | none | [ [ pan-x | pan-left | pan-right ] || [ pan-y | pan-up | pan-down ] || pinch-zoom ] | manipulation`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  |    IE    |
   * | :----: | :-----: | :----: | :----: | :------: |
   * | **36** | **52**  | **13** | **12** |  **11**  |
   * |        |         |        |        | 10 _-x-_ |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/touch-action
   */
  touchAction?: TouchActionProperty;
  /**
   * The **`transform`** CSS property lets you rotate, scale, skew, or translate an element. It modifies the coordinate space of the CSS visual formatting model.
   *
   * **Syntax**: `none | <transform-list>`
   *
   * **Initial value**: `none`
   *
   * | Chrome  | Firefox |  Safari   |  Edge  |   IE    |
   * | :-----: | :-----: | :-------: | :----: | :-----: |
   * | **36**  | **16**  |   **9**   | **12** | **10**  |
   * | 1 _-x-_ |         | 3.1 _-x-_ |        | 9 _-x-_ |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/transform
   */
  transform?: TransformProperty;
  /**
   * The **`transform-box`** CSS property defines the layout box to which the `transform` and `transform-origin` properties relate.
   *
   * **Syntax**: `border-box | fill-box | view-box`
   *
   * **Initial value**: `border-box `
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **64** | **55**  | **11** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/transform-box
   */
  transformBox?: TransformBoxProperty;
  /**
   * The **`transform-origin`** CSS property sets the origin for an element's transformations.
   *
   * **Syntax**: `[ <length-percentage> | left | center | right | top | bottom ] | [ [ <length-percentage> | left | center | right ] && [ <length-percentage> | top | center | bottom ] ] <length>?`
   *
   * **Initial value**: `50% 50% 0`
   *
   * | Chrome  |  Firefox  | Safari  |  Edge  |   IE    |
   * | :-----: | :-------: | :-----: | :----: | :-----: |
   * | **36**  |  **16**   |  **9**  | **12** | **10**  |
   * | 1 _-x-_ | 3.5 _-x-_ | 2 _-x-_ |        | 9 _-x-_ |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/transform-origin
   */
  transformOrigin?: TransformOriginProperty<TLength>;
  /**
   * The **`transform-style`** CSS property sets whether children of an element are positioned in the 3D space or are flattened in the plane of the element.
   *
   * **Syntax**: `flat | preserve-3d`
   *
   * **Initial value**: `flat`
   *
   * |  Chrome  | Firefox  | Safari  |  Edge  | IE  |
   * | :------: | :------: | :-----: | :----: | :-: |
   * |  **36**  |  **16**  |  **9**  | **12** | No  |
   * | 12 _-x-_ | 10 _-x-_ | 4 _-x-_ |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/transform-style
   */
  transformStyle?: TransformStyleProperty;
  /**
   * The **`transition-delay`** CSS property specifies the duration to wait before starting a property's transition effect when its value changes.
   *
   * **Syntax**: `<time>#`
   *
   * **Initial value**: `0s`
   *
   * | Chrome  | Firefox | Safari  |  Edge  |   IE   |
   * | :-----: | :-----: | :-----: | :----: | :----: |
   * | **26**  | **16**  |  **9**  | **12** | **10** |
   * | 1 _-x-_ | 4 _-x-_ | 4 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/transition-delay
   */
  transitionDelay?: GlobalsString;
  /**
   * The **`transition-duration`** CSS property sets the length of time a transition animation should take to complete. By default, the value is `0s`, meaning that no animation will occur.
   *
   * **Syntax**: `<time>#`
   *
   * **Initial value**: `0s`
   *
   * | Chrome  | Firefox |  Safari   |  Edge  |   IE   |
   * | :-----: | :-----: | :-------: | :----: | :----: |
   * | **26**  | **16**  |   **9**   | **12** | **10** |
   * | 1 _-x-_ | 4 _-x-_ | 3.1 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/transition-duration
   */
  transitionDuration?: GlobalsString;
  /**
   * The **`transition-property`** CSS property sets the CSS properties to which a transition effect should be applied.
   *
   * **Syntax**: `none | <single-transition-property>#`
   *
   * **Initial value**: all
   *
   * | Chrome  | Firefox |  Safari   |  Edge  |   IE   |
   * | :-----: | :-----: | :-------: | :----: | :----: |
   * | **26**  | **16**  |   **9**   | **12** | **10** |
   * | 1 _-x-_ | 4 _-x-_ | 3.1 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/transition-property
   */
  transitionProperty?: TransitionPropertyProperty;
  /**
   * The **`transition-timing-function`** CSS property sets how intermediate values are calculated for CSS properties being affected by a transition effect.
   *
   * **Syntax**: `<timing-function>#`
   *
   * **Initial value**: `ease`
   *
   * | Chrome  | Firefox |  Safari   |  Edge  |   IE   |
   * | :-----: | :-----: | :-------: | :----: | :----: |
   * | **26**  | **16**  |   **9**   | **12** | **10** |
   * | 1 _-x-_ | 4 _-x-_ | 3.1 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/transition-timing-function
   */
  transitionTimingFunction?: TransitionTimingFunctionProperty;
  /**
   * The **`translate`** CSS property allows you to specify translation transforms individually and independantly of the `transform` property. This maps better to typical user interface usage, and saves having to remember the exact order of transform functions to specify in the `transform` value.
   *
   * **Syntax**: `none | <length-percentage> [ <length-percentage> <length>? ]?`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari | Edge | IE  |
   * | :----: | :-----: | :----: | :--: | :-: |
   * |   No   | **72**  |   No   |  No  | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/translate
   */
  translate?: TranslateProperty<TLength>;
  /**
   * The **`unicode-bidi`** CSS property, together with the `direction` property, determines how bidirectional text in a document is handled. For example, if a block of content contains both left-to-right and right-to-left text, the user-agent uses a complex Unicode algorithm to decide how to display the text. The `unicode-bidi` property overrides this algorithm and allows the developer to control the text embedding.
   *
   * **Syntax**: `normal | embed | isolate | bidi-override | isolate-override | plaintext`
   *
   * **Initial value**: `normal`
   *
   * | Chrome | Firefox | Safari  |  Edge  |   IE    |
   * | :----: | :-----: | :-----: | :----: | :-----: |
   * | **2**  |  **1**  | **1.3** | **12** | **5.5** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/unicode-bidi
   */
  unicodeBidi?: UnicodeBidiProperty;
  /**
   * The `**user-select**` CSS property controls whether the user can select text. This doesn't have any effect on content loaded as chrome, except in textboxes.
   *
   * **Syntax**: `auto | text | none | contain | all`
   *
   * **Initial value**: `auto`
   *
   * | Chrome  | Firefox |   Safari    |     Edge     |      IE      |
   * | :-----: | :-----: | :---------: | :----------: | :----------: |
   * | **54**  | **69**  | **3** _-x-_ | **12** _-x-_ | **10** _-x-_ |
   * | 1 _-x-_ | 1 _-x-_ |             |              |              |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/user-select
   */
  userSelect?: UserSelectProperty;
  /**
   * The **`vertical-align`** CSS property sets vertical alignment of an inline or table-cell box.
   *
   * **Syntax**: `baseline | sub | super | text-top | text-bottom | middle | top | bottom | <percentage> | <length>`
   *
   * **Initial value**: `baseline`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/vertical-align
   */
  verticalAlign?: VerticalAlignProperty<TLength>;
  /**
   * The **`visibility`** CSS property shows or hides an element without changing the layout of a document. The property can also hide rows or columns in a `<table>`.
   *
   * **Syntax**: `visible | hidden | collapse`
   *
   * **Initial value**: `visible`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/visibility
   */
  visibility?: VisibilityProperty;
  /**
   * The **`white-space`** CSS property sets how white space inside an element is handled.
   *
   * **Syntax**: `normal | pre | nowrap | pre-wrap | pre-line | break-spaces`
   *
   * **Initial value**: `normal`
   *
   * | Chrome | Firefox | Safari |  Edge  |   IE    |
   * | :----: | :-----: | :----: | :----: | :-----: |
   * | **1**  |  **1**  | **1**  | **12** | **5.5** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/white-space
   */
  whiteSpace?: WhiteSpaceProperty;
  /**
   * The **`widows`** CSS property sets the minimum number of lines in a block container that must be shown at the _top_ of a page, region, or column.
   *
   * **Syntax**: `<integer>`
   *
   * **Initial value**: `2`
   *
   * | Chrome | Firefox | Safari  |  Edge  |  IE   |
   * | :----: | :-----: | :-----: | :----: | :---: |
   * | **25** |   No    | **1.3** | **12** | **8** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/widows
   */
  widows?: GlobalsNumber;
  /**
   * The **`width`** CSS property sets an element's width. By default it sets the width of the content area, but if `box-sizing` is set to `border-box`, it sets the width of the border area.
   *
   * **Syntax**: `auto | <length> | <percentage> | min-content | max-content | fit-content(<length-percentage>)`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/width
   */
  width?: WidthProperty<TLength>;
  /**
   * The **`will-change`** CSS property hints to browsers how an element is expected to change. Browsers may set up optimizations before an element is actually changed. These kinds of optimizations can increase the responsiveness of a page by doing potentially expensive work before they are actually required.
   *
   * **Syntax**: `auto | <animateable-feature>#`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari  |  Edge  | IE  |
   * | :----: | :-----: | :-----: | :----: | :-: |
   * | **36** | **36**  | **9.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/will-change
   */
  willChange?: WillChangeProperty;
  /**
   * The **`word-break`** CSS property sets whether line breaks appear wherever the text would otherwise overflow its content box.
   *
   * **Syntax**: `normal | break-all | keep-all | break-word`
   *
   * **Initial value**: `normal`
   *
   * | Chrome | Firefox | Safari |  Edge  |   IE    |
   * | :----: | :-----: | :----: | :----: | :-----: |
   * | **1**  | **15**  | **3**  | **12** | **5.5** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/word-break
   */
  wordBreak?: WordBreakProperty;
  /**
   * The **`word-spacing`** CSS property sets the length of space between words and between tags.
   *
   * **Syntax**: `normal | <length-percentage>`
   *
   * **Initial value**: `normal`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **6** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/word-spacing
   */
  wordSpacing?: WordSpacingProperty<TLength>;
  /**
   * The `**overflow-wrap**` CSS property sets whether the browser should insert line breaks within words to prevent text from overflowing its content box.
   *
   * **Syntax**: `normal | break-word`
   *
   * **Initial value**: `normal`
   *
   * | Chrome | Firefox | Safari |  Edge  |   IE    |
   * | :----: | :-----: | :----: | :----: | :-----: |
   * | **1**  | **3.5** | **2**  | **12** | **5.5** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/overflow-wrap
   */
  wordWrap?: WordWrapProperty;
  /**
   * The **`writing-mode`** CSS property sets whether lines of text are laid out horizontally or vertically, as well as the direction in which blocks progress.
   *
   * **Syntax**: `horizontal-tb | vertical-rl | vertical-lr | sideways-rl | sideways-lr`
   *
   * **Initial value**: `horizontal-tb`
   *
   * | Chrome  | Firefox |  Safari   |  Edge  |     IE      |
   * | :-----: | :-----: | :-------: | :----: | :---------: |
   * | **48**  | **41**  | **10.1**  | **12** | **9** _-x-_ |
   * | 8 _-x-_ |         | 5.1 _-x-_ |        |             |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/writing-mode
   */
  writingMode?: WritingModeProperty;
  /**
   * The **`z-index`** CSS property sets the z-order of a positioned element and its descendants or flex items. Overlapping elements with a larger z-index cover those with a smaller one.
   *
   * **Syntax**: `auto | <integer>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/z-index
   */
  zIndex?: ZIndexProperty;
  /**
   * The non-standard **`zoom`** CSS property can be used to control the magnification level of an element. `transform: scale()` should be used instead of this property, if possible. However, unlike CSS Transforms, `zoom` affects the layout size of the element.
   *
   * **Syntax**: `normal | reset | <number> | <percentage>`
   *
   * **Initial value**: `normal`
   *
   * | Chrome | Firefox | Safari  |  Edge  |   IE    |
   * | :----: | :-----: | :-----: | :----: | :-----: |
   * | **1**  |   No    | **3.1** | **12** | **5.5** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/zoom
   */
  zoom?: ZoomProperty;
}

interface StandardShorthandProperties<TLength = string | 0> {
  /**
   * The `**all**` CSS shorthand property sets all of an element's properties (other than `unicode-bidi` and `direction`) to their initial or inherited values, or to the values specified in another stylesheet origin.
   *
   * **Syntax**: `initial | inherit | unset | revert`
   *
   * **Initial value**: There is no practical initial value for it.
   *
   * | Chrome | Firefox | Safari  |  Edge  | IE  |
   * | :----: | :-----: | :-----: | :----: | :-: |
   * | **37** | **27**  | **9.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/all
   */
  all?: Globals;
  /**
   * The **`animation`** shorthand CSS property sets an animated transition between styles. It is a shorthand for `animation-name`, `animation-duration`, `animation-timing-function`, `animation-delay`, `animation-iteration-count`, `animation-direction`, `animation-fill-mode`, and `animation-play-state`.
   *
   * **Syntax**: `<single-animation>#`
   *
   * | Chrome  | Firefox | Safari  |  Edge  |   IE   |
   * | :-----: | :-----: | :-----: | :----: | :----: |
   * | **43**  | **16**  |  **9**  | **12** | **10** |
   * | 3 _-x-_ | 5 _-x-_ | 4 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/animation
   */
  animation?: AnimationProperty;
  /**
   * The **`background`** shorthand CSS property sets all background style properties at once, such as color, image, origin and size, or repeat method.
   *
   * **Syntax**: `[ <bg-layer> , ]* <final-bg-layer>`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/background
   */
  background?: BackgroundProperty<TLength>;
  /**
   * The **`border`** CSS property sets an element's border. It's a shorthand for `border-width`, `border-style`, and `border-color`.
   *
   * **Syntax**: `<line-width> || <line-style> || <color>`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/border
   */
  border?: BorderProperty<TLength>;
  /**
   * The **`border-block`** CSS property is a shorthand property for setting the individual logical block border property values in a single place in the style sheet.
   *
   * **Syntax**: `<'border-top-width'> || <'border-top-style'> || <'color'>`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **69** | **66**  |   No   | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/border-block
   */
  borderBlock?: BorderBlockProperty<TLength>;
  /**
   * The **`border-block-end`** CSS property is a shorthand property for setting the individual logical block-end border property values in a single place in the style sheet.
   *
   * **Syntax**: `<'border-top-width'> || <'border-top-style'> || <'color'>`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **69** | **41**  | **12.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/border-block-end
   */
  borderBlockEnd?: BorderBlockEndProperty<TLength>;
  /**
   * The **`border-block-start`** CSS property is a shorthand property for setting the individual logical block-start border property values in a single place in the style sheet.
   *
   * **Syntax**: `<'border-top-width'> || <'border-top-style'> || <'color'>`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **69** | **41**  | **12.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/border-block-start
   */
  borderBlockStart?: BorderBlockStartProperty<TLength>;
  /**
   * The **`border-bottom`** CSS property is a shorthand that sets the values of `border-bottom-width`, `border-bottom-style` and `border-bottom-color`. These properties set an element's bottom border.
   *
   * **Syntax**: `<line-width> || <line-style> || <color>`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/border-bottom
   */
  borderBottom?: BorderBottomProperty<TLength>;
  /**
   * The **`border-color`** shorthand CSS property sets the color of all sides of an element's border.
   *
   * **Syntax**: `<color>{1,4}`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/border-color
   */
  borderColor?: BorderColorProperty;
  /**
   * The **`border-image`** CSS property draws an image in place of an element's `border-style`.
   *
   * **Syntax**: `<'border-image-source'> || <'border-image-slice'> [ / <'border-image-width'> | / <'border-image-width'>? / <'border-image-outset'> ]? || <'border-image-repeat'>`
   *
   * | Chrome  |  Firefox  | Safari  |  Edge  |   IE   |
   * | :-----: | :-------: | :-----: | :----: | :----: |
   * | **16**  |  **15**   |  **6**  | **12** | **11** |
   * | 7 _-x-_ | 3.5 _-x-_ | 3 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/border-image
   */
  borderImage?: BorderImageProperty;
  /**
   * The **`border-inline`** CSS property is a shorthand property for setting the individual logical inline border property values in a single place in the style sheet.
   *
   * **Syntax**: `<'border-top-width'> || <'border-top-style'> || <'color'>`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **69** | **66**  |   No   | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/border-inline
   */
  borderInline?: BorderInlineProperty<TLength>;
  /**
   * The **`border-inline-end`** CSS property is a shorthand property for setting the individual logical inline-end border property values in a single place in the style sheet.
   *
   * **Syntax**: `<'border-top-width'> || <'border-top-style'> || <'color'>`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **69** | **41**  | **12.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/border-inline-end
   */
  borderInlineEnd?: BorderInlineEndProperty<TLength>;
  /**
   * The **`border-inline-start`** CSS property is a shorthand property for setting the individual logical inline-start border property values in a single place in the style sheet.
   *
   * **Syntax**: `<'border-top-width'> || <'border-top-style'> || <'color'>`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **69** | **41**  | **12.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/border-inline-start
   */
  borderInlineStart?: BorderInlineStartProperty<TLength>;
  /**
   * The **`border-left`** CSS property is a shorthand that sets the values of `border-left-width`, `border-left-style` and `border-left-color`. These properties set an element's left border.
   *
   * **Syntax**: `<line-width> || <line-style> || <color>`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/border-left
   */
  borderLeft?: BorderLeftProperty<TLength>;
  /**
   * The **`border-radius`** CSS property rounds the corners of an element's outer border edge. You can set a single radius to make circular corners, or two radii to make elliptical corners.
   *
   * **Syntax**: `<length-percentage>{1,4} [ / <length-percentage>{1,4} ]?`
   *
   * | Chrome  | Firefox | Safari  |  Edge  |  IE   |
   * | :-----: | :-----: | :-----: | :----: | :---: |
   * |  **4**  |  **4**  |  **5**  | **12** | **9** |
   * | 1 _-x-_ |         | 3 _-x-_ |        |       |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/border-radius
   */
  borderRadius?: BorderRadiusProperty<TLength>;
  /**
   * The **`border-right`** CSS property is a shorthand that sets the values of `border-right-width`, `border-right-style` and `border-right-color`. These properties set an element's right border.
   *
   * **Syntax**: `<line-width> || <line-style> || <color>`
   *
   * | Chrome | Firefox | Safari |  Edge  |   IE    |
   * | :----: | :-----: | :----: | :----: | :-----: |
   * | **1**  |  **1**  | **1**  | **12** | **5.5** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/border-right
   */
  borderRight?: BorderRightProperty<TLength>;
  /**
   * The **`border-style`** CSS property is a shorthand property that sets the line style for all four sides of an element's border.
   *
   * **Syntax**: `<line-style>{1,4}`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/border-style
   */
  borderStyle?: BorderStyleProperty;
  /**
   * The **`border-top`** CSS property is a shorthand that sets the values of `border-top-width`, `border-top-style` and `border-top-color`. These properties set an element's top border.
   *
   * **Syntax**: `<line-width> || <line-style> || <color>`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/border-top
   */
  borderTop?: BorderTopProperty<TLength>;
  /**
   * The **`border-width`** shorthand CSS property sets the widths of all four sides of an element's border.
   *
   * **Syntax**: `<line-width>{1,4}`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/border-width
   */
  borderWidth?: BorderWidthProperty<TLength>;
  /**
   * The **`column-rule`** CSS property sets the width, style, and color of the rule (line) drawn between columns in a multi-column layout.
   *
   * **Syntax**: `<'column-rule-width'> || <'column-rule-style'> || <'column-rule-color'>`
   *
   * | Chrome  | Firefox | Safari  |  Edge  |   IE   |
   * | :-----: | :-----: | :-----: | :----: | :----: |
   * | **50**  | **52**  |  **9**  | **12** | **10** |
   * | 1 _-x-_ |         | 3 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/column-rule
   */
  columnRule?: ColumnRuleProperty<TLength>;
  /**
   * The **`columns`** CSS property sets the column width and column count of an element.
   *
   * **Syntax**: `<'column-width'> || <'column-count'>`
   *
   * | Chrome | Firefox | Safari  |  Edge  |   IE   |
   * | :----: | :-----: | :-----: | :----: | :----: |
   * | **50** | **52**  |  **9**  | **12** | **10** |
   * |        |         | 3 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/columns
   */
  columns?: ColumnsProperty<TLength>;
  /**
   * The **`flex`** CSS property sets how a flex item will grow or shrink to fit the space available in its flex container. It is a shorthand for `flex-grow`, `flex-shrink`, and `flex-basis`.
   *
   * **Syntax**: `none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]`
   *
   * |  Chrome  | Firefox |  Safari   |  Edge  |    IE    |
   * | :------: | :-----: | :-------: | :----: | :------: |
   * |  **29**  | **20**  |   **9**   | **12** |  **11**  |
   * | 21 _-x-_ |         | 6.1 _-x-_ |        | 10 _-x-_ |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/flex
   */
  flex?: FlexProperty<TLength>;
  /**
   * The **`flex-flow`** CSS property is a shorthand property for `flex-direction` and `flex-wrap` properties.
   *
   * **Syntax**: `<'flex-direction'> || <'flex-wrap'>`
   *
   * |  Chrome  | Firefox |  Safari   |  Edge  |   IE   |
   * | :------: | :-----: | :-------: | :----: | :----: |
   * |  **29**  | **28**  |   **9**   | **12** | **11** |
   * | 21 _-x-_ |         | 6.1 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/flex-flow
   */
  flexFlow?: FlexFlowProperty;
  /**
   * The **`font`** CSS property is a shorthand for `font-style`, `font-variant`, `font-weight`, `font-size`, `line-height`, and `font-family`. Alternatively, it sets an element's font to a system font.
   *
   * **Syntax**: `[ [ <'font-style'> || <font-variant-css21> || <'font-weight'> || <'font-stretch'> ]? <'font-size'> [ / <'line-height'> ]? <'font-family'> ] | caption | icon | menu | message-box | small-caption | status-bar`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **3** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/font
   */
  font?: FontProperty;
  /**
   * The **`gap`** CSS property sets the gaps (gutters) between rows and columns. It is a shorthand for `row-gap` and `column-gap`.
   *
   * **Syntax**: `<'row-gap'> <'column-gap'>?`
   *
   * ---
   *
   * _Supported in Flex Layout_
   *
   * | Chrome | Firefox | Safari | Edge | IE  |
   * | :----: | :-----: | :----: | :--: | :-: |
   * |   No   | **63**  |   No   |  No  | No  |
   *
   * ---
   *
   * _Supported in Grid Layout_
   *
   * |     Chrome      |     Firefox     |        Safari         |  Edge  | IE  |
   * | :-------------: | :-------------: | :-------------------: | :----: | :-: |
   * |     **66**      |     **61**      | **10.1** _(grid-gap)_ | **16** | No  |
   * | 57 _(grid-gap)_ | 52 _(grid-gap)_ |                       |        |     |
   *
   * ---
   *
   * _Supported in Multi-column Layout_
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **66** | **61**  |   No   | **16** | No  |
   *
   * ---
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/gap
   */
  gap?: GapProperty<TLength>;
  /**
   * The **`grid`** CSS property is a shorthand property that sets all of the explicit grid properties (`grid-template-rows`, `grid-template-columns`, and `grid-template-areas`), and all the implicit grid properties (`grid-auto-rows`, `grid-auto-columns`, and `grid-auto-flow`), in a single declaration.
   *
   * **Syntax**: `<'grid-template'> | <'grid-template-rows'> / [ auto-flow && dense? ] <'grid-auto-columns'>? | [ auto-flow && dense? ] <'grid-auto-rows'>? / <'grid-template-columns'>`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **57** | **52**  | **10.1** | **16** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/grid
   */
  grid?: GridProperty;
  /**
   * The **`grid-area`** CSS property is a shorthand property for `grid-row-start`, `grid-column-start`, `grid-row-end` and `grid-column-end`, specifying a grid item’s size and location within the grid row by contributing a line, a span, or nothing (automatic) to its grid placement, thereby specifying the edges of its grid area.
   *
   * **Syntax**: `<grid-line> [ / <grid-line> ]{0,3}`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **57** | **52**  | **10.1** | **16** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/grid-area
   */
  gridArea?: GridAreaProperty;
  /**
   * The **`grid-column`** CSS property is a shorthand property for `grid-column-start` and `grid-column-end` specifying a grid item's size and location within the grid column by contributing a line, a span, or nothing (automatic) to its grid placement, thereby specifying the inline-start and inline-end edge of its grid area.
   *
   * **Syntax**: `<grid-line> [ / <grid-line> ]?`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **57** | **52**  | **10.1** | **16** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/grid-column
   */
  gridColumn?: GridColumnProperty;
  /**
   * The **`grid-row`** CSS property is a shorthand property for `grid-row-start` and `grid-row-end` specifying a grid item’s size and location within the grid row by contributing a line, a span, or nothing (automatic) to its grid placement, thereby specifying the inline-start and inline-end edge of its grid area.
   *
   * **Syntax**: `<grid-line> [ / <grid-line> ]?`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **57** | **52**  | **10.1** | **16** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/grid-row
   */
  gridRow?: GridRowProperty;
  /**
   * The **`grid-template`** CSS property is a shorthand property for defining grid columns, rows, and areas.
   *
   * **Syntax**: `none | [ <'grid-template-rows'> / <'grid-template-columns'> ] | [ <line-names>? <string> <track-size>? <line-names>? ]+ [ / <explicit-track-list> ]?`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **57** | **52**  | **10.1** | **16** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/grid-template
   */
  gridTemplate?: GridTemplateProperty;
  /**
   * **Syntax**: `none | <integer>`
   *
   * **Initial value**: `none`
   */
  lineClamp?: LineClampProperty;
  /**
   * The **`list-style`** CSS property is a shorthand to set list style properties `list-style-type`, `list-style-image`, and `list-style-position`.
   *
   * **Syntax**: `<'list-style-type'> || <'list-style-position'> || <'list-style-image'>`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/list-style
   */
  listStyle?: ListStyleProperty;
  /**
   * The **`margin`** CSS property sets the margin area on all four sides of an element. It is a shorthand for `margin-top`, `margin-right`, `margin-bottom`, and `margin-left`.
   *
   * **Syntax**: `[ <length> | <percentage> | auto ]{1,4}`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **3** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/margin
   */
  margin?: MarginProperty<TLength>;
  /**
   * The **`mask`** CSS property hides an element (partially or fully) by masking or clipping the image at specific points.
   *
   * **Syntax**: `<mask-layer>#`
   *
   * | Chrome | Firefox | Safari  |  Edge  | IE  |
   * | :----: | :-----: | :-----: | :----: | :-: |
   * | **1**  |  **2**  | **3.2** | **12** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/mask
   */
  mask?: MaskProperty<TLength>;
  /**
   * The **`mask-border`** CSS property lets you create a mask along the edge of an element's border.
   *
   * **Syntax**: `<'mask-border-source'> || <'mask-border-slice'> [ / <'mask-border-width'>? [ / <'mask-border-outset'> ]? ]? || <'mask-border-repeat'> || <'mask-border-mode'>`
   */
  maskBorder?: MaskBorderProperty;
  /**
   * The **`offset`** CSS property is a shorthand property for animating an element along a defined path.
   *
   * **Syntax**: `[ <'offset-position'>? [ <'offset-path'> [ <'offset-distance'> || <'offset-rotate'> ]? ]? ]! [ / <'offset-anchor'> ]?`
   *
   * |    Chrome     | Firefox | Safari |  Edge  | IE  |
   * | :-----------: | :-----: | :----: | :----: | :-: |
   * |    **55**     | **72**  |   No   | **79** | No  |
   * | 46 _(motion)_ |         |        |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/offset
   */
  motion?: OffsetProperty<TLength>;
  /**
   * The **`offset`** CSS property is a shorthand property for animating an element along a defined path.
   *
   * **Syntax**: `[ <'offset-position'>? [ <'offset-path'> [ <'offset-distance'> || <'offset-rotate'> ]? ]? ]! [ / <'offset-anchor'> ]?`
   *
   * |    Chrome     | Firefox | Safari |  Edge  | IE  |
   * | :-----------: | :-----: | :----: | :----: | :-: |
   * |    **55**     | **72**  |   No   | **79** | No  |
   * | 46 _(motion)_ |         |        |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/offset
   */
  offset?: OffsetProperty<TLength>;
  /**
   * The **`outline`** CSS property is a shorthand to set various outline properties in a single declaration: `outline-style`, `outline-width`, and `outline-color`.
   *
   * **Syntax**: `[ <'outline-color'> || <'outline-style'> || <'outline-width'> ]`
   *
   * | Chrome | Firefox | Safari  |  Edge  |  IE   |
   * | :----: | :-----: | :-----: | :----: | :---: |
   * | **1**  | **1.5** | **1.2** | **12** | **8** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/outline
   */
  outline?: OutlineProperty<TLength>;
  /**
   * The **`overflow`** CSS property sets what to do when an element's content is too big to fit in its block formatting context. It is a shorthand for `overflow-x` and `overflow-y`.
   *
   * **Syntax**: `[ visible | hidden | clip | scroll | auto ]{1,2}`
   *
   * **Initial value**: `visible`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/overflow
   */
  overflow?: OverflowProperty;
  /**
   * The **`padding`** CSS property sets the padding area on all four sides of an element. It is a shorthand for `padding-top`, `padding-right`, `padding-bottom`, and `padding-left`.
   *
   * **Syntax**: `[ <length> | <percentage> ]{1,4}`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/padding
   */
  padding?: PaddingProperty<TLength>;
  /**
   * The CSS **`place-items`** shorthand property sets the `align-items` and `justify-items` properties, respectively. If the second value is not set, the first value is also used for it.
   *
   * **Syntax**: `<'align-items'> <'justify-items'>?`
   *
   * ---
   *
   * _Supported in Flex Layout_
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **59** | **45**  | **11** | **79** | No  |
   *
   * ---
   *
   * _Supported in Grid Layout_
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **59** | **45**  | **11** | **79** | No  |
   *
   * ---
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/place-items
   */
  placeItems?: PlaceItemsProperty;
  /**
   * The **`place-self`** CSS property is a shorthand property sets both the `align-self` and `justify-self` properties. The first value is the `align-self` property value, the second the `justify-self` one. If the second value is not present, the first value is also used for it.
   *
   * **Syntax**: `<'align-self'> <'justify-self'>?`
   *
   * ---
   *
   * _Supported in Flex Layout_
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **59** | **45**  |   No   | **79** | No  |
   *
   * ---
   *
   * _Supported in Grid Layout_
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **59** | **45**  |   No   | **79** | No  |
   *
   * ---
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/place-self
   */
  placeSelf?: PlaceSelfProperty;
  /**
   * The **`text-decoration`** CSS property sets the appearance of decorative lines on text. It is a shorthand for `text-decoration-line`, `text-decoration-color`, and `text-decoration-style`.
   *
   * **Syntax**: `<'text-decoration-line'> || <'text-decoration-style'> || <'text-decoration-color'> || <'text-decoration-thickness'>`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **3** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/text-decoration
   */
  textDecoration?: TextDecorationProperty<TLength>;
  /**
   * The **`text-emphasis`** CSS property applies emphasis marks to text (except spaces and control characters). It is a shorthand for `text-emphasis-style` and `text-emphasis-color`.
   *
   * **Syntax**: `<'text-emphasis-style'> || <'text-emphasis-color'>`
   *
   * | Chrome | Firefox | Safari  |  Edge  | IE  |
   * | :----: | :-----: | :-----: | :----: | :-: |
   * | **25** | **46**  | **6.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/text-emphasis
   */
  textEmphasis?: TextEmphasisProperty;
  /**
   * The **`transition`** CSS property is a shorthand property for `transition-property`, `transition-duration`, `transition-timing-function`, and `transition-delay`.
   *
   * **Syntax**: `<single-transition>#`
   *
   * | Chrome  | Firefox |  Safari   |  Edge  |   IE   |
   * | :-----: | :-----: | :-------: | :----: | :----: |
   * | **26**  | **16**  |   **9**   | **12** | **10** |
   * | 1 _-x-_ | 4 _-x-_ | 3.1 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/transition
   */
  transition?: TransitionProperty;
}

interface StandardProperties<TLength = string | 0> extends StandardLonghandProperties<TLength>, StandardShorthandProperties<TLength> {}

interface VendorLonghandProperties<TLength = string | 0> {
  /**
   * The **`animation-delay`** CSS property sets when an animation starts. The animation can start later, immediately from its beginning, or immediately and partway through the animation.
   *
   * **Syntax**: `<time>#`
   *
   * **Initial value**: `0s`
   */
  MozAnimationDelay?: GlobalsString;
  /**
   * The **`animation-direction`** CSS property sets whether an animation should play forwards, backwards, or alternating back and forth.
   *
   * **Syntax**: `<single-animation-direction>#`
   *
   * **Initial value**: `normal`
   */
  MozAnimationDirection?: AnimationDirectionProperty;
  /**
   * The **`animation-duration`** CSS property sets the length of time that an animation takes to complete one cycle.
   *
   * **Syntax**: `<time>#`
   *
   * **Initial value**: `0s`
   */
  MozAnimationDuration?: GlobalsString;
  /**
   * The **`animation-fill-mode`** CSS property sets how a CSS animation applies styles to its target before and after its execution.
   *
   * **Syntax**: `<single-animation-fill-mode>#`
   *
   * **Initial value**: `none`
   */
  MozAnimationFillMode?: AnimationFillModeProperty;
  /**
   * The **`animation-iteration-count`** CSS property sets the number of times an animation cycle should be played before stopping.
   *
   * **Syntax**: `<single-animation-iteration-count>#`
   *
   * **Initial value**: `1`
   */
  MozAnimationIterationCount?: AnimationIterationCountProperty;
  /**
   * The **`animation-name`** CSS property sets one or more animations to apply to an element. Each name is an `@keyframes` at-rule that sets the property values for the animation sequence.
   *
   * **Syntax**: `[ none | <keyframes-name> ]#`
   *
   * **Initial value**: `none`
   */
  MozAnimationName?: AnimationNameProperty;
  /**
   * The **`animation-play-state`** CSS property sets whether an animation is running or paused.
   *
   * **Syntax**: `<single-animation-play-state>#`
   *
   * **Initial value**: `running`
   */
  MozAnimationPlayState?: AnimationPlayStateProperty;
  /**
   * The `**animation-timing-function**` CSS property sets how an animation progresses through the duration of each cycle.
   *
   * **Syntax**: `<timing-function>#`
   *
   * **Initial value**: `ease`
   */
  MozAnimationTimingFunction?: AnimationTimingFunctionProperty;
  /**
   * The **`-moz-appearance`** CSS property is used in Gecko (Firefox) to display an element using platform-native styling based on the operating system's theme.
   *
   * **Syntax**: `none | button | button-arrow-down | button-arrow-next | button-arrow-previous | button-arrow-up | button-bevel | button-focus | caret | checkbox | checkbox-container | checkbox-label | checkmenuitem | dualbutton | groupbox | listbox | listitem | menuarrow | menubar | menucheckbox | menuimage | menuitem | menuitemtext | menulist | menulist-button | menulist-text | menulist-textfield | menupopup | menuradio | menuseparator | meterbar | meterchunk | progressbar | progressbar-vertical | progresschunk | progresschunk-vertical | radio | radio-container | radio-label | radiomenuitem | range | range-thumb | resizer | resizerpanel | scale-horizontal | scalethumbend | scalethumb-horizontal | scalethumbstart | scalethumbtick | scalethumb-vertical | scale-vertical | scrollbarbutton-down | scrollbarbutton-left | scrollbarbutton-right | scrollbarbutton-up | scrollbarthumb-horizontal | scrollbarthumb-vertical | scrollbartrack-horizontal | scrollbartrack-vertical | searchfield | separator | sheet | spinner | spinner-downbutton | spinner-textfield | spinner-upbutton | splitter | statusbar | statusbarpanel | tab | tabpanel | tabpanels | tab-scroll-arrow-back | tab-scroll-arrow-forward | textfield | textfield-multiline | toolbar | toolbarbutton | toolbarbutton-dropdown | toolbargripper | toolbox | tooltip | treeheader | treeheadercell | treeheadersortarrow | treeitem | treeline | treetwisty | treetwistyopen | treeview | -moz-mac-unified-toolbar | -moz-win-borderless-glass | -moz-win-browsertabbar-toolbox | -moz-win-communicationstext | -moz-win-communications-toolbox | -moz-win-exclude-glass | -moz-win-glass | -moz-win-mediatext | -moz-win-media-toolbox | -moz-window-button-box | -moz-window-button-box-maximized | -moz-window-button-close | -moz-window-button-maximize | -moz-window-button-minimize | -moz-window-button-restore | -moz-window-frame-bottom | -moz-window-frame-left | -moz-window-frame-right | -moz-window-titlebar | -moz-window-titlebar-maximized`
   *
   * **Initial value**: `none` (but this value is overridden in the user agent CSS)
   */
  MozAppearance?: MozAppearanceProperty;
  /**
   * The **`backface-visibility`** CSS property sets whether the back face of an element is visible when turned towards the user.
   *
   * **Syntax**: `visible | hidden`
   *
   * **Initial value**: `visible`
   */
  MozBackfaceVisibility?: BackfaceVisibilityProperty;
  /**
   * The **`border-inline-end-color`** CSS property defines the color of the logical inline-end border of an element, which maps to a physical border color depending on the element's writing mode, directionality, and text orientation. It corresponds to the `border-top-color`, `border-right-color`, `border-bottom-color`, or `border-left-color` property depending on the values defined for `writing-mode`, `direction`, and `text-orientation`.
   *
   * **Syntax**: `<'border-top-color'>`
   *
   * **Initial value**: `currentcolor`
   */
  MozBorderEndColor?: BorderInlineEndColorProperty;
  /**
   * The **`border-inline-end-style`** CSS property defines the style of the logical inline end border of an element, which maps to a physical border style depending on the element's writing mode, directionality, and text orientation. It corresponds to the `border-top-style`, `border-right-style`, `border-bottom-style`, or `border-left-style` property depending on the values defined for `writing-mode`, `direction`, and `text-orientation`.
   *
   * **Syntax**: `<'border-top-style'>`
   *
   * **Initial value**: `none`
   */
  MozBorderEndStyle?: BorderInlineEndStyleProperty;
  /**
   * The **`border-inline-end-width`** CSS property defines the width of the logical inline-end border of an element, which maps to a physical border width depending on the element's writing mode, directionality, and text orientation. It corresponds to the `border-top-width`, `border-right-width`, `border-bottom-width`, or `border-left-width` property depending on the values defined for `writing-mode`, `direction`, and `text-orientation`.
   *
   * **Syntax**: `<'border-top-width'>`
   *
   * **Initial value**: `medium`
   */
  MozBorderEndWidth?: BorderInlineEndWidthProperty<TLength>;
  /**
   * The **`border-inline-start-color`** CSS property defines the color of the logical inline start border of an element, which maps to a physical border color depending on the element's writing mode, directionality, and text orientation. It corresponds to the `border-top-color`, `border-right-color`, `border-bottom-color`, or `border-left-color` property depending on the values defined for `writing-mode`, `direction`, and `text-orientation`.
   *
   * **Syntax**: `<'border-top-color'>`
   *
   * **Initial value**: `currentcolor`
   */
  MozBorderStartColor?: BorderInlineStartColorProperty;
  /**
   * The **`border-inline-start-style`** CSS property defines the style of the logical inline start border of an element, which maps to a physical border style depending on the element's writing mode, directionality, and text orientation. It corresponds to the `border-top-style`, `border-right-style`, `border-bottom-style`, or `border-left-style` property depending on the values defined for `writing-mode`, `direction`, and `text-orientation`.
   *
   * **Syntax**: `<'border-top-style'>`
   *
   * **Initial value**: `none`
   */
  MozBorderStartStyle?: BorderInlineStartStyleProperty;
  /**
   * The **`box-sizing`** CSS property defines how the user agent should calculate the total width and height of an element.
   *
   * **Syntax**: `content-box | border-box`
   *
   * **Initial value**: `content-box`
   */
  MozBoxSizing?: BoxSizingProperty;
  /**
   * The **`column-count`** CSS property breaks an element's content into the specified number of columns.
   *
   * **Syntax**: `<integer> | auto`
   *
   * **Initial value**: `auto`
   */
  MozColumnCount?: ColumnCountProperty;
  /**
   * The **`column-fill`** CSS property controls how an element's contents are balanced when broken into columns.
   *
   * **Syntax**: `auto | balance | balance-all`
   *
   * **Initial value**: `balance`
   */
  MozColumnFill?: ColumnFillProperty;
  /**
   * The **`column-gap`** CSS property sets the size of the gap (gutter) between an element's columns.
   *
   * **Syntax**: `normal | <length-percentage>`
   *
   * **Initial value**: `normal`
   */
  MozColumnGap?: ColumnGapProperty<TLength>;
  /**
   * The **`column-rule-color`** CSS property sets the color of the rule (line) drawn between columns in a multi-column layout.
   *
   * **Syntax**: `<color>`
   *
   * **Initial value**: `currentcolor`
   */
  MozColumnRuleColor?: ColumnRuleColorProperty;
  /**
   * The **`column-rule-style`** CSS property sets the style of the line drawn between columns in a multi-column layout.
   *
   * **Syntax**: `<'border-style'>`
   *
   * **Initial value**: `none`
   */
  MozColumnRuleStyle?: ColumnRuleStyleProperty;
  /**
   * The **`column-rule-width`** CSS property sets the width of the rule (line) drawn between columns in a multi-column layout.
   *
   * **Syntax**: `<'border-width'>`
   *
   * **Initial value**: `medium`
   */
  MozColumnRuleWidth?: ColumnRuleWidthProperty<TLength>;
  /**
   * The **`column-width`** CSS property specifies the ideal column width in a multi-column layout. The container will have as many columns as can fit without any of them having a width less than the `column-width` value. If the width of the container is narrower than the specified value, the single column's width will be smaller than the declared column width.
   *
   * **Syntax**: `<length> | auto`
   *
   * **Initial value**: `auto`
   */
  MozColumnWidth?: ColumnWidthProperty<TLength>;
  /**
   * If you reference an SVG image in a webpage (such as with the `<img>` element or as a background image), the SVG image can coordinate with the embedding element (its context) to have the image adopt property values set on the embedding element. To do this the embedding element needs to list the properties that are to be made available to the image by listing them as values of the **`-moz-context-properties`** property, and the image needs to opt in to using those properties by using values such as the `context-fill` value.
   *
   * **Syntax**: `none | [ fill | fill-opacity | stroke | stroke-opacity ]#`
   *
   * **Initial value**: `none`
   */
  MozContextProperties?: MozContextPropertiesProperty;
  /**
   * The non-standard **`-moz-float-edge`** CSS property specifies whether the height and width properties of the element include the margin, border, or padding thickness.
   *
   * **Syntax**: `border-box | content-box | margin-box | padding-box`
   *
   * **Initial value**: `content-box`
   */
  MozFloatEdge?: MozFloatEdgeProperty;
  /**
   * The **`font-feature-settings`** CSS property controls advanced typographic features in OpenType fonts.
   *
   * **Syntax**: `normal | <feature-tag-value>#`
   *
   * **Initial value**: `normal`
   */
  MozFontFeatureSettings?: FontFeatureSettingsProperty;
  /**
   * The **`font-language-override`** CSS property controls the use of language-specific glyphs in a typeface.
   *
   * **Syntax**: `normal | <string>`
   *
   * **Initial value**: `normal`
   */
  MozFontLanguageOverride?: FontLanguageOverrideProperty;
  /**
   * The **`-moz-force-broken-image-icon`** extended CSS property can be used to force the broken image icon to be shown even when a broken image has an `alt` attribute.
   *
   * **Syntax**: `<integer>`
   *
   * **Initial value**: `0`
   */
  MozForceBrokenImageIcon?: GlobalsNumber;
  /**
   * The **`hyphens`** CSS property specifies how words should be hyphenated when text wraps across multiple lines. You can prevent hyphenation entirely, use hyphenation in manually-specified points within the text, or let the browser automatically insert hyphens where appropriate.
   *
   * **Syntax**: `none | manual | auto`
   *
   * **Initial value**: `manual`
   */
  MozHyphens?: HyphensProperty;
  /**
   * For certain XUL elements and pseudo-elements that use an image from the `list-style-image` property, this property specifies a region of the image that is used in place of the whole image. This allows elements to use different pieces of the same image to improve performance.
   *
   * **Syntax**: `<shape> | auto`
   *
   * **Initial value**: `auto`
   */
  MozImageRegion?: MozImageRegionProperty;
  /**
   * The **`margin-inline-end`** CSS property defines the logical inline end margin of an element, which maps to a physical margin depending on the element's writing mode, directionality, and text orientation. In other words, it corresponds to the `margin-top`, `margin-right`, `margin-bottom` or `margin-left` property depending on the values defined for `writing-mode`, `direction`, and `text-orientation`.
   *
   * **Syntax**: `<'margin-left'>`
   *
   * **Initial value**: `0`
   */
  MozMarginEnd?: MarginInlineEndProperty<TLength>;
  /**
   * The **`margin-inline-start`** CSS property defines the logical inline start margin of an element, which maps to a physical margin depending on the element's writing mode, directionality, and text orientation. It corresponds to the `margin-top`, `margin-right`, `margin-bottom`, or `margin-left` property depending on the values defined for `writing-mode`, `direction`, and `text-orientation`.
   *
   * **Syntax**: `<'margin-left'>`
   *
   * **Initial value**: `0`
   */
  MozMarginStart?: MarginInlineStartProperty<TLength>;
  /**
   * The **`-moz-orient`** CSS property specifies the orientation of the element to which it's applied.
   *
   * **Syntax**: `inline | block | horizontal | vertical`
   *
   * **Initial value**: `inline`
   */
  MozOrient?: MozOrientProperty;
  /**
   * In Mozilla applications, the **`-moz-outline-radius-bottomleft`** CSS property can be used to round the bottom-left corner of an element's `outline`.
   *
   * **Syntax**: `<outline-radius>`
   *
   * **Initial value**: `0`
   */
  MozOutlineRadiusBottomleft?: MozOutlineRadiusBottomleftProperty<TLength>;
  /**
   * In Mozilla applications, the **`-moz-outline-radius-bottomright`** CSS property can be used to round the bottom-right corner of an element's `outline`.
   *
   * **Syntax**: `<outline-radius>`
   *
   * **Initial value**: `0`
   */
  MozOutlineRadiusBottomright?: MozOutlineRadiusBottomrightProperty<TLength>;
  /**
   * In Mozilla applications, the **`-moz-outline-radius-topleft`** CSS property can be used to round the top-left corner of an element's `outline`.
   *
   * **Syntax**: `<outline-radius>`
   *
   * **Initial value**: `0`
   */
  MozOutlineRadiusTopleft?: MozOutlineRadiusTopleftProperty<TLength>;
  /**
   * In Mozilla applications, the **`-moz-outline-radius-topright`** CSS property can be used to round the top-right corner of an element's `outline`.
   *
   * **Syntax**: `<outline-radius>`
   *
   * **Initial value**: `0`
   */
  MozOutlineRadiusTopright?: MozOutlineRadiusToprightProperty<TLength>;
  /**
   * The **`padding-inline-end`** CSS property defines the logical inline end padding of an element, which maps to a physical padding depending on the element's writing mode, directionality, and text orientation. It corresponds to the `padding-top`, `padding-right`, `padding-bottom`, or `padding-left` property depending on the values defined for `writing-mode`, `direction`, and `text-orientation`.
   *
   * **Syntax**: `<'padding-left'>`
   *
   * **Initial value**: `0`
   */
  MozPaddingEnd?: PaddingInlineEndProperty<TLength>;
  /**
   * The **`padding-inline-start`** CSS property defines the logical inline start padding of an element, which maps to a physical padding depending on the element's writing mode, directionality, and text orientation. It corresponds to the `padding-top`, `padding-right`, `padding-bottom`, or `padding-left` property depending on the values defined for `writing-mode`, `direction`, and `text-orientation`.
   *
   * **Syntax**: `<'padding-left'>`
   *
   * **Initial value**: `0`
   */
  MozPaddingStart?: PaddingInlineStartProperty<TLength>;
  /**
   * The **`perspective`** CSS property determines the distance between the z=0 plane and the user in order to give a 3D-positioned element some perspective. Each 3D element with z>0 becomes larger; each 3D-element with z<0 becomes smaller. The strength of the effect is determined by the value of this property.
   *
   * **Syntax**: `none | <length>`
   *
   * **Initial value**: `none`
   */
  MozPerspective?: PerspectiveProperty<TLength>;
  /**
   * The **`perspective-origin`** CSS property determines the position at which the viewer is looking. It is used as the _vanishing point_ by the `perspective` property.
   *
   * **Syntax**: `<position>`
   *
   * **Initial value**: `50% 50%`
   */
  MozPerspectiveOrigin?: PerspectiveOriginProperty<TLength>;
  /**
   * **`-moz-stack-sizing`** is an extended CSS property. Normally, a `stack` will change its size so that all of its child elements are completely visible. For example, moving a child of the stack far to the right will widen the stack so the child remains visible.
   *
   * **Syntax**: `ignore | stretch-to-fit`
   *
   * **Initial value**: `stretch-to-fit`
   */
  MozStackSizing?: MozStackSizingProperty;
  /**
   * The **`tab-size`** CSS property is used to customize the width of a tab (`U+0009`) character.
   *
   * **Syntax**: `<integer> | <length>`
   *
   * **Initial value**: `8`
   */
  MozTabSize?: TabSizeProperty<TLength>;
  /**
   * The **`text-size-adjust`** CSS property controls the text inflation algorithm used on some smartphones and tablets. Other browsers will ignore this property.
   *
   * **Syntax**: `none | auto | <percentage>`
   *
   * **Initial value**: `auto` for smartphone browsers supporting inflation, `none` in other cases (and then not modifiable).
   */
  MozTextSizeAdjust?: TextSizeAdjustProperty;
  /**
   * The **`transform-origin`** CSS property sets the origin for an element's transformations.
   *
   * **Syntax**: `[ <length-percentage> | left | center | right | top | bottom ] | [ [ <length-percentage> | left | center | right ] && [ <length-percentage> | top | center | bottom ] ] <length>?`
   *
   * **Initial value**: `50% 50% 0`
   */
  MozTransformOrigin?: TransformOriginProperty<TLength>;
  /**
   * The **`transform-style`** CSS property sets whether children of an element are positioned in the 3D space or are flattened in the plane of the element.
   *
   * **Syntax**: `flat | preserve-3d`
   *
   * **Initial value**: `flat`
   */
  MozTransformStyle?: TransformStyleProperty;
  /**
   * The **`transition-delay`** CSS property specifies the duration to wait before starting a property's transition effect when its value changes.
   *
   * **Syntax**: `<time>#`
   *
   * **Initial value**: `0s`
   */
  MozTransitionDelay?: GlobalsString;
  /**
   * The **`transition-duration`** CSS property sets the length of time a transition animation should take to complete. By default, the value is `0s`, meaning that no animation will occur.
   *
   * **Syntax**: `<time>#`
   *
   * **Initial value**: `0s`
   */
  MozTransitionDuration?: GlobalsString;
  /**
   * The **`transition-property`** CSS property sets the CSS properties to which a transition effect should be applied.
   *
   * **Syntax**: `none | <single-transition-property>#`
   *
   * **Initial value**: all
   */
  MozTransitionProperty?: TransitionPropertyProperty;
  /**
   * The **`transition-timing-function`** CSS property sets how intermediate values are calculated for CSS properties being affected by a transition effect.
   *
   * **Syntax**: `<timing-function>#`
   *
   * **Initial value**: `ease`
   */
  MozTransitionTimingFunction?: TransitionTimingFunctionProperty;
  /**
   * The **`-moz-user-focus`** CSS property is used to indicate whether an element can have the focus.
   *
   * **Syntax**: `ignore | normal | select-after | select-before | select-menu | select-same | select-all | none`
   *
   * **Initial value**: `none`
   */
  MozUserFocus?: MozUserFocusProperty;
  /**
   * The **`user-modify`** property has no effect in Firefox. It was originally planned to determine whether or not the content of an element can be edited by a user.
   *
   * **Syntax**: `read-only | read-write | write-only`
   *
   * **Initial value**: `read-only`
   */
  MozUserModify?: MozUserModifyProperty;
  /**
   * The `**user-select**` CSS property controls whether the user can select text. This doesn't have any effect on content loaded as chrome, except in textboxes.
   *
   * **Syntax**: `auto | text | none | contain | all`
   *
   * **Initial value**: `auto`
   */
  MozUserSelect?: UserSelectProperty;
  /**
   * The **`-moz-window-dragging`** CSS property specifies whether a window is draggable or not. It only works in Chrome code, and only on Mac OS X.
   *
   * **Syntax**: `drag | no-drag`
   *
   * **Initial value**: `drag`
   */
  MozWindowDragging?: MozWindowDraggingProperty;
  /**
   * The **`-ms-accelerator`** CSS property is a Microsoft extension that sets or retrieves a string indicating whether the object represents a keyboard shortcut.
   *
   * **Syntax**: `false | true`
   *
   * **Initial value**: `false`
   */
  msAccelerator?: MsAcceleratorProperty;
  /**
   * The **`align-self`** CSS property aligns flex items of the current flex line overriding the `align-items` value. If any of the item's cross-axis margin is set to `auto`, then `align-self` is ignored. In Grid layout `align-self` aligns the item inside the grid area.
   *
   * **Syntax**: `auto | normal | stretch | <baseline-position> | <overflow-position>? <self-position>`
   *
   * **Initial value**: `auto`
   */
  msAlignSelf?: AlignSelfProperty;
  /**
   * The **`-ms-block-progression`** CSS property is a Microsoft extension that specifies the block progression and layout orientation.
   *
   * **Syntax**: `tb | rl | bt | lr`
   *
   * **Initial value**: `tb`
   */
  msBlockProgression?: MsBlockProgressionProperty;
  /**
   * The **`-ms-content-zoom-chaining`** CSS property is a Microsoft extension specifying the zoom behavior that occurs when a user hits the zoom limit during page manipulation.
   *
   * **Syntax**: `none | chained`
   *
   * **Initial value**: `none`
   */
  msContentZoomChaining?: MsContentZoomChainingProperty;
  /**
   * The **`-ms-content-zoom-limit-max`** CSS property is a Microsoft extension that specifies the selected elements' maximum zoom factor.
   *
   * **Syntax**: `<percentage>`
   *
   * **Initial value**: `400%`
   */
  msContentZoomLimitMax?: GlobalsString;
  /**
   * The **`-ms-content-zoom-limit-min`** CSS property is a Microsoft extension that specifies the minimum zoom factor.
   *
   * **Syntax**: `<percentage>`
   *
   * **Initial value**: `100%`
   */
  msContentZoomLimitMin?: GlobalsString;
  /**
   * The **`-ms-content-zoom-snap-points`** CSS property is a Microsoft extension that specifies where zoom snap-points are located.
   *
   * **Syntax**: `snapInterval( <percentage>, <percentage> ) | snapList( <percentage># )`
   *
   * **Initial value**: `snapInterval(0%, 100%)`
   */
  msContentZoomSnapPoints?: GlobalsString;
  /**
   * The **`-ms-content-zoom-snap-type`** CSS property is a Microsoft extension that specifies how zooming is affected by defined snap-points.
   *
   * **Syntax**: `none | proximity | mandatory`
   *
   * **Initial value**: `none`
   */
  msContentZoomSnapType?: MsContentZoomSnapTypeProperty;
  /**
   * The **`-ms-content-zooming`** CSS property is a Microsoft extension that specifies whether zooming is enabled.
   *
   * **Syntax**: `none | zoom`
   *
   * **Initial value**: zoom for the top level element, none for all other elements
   */
  msContentZooming?: MsContentZoomingProperty;
  /**
   * The `-ms-filter` CSS property is a Microsoft extension that sets or retrieves the filter or collection of filters applied to an object.
   *
   * **Syntax**: `<string>`
   *
   * **Initial value**: "" (the empty string)
   */
  msFilter?: GlobalsString;
  /**
   * The **`flex-direction`** CSS property sets how flex items are placed in the flex container defining the main axis and the direction (normal or reversed).
   *
   * **Syntax**: `row | row-reverse | column | column-reverse`
   *
   * **Initial value**: `row`
   */
  msFlexDirection?: FlexDirectionProperty;
  /**
   * The **`flex-grow`** CSS property sets how much of the available space in the flex container should be assigned to that item (the flex grow factor). If all sibling items have the same flex grow factor, then all items will receive the same share of available space, otherwise it is distributed according to the ratio defined by the different flex grow factors.
   *
   * **Syntax**: `<number>`
   *
   * **Initial value**: `0`
   */
  msFlexPositive?: GlobalsNumber;
  /**
   * The **`-ms-flow-from`** CSS property is a Microsoft extension that gets or sets a value identifying a region container in the document that accepts the content flow from the data source.
   *
   * **Syntax**: `[ none | <custom-ident> ]#`
   *
   * **Initial value**: `none`
   */
  msFlowFrom?: MsFlowFromProperty;
  /**
   * The **`-ms-flow-into`** CSS property is a Microsoft extension that gets or sets a value identifying an iframe container in the document that serves as the region's data source.
   *
   * **Syntax**: `[ none | <custom-ident> ]#`
   *
   * **Initial value**: `none`
   */
  msFlowInto?: MsFlowIntoProperty;
  /**
   * The **`grid-auto-columns`** CSS property specifies the size of an implicitly-created grid column track.
   *
   * **Syntax**: `<track-size>+`
   *
   * **Initial value**: `auto`
   */
  msGridColumns?: GridAutoColumnsProperty<TLength>;
  /**
   * The **`grid-auto-rows`** CSS property specifies the size of an implicitly-created grid row track.
   *
   * **Syntax**: `<track-size>+`
   *
   * **Initial value**: `auto`
   */
  msGridRows?: GridAutoRowsProperty<TLength>;
  /**
   * The **`-ms-high-contrast-adjust`** CSS property is a Microsoft extension that gets or sets a value indicating whether to override any CSS properties that would have been set in high contrast mode.
   *
   * **Syntax**: `auto | none`
   *
   * **Initial value**: `auto`
   */
  msHighContrastAdjust?: MsHighContrastAdjustProperty;
  /**
   * The **`-ms-hyphenate-limit-chars`** CSS property is a Microsoft extension that specifies one to three values indicating the minimum number of characters in a hyphenated word. If the word does not meet the required minimum number of characters in the word, before the hyphen, or after the hyphen, then the word is not hyphenated.
   *
   * **Syntax**: `auto | <integer>{1,3}`
   *
   * **Initial value**: `auto`
   */
  msHyphenateLimitChars?: MsHyphenateLimitCharsProperty;
  /**
   * The **`-ms-hyphenate-limit-lines`** CSS property is a Microsoft extension specifying the maximum number of consecutive lines in an element that may be ended with a hyphenated word.
   *
   * **Syntax**: `no-limit | <integer>`
   *
   * **Initial value**: `no-limit`
   */
  msHyphenateLimitLines?: MsHyphenateLimitLinesProperty;
  /**
   * The `**-ms-hyphenate-limit-zone**` CSS property is a Microsoft extension specifying the width of the hyphenation zone.
   *
   * **Syntax**: `<percentage> | <length>`
   *
   * **Initial value**: `0`
   */
  msHyphenateLimitZone?: MsHyphenateLimitZoneProperty<TLength>;
  /**
   * The **`hyphens`** CSS property specifies how words should be hyphenated when text wraps across multiple lines. You can prevent hyphenation entirely, use hyphenation in manually-specified points within the text, or let the browser automatically insert hyphens where appropriate.
   *
   * **Syntax**: `none | manual | auto`
   *
   * **Initial value**: `manual`
   */
  msHyphens?: HyphensProperty;
  /**
   * The **`-ms-ime-align`** CSS property is a Microsoft extension aligning the Input Method Editor (IME) candidate window box relative to the element on which the IME composition is active. The extension is implemented in Microsoft Edge and Internet Explorer 11.
   *
   * **Syntax**: `auto | after`
   *
   * **Initial value**: `auto`
   */
  msImeAlign?: MsImeAlignProperty;
  /**
   * The **`line-break`** CSS property sets how to break lines of Chinese, Japanese, or Korean (CJK) text when working with punctuation and symbols.
   *
   * **Syntax**: `auto | loose | normal | strict | anywhere`
   *
   * **Initial value**: `auto`
   */
  msLineBreak?: LineBreakProperty;
  /**
   * The **`order`** CSS property sets the order to lay out an item in a flex or grid container. Items in a container are sorted by ascending `order` value and then by their source code order.
   *
   * **Syntax**: `<integer>`
   *
   * **Initial value**: `0`
   */
  msOrder?: GlobalsNumber;
  /**
   * The **`-ms-overflow-style`** CSS property is a Microsoft extension controlling the behavior of scrollbars when the content of an element overflows.
   *
   * **Syntax**: `auto | none | scrollbar | -ms-autohiding-scrollbar`
   *
   * **Initial value**: `auto`
   */
  msOverflowStyle?: MsOverflowStyleProperty;
  /**
   * The **`overflow-x`** CSS property sets what shows when content overflows a block-level element's left and right edges. This may be nothing, a scroll bar, or the overflow content.
   *
   * **Syntax**: `visible | hidden | clip | scroll | auto`
   *
   * **Initial value**: `visible`
   */
  msOverflowX?: OverflowXProperty;
  /**
   * The **`overflow-y`** CSS property sets what shows when content overflows a block-level element's top and bottom edges. This may be nothing, a scroll bar, or the overflow content.
   *
   * **Syntax**: `visible | hidden | clip | scroll | auto`
   *
   * **Initial value**: `visible`
   */
  msOverflowY?: OverflowYProperty;
  /**
   * The `**-ms-scroll-chaining**` CSS property is a Microsoft extension that specifies the scrolling behavior that occurs when a user hits the scroll limit during a manipulation.
   *
   * **Syntax**: `chained | none`
   *
   * **Initial value**: `chained`
   */
  msScrollChaining?: MsScrollChainingProperty;
  /**
   * The `**-ms-scroll-limit-x-max**` CSS property is a Microsoft extension that specifies the maximum value for the `Element.scrollLeft` property.
   *
   * **Syntax**: `auto | <length>`
   *
   * **Initial value**: `auto`
   */
  msScrollLimitXMax?: MsScrollLimitXMaxProperty<TLength>;
  /**
   * The **`-ms-scroll-limit-x-min`** CSS property is a Microsoft extension that specifies the minimum value for the `Element.scrollLeft` property.
   *
   * **Syntax**: `<length>`
   *
   * **Initial value**: `0`
   */
  msScrollLimitXMin?: MsScrollLimitXMinProperty<TLength>;
  /**
   * The **`-ms-scroll-limit-y-max`** CSS property is a Microsoft extension that specifies the maximum value for the `Element.scrollTop` property.
   *
   * **Syntax**: `auto | <length>`
   *
   * **Initial value**: `auto`
   */
  msScrollLimitYMax?: MsScrollLimitYMaxProperty<TLength>;
  /**
   * The **`-ms-scroll-limit-y-min`** CSS property is a Microsoft extension that specifies the minimum value for the `Element.scrollTop` property.
   *
   * **Syntax**: `<length>`
   *
   * **Initial value**: `0`
   */
  msScrollLimitYMin?: MsScrollLimitYMinProperty<TLength>;
  /**
   * The **`-ms-scroll-rails`** CSS property is a Microsoft extension that specifies whether scrolling locks to the primary axis of motion.
   *
   * **Syntax**: `none | railed`
   *
   * **Initial value**: `railed`
   */
  msScrollRails?: MsScrollRailsProperty;
  /**
   * The **`-ms-scroll-snap-points-x`** CSS property is a Microsoft extension that specifies where snap-points will be located along the x-axis.
   *
   * **Syntax**: `snapInterval( <length-percentage>, <length-percentage> ) | snapList( <length-percentage># )`
   *
   * **Initial value**: `snapInterval(0px, 100%)`
   */
  msScrollSnapPointsX?: GlobalsString;
  /**
   * The **`-ms-scroll-snap-points-y`** CSS property is a Microsoft extension that specifies where snap-points will be located along the y-axis.
   *
   * **Syntax**: `snapInterval( <length-percentage>, <length-percentage> ) | snapList( <length-percentage># )`
   *
   * **Initial value**: `snapInterval(0px, 100%)`
   */
  msScrollSnapPointsY?: GlobalsString;
  /**
   * The **`scroll-snap-type`** CSS property sets how strictly snap points are enforced on the scroll container in case there is one.
   *
   * **Syntax**: `none | proximity | mandatory`
   *
   * **Initial value**: `none`
   */
  msScrollSnapType?: MsScrollSnapTypeProperty;
  /**
   * The **`-ms-scroll-translation`** CSS property is a Microsoft extension that specifies whether vertical-to-horizontal scroll wheel translation occurs on the specified element.
   *
   * **Syntax**: `none | vertical-to-horizontal`
   *
   * **Initial value**: `none`
   */
  msScrollTranslation?: MsScrollTranslationProperty;
  /**
   * The **`-ms-scrollbar-3dlight-color`** CSS property is a Microsoft extension specifying the color of the top and left edges of the scroll box and scroll arrows of a scroll bar.
   *
   * **Syntax**: `<color>`
   *
   * **Initial value**: depends on user agent
   */
  msScrollbar3dlightColor?: MsScrollbar3dlightColorProperty;
  /**
   * The **`-ms-scrollbar-arrow-color`** CSS property is a Microsoft extension that specifies the color of the arrow elements of a scroll arrow.
   *
   * **Syntax**: `<color>`
   *
   * **Initial value**: `ButtonText`
   */
  msScrollbarArrowColor?: MsScrollbarArrowColorProperty;
  /**
   * The `**-ms-scrollbar-base-color**` CSS property is a Microsoft extension that specifies the base color of the main elements of a scroll bar.
   *
   * **Syntax**: `<color>`
   *
   * **Initial value**: depends on user agent
   */
  msScrollbarBaseColor?: MsScrollbarBaseColorProperty;
  /**
   * The **`-ms-scrollbar-darkshadow-color`** CSS property is a Microsoft extension that specifies the color of a scroll bar's gutter.
   *
   * **Syntax**: `<color>`
   *
   * **Initial value**: `ThreeDDarkShadow`
   */
  msScrollbarDarkshadowColor?: MsScrollbarDarkshadowColorProperty;
  /**
   * The `**-ms-scrollbar-face-color**` CSS property is a Microsoft extension that specifies the color of the scroll box and scroll arrows of a scroll bar.
   *
   * **Syntax**: `<color>`
   *
   * **Initial value**: `ThreeDFace`
   */
  msScrollbarFaceColor?: MsScrollbarFaceColorProperty;
  /**
   * The `**-ms-scrollbar-highlight-color**` CSS property is a Microsoft extension that specifies the color of the slider tray, the top and left edges of the scroll box, and the scroll arrows of a scroll bar.
   *
   * **Syntax**: `<color>`
   *
   * **Initial value**: `ThreeDHighlight`
   */
  msScrollbarHighlightColor?: MsScrollbarHighlightColorProperty;
  /**
   * The **`-ms-scrollbar-shadow-color`** CSS property is a Microsoft extension that specifies the color of the bottom and right edges of the scroll box and scroll arrows of a scroll bar.
   *
   * **Syntax**: `<color>`
   *
   * **Initial value**: `ThreeDDarkShadow`
   */
  msScrollbarShadowColor?: MsScrollbarShadowColorProperty;
  /**
   * The **`-ms-text-autospace`** CSS property is a Microsoft extension that specifies the autospacing and narrow space width adjustment of text.
   *
   * **Syntax**: `none | ideograph-alpha | ideograph-numeric | ideograph-parenthesis | ideograph-space`
   *
   * **Initial value**: `none`
   */
  msTextAutospace?: MsTextAutospaceProperty;
  /**
   * The **`text-combine-upright`** CSS property sets the combination of characters into the space of a single character. If the combined text is wider than 1em, the user agent must fit the contents within 1em. The resulting composition is treated as a single upright glyph for layout and decoration. This property only has an effect in vertical writing modes.
   *
   * **Syntax**: `none | all | [ digits <integer>? ]`
   *
   * **Initial value**: `none`
   */
  msTextCombineHorizontal?: TextCombineUprightProperty;
  /**
   * The **`text-overflow`** CSS property sets how hidden overflow content is signaled to users. It can be clipped, display an ellipsis ('`…`'), or display a custom string.
   *
   * **Syntax**: `[ clip | ellipsis | <string> ]{1,2}`
   *
   * **Initial value**: `clip`
   */
  msTextOverflow?: TextOverflowProperty;
  /**
   * The **`touch-action`** CSS property sets how a region can be manipulated by a touchscreen user (for example, by zooming features built into the browser).
   *
   * **Syntax**: `auto | none | [ [ pan-x | pan-left | pan-right ] || [ pan-y | pan-up | pan-down ] || pinch-zoom ] | manipulation`
   *
   * **Initial value**: `auto`
   */
  msTouchAction?: TouchActionProperty;
  /**
   * The **`-ms-touch-select`** CSS property is a Microsoft extension that toggles the gripper visual elements that enable touch text selection.
   *
   * **Syntax**: `grippers | none`
   *
   * **Initial value**: `grippers`
   */
  msTouchSelect?: MsTouchSelectProperty;
  /**
   * The **`transform`** CSS property lets you rotate, scale, skew, or translate an element. It modifies the coordinate space of the CSS visual formatting model.
   *
   * **Syntax**: `none | <transform-list>`
   *
   * **Initial value**: `none`
   */
  msTransform?: TransformProperty;
  /**
   * The **`transform-origin`** CSS property sets the origin for an element's transformations.
   *
   * **Syntax**: `[ <length-percentage> | left | center | right | top | bottom ] | [ [ <length-percentage> | left | center | right ] && [ <length-percentage> | top | center | bottom ] ] <length>?`
   *
   * **Initial value**: `50% 50% 0`
   */
  msTransformOrigin?: TransformOriginProperty<TLength>;
  /**
   * The **`transition-delay`** CSS property specifies the duration to wait before starting a property's transition effect when its value changes.
   *
   * **Syntax**: `<time>#`
   *
   * **Initial value**: `0s`
   */
  msTransitionDelay?: GlobalsString;
  /**
   * The **`transition-duration`** CSS property sets the length of time a transition animation should take to complete. By default, the value is `0s`, meaning that no animation will occur.
   *
   * **Syntax**: `<time>#`
   *
   * **Initial value**: `0s`
   */
  msTransitionDuration?: GlobalsString;
  /**
   * The **`transition-property`** CSS property sets the CSS properties to which a transition effect should be applied.
   *
   * **Syntax**: `none | <single-transition-property>#`
   *
   * **Initial value**: all
   */
  msTransitionProperty?: TransitionPropertyProperty;
  /**
   * The **`transition-timing-function`** CSS property sets how intermediate values are calculated for CSS properties being affected by a transition effect.
   *
   * **Syntax**: `<timing-function>#`
   *
   * **Initial value**: `ease`
   */
  msTransitionTimingFunction?: TransitionTimingFunctionProperty;
  /**
   * The `**user-select**` CSS property controls whether the user can select text. This doesn't have any effect on content loaded as chrome, except in textboxes.
   *
   * **Syntax**: `none | element | text`
   *
   * **Initial value**: `text`
   */
  msUserSelect?: MsUserSelectProperty;
  /**
   * The **`word-break`** CSS property sets whether line breaks appear wherever the text would otherwise overflow its content box.
   *
   * **Syntax**: `normal | break-all | keep-all | break-word`
   *
   * **Initial value**: `normal`
   */
  msWordBreak?: WordBreakProperty;
  /**
   * The **`-ms-wrap-flow`** CSS property is a Microsoft extension that specifies how exclusions impact inline content within block-level elements.
   *
   * **Syntax**: `auto | both | start | end | maximum | clear`
   *
   * **Initial value**: `auto`
   */
  msWrapFlow?: MsWrapFlowProperty;
  /**
   * The **`-ms-wrap-margin`** CSS property is a Microsoft extension that specifies a margin that offsets the inner wrap shape from other shapes.
   *
   * **Syntax**: `<length>`
   *
   * **Initial value**: `0`
   */
  msWrapMargin?: MsWrapMarginProperty<TLength>;
  /**
   * The **`-ms-wrap-through`** CSS property is a Microsoft extension that specifies how content should wrap around an exclusion element.
   *
   * **Syntax**: `wrap | none`
   *
   * **Initial value**: `wrap`
   */
  msWrapThrough?: MsWrapThroughProperty;
  /**
   * The **`writing-mode`** CSS property sets whether lines of text are laid out horizontally or vertically, as well as the direction in which blocks progress.
   *
   * **Syntax**: `horizontal-tb | vertical-rl | vertical-lr | sideways-rl | sideways-lr`
   *
   * **Initial value**: `horizontal-tb`
   */
  msWritingMode?: WritingModeProperty;
  /**
   * The **`object-fit`** CSS property sets how the content of a replaced element, such as an `<img>` or `<video>`, should be resized to fit its container.
   *
   * **Syntax**: `fill | contain | cover | none | scale-down`
   *
   * **Initial value**: `fill`
   */
  OObjectFit?: ObjectFitProperty;
  /**
   * The **`object-position`** CSS property specifies the alignment of the selected replaced element's contents within the element's box. Areas of the box which aren't covered by the replaced element's object will show the element's background.
   *
   * **Syntax**: `<position>`
   *
   * **Initial value**: `50% 50%`
   */
  OObjectPosition?: ObjectPositionProperty<TLength>;
  /**
   * The **`tab-size`** CSS property is used to customize the width of a tab (`U+0009`) character.
   *
   * **Syntax**: `<integer> | <length>`
   *
   * **Initial value**: `8`
   */
  OTabSize?: TabSizeProperty<TLength>;
  /**
   * The **`text-overflow`** CSS property sets how hidden overflow content is signaled to users. It can be clipped, display an ellipsis ('`…`'), or display a custom string.
   *
   * **Syntax**: `[ clip | ellipsis | <string> ]{1,2}`
   *
   * **Initial value**: `clip`
   */
  OTextOverflow?: TextOverflowProperty;
  /**
   * The **`transform-origin`** CSS property sets the origin for an element's transformations.
   *
   * **Syntax**: `[ <length-percentage> | left | center | right | top | bottom ] | [ [ <length-percentage> | left | center | right ] && [ <length-percentage> | top | center | bottom ] ] <length>?`
   *
   * **Initial value**: `50% 50% 0`
   */
  OTransformOrigin?: TransformOriginProperty<TLength>;
  /**
   * The CSS **`align-content`** property sets how the browser distributes space between and around content items along the cross-axis of a flexbox container, and the main-axis of a grid container.
   *
   * **Syntax**: `normal | <baseline-position> | <content-distribution> | <overflow-position>? <content-position>`
   *
   * **Initial value**: `normal`
   */
  WebkitAlignContent?: AlignContentProperty;
  /**
   * The CSS **`align-items`** property sets the `align-self` value on all direct children as a group. The align-self property sets the alignment of an item within its containing block. In Flexbox it controls the alignment of items on the Cross Axis, in Grid Layout it controls the alignment of items on the Block Axis within their grid area.
   *
   * **Syntax**: `normal | stretch | <baseline-position> | [ <overflow-position>? <self-position> ]`
   *
   * **Initial value**: `normal`
   */
  WebkitAlignItems?: AlignItemsProperty;
  /**
   * The **`align-self`** CSS property aligns flex items of the current flex line overriding the `align-items` value. If any of the item's cross-axis margin is set to `auto`, then `align-self` is ignored. In Grid layout `align-self` aligns the item inside the grid area.
   *
   * **Syntax**: `auto | normal | stretch | <baseline-position> | <overflow-position>? <self-position>`
   *
   * **Initial value**: `auto`
   */
  WebkitAlignSelf?: AlignSelfProperty;
  /**
   * The **`animation-delay`** CSS property sets when an animation starts. The animation can start later, immediately from its beginning, or immediately and partway through the animation.
   *
   * **Syntax**: `<time>#`
   *
   * **Initial value**: `0s`
   */
  WebkitAnimationDelay?: GlobalsString;
  /**
   * The **`animation-direction`** CSS property sets whether an animation should play forwards, backwards, or alternating back and forth.
   *
   * **Syntax**: `<single-animation-direction>#`
   *
   * **Initial value**: `normal`
   */
  WebkitAnimationDirection?: AnimationDirectionProperty;
  /**
   * The **`animation-duration`** CSS property sets the length of time that an animation takes to complete one cycle.
   *
   * **Syntax**: `<time>#`
   *
   * **Initial value**: `0s`
   */
  WebkitAnimationDuration?: GlobalsString;
  /**
   * The **`animation-fill-mode`** CSS property sets how a CSS animation applies styles to its target before and after its execution.
   *
   * **Syntax**: `<single-animation-fill-mode>#`
   *
   * **Initial value**: `none`
   */
  WebkitAnimationFillMode?: AnimationFillModeProperty;
  /**
   * The **`animation-iteration-count`** CSS property sets the number of times an animation cycle should be played before stopping.
   *
   * **Syntax**: `<single-animation-iteration-count>#`
   *
   * **Initial value**: `1`
   */
  WebkitAnimationIterationCount?: AnimationIterationCountProperty;
  /**
   * The **`animation-name`** CSS property sets one or more animations to apply to an element. Each name is an `@keyframes` at-rule that sets the property values for the animation sequence.
   *
   * **Syntax**: `[ none | <keyframes-name> ]#`
   *
   * **Initial value**: `none`
   */
  WebkitAnimationName?: AnimationNameProperty;
  /**
   * The **`animation-play-state`** CSS property sets whether an animation is running or paused.
   *
   * **Syntax**: `<single-animation-play-state>#`
   *
   * **Initial value**: `running`
   */
  WebkitAnimationPlayState?: AnimationPlayStateProperty;
  /**
   * The `**animation-timing-function**` CSS property sets how an animation progresses through the duration of each cycle.
   *
   * **Syntax**: `<timing-function>#`
   *
   * **Initial value**: `ease`
   */
  WebkitAnimationTimingFunction?: AnimationTimingFunctionProperty;
  /**
   * The **`-moz-appearance`** CSS property is used in Gecko (Firefox) to display an element using platform-native styling based on the operating system's theme.
   *
   * **Syntax**: `none | button | button-bevel | caret | checkbox | default-button | inner-spin-button | listbox | listitem | media-controls-background | media-controls-fullscreen-background | media-current-time-display | media-enter-fullscreen-button | media-exit-fullscreen-button | media-fullscreen-button | media-mute-button | media-overlay-play-button | media-play-button | media-seek-back-button | media-seek-forward-button | media-slider | media-sliderthumb | media-time-remaining-display | media-toggle-closed-captions-button | media-volume-slider | media-volume-slider-container | media-volume-sliderthumb | menulist | menulist-button | menulist-text | menulist-textfield | meter | progress-bar | progress-bar-value | push-button | radio | searchfield | searchfield-cancel-button | searchfield-decoration | searchfield-results-button | searchfield-results-decoration | slider-horizontal | slider-vertical | sliderthumb-horizontal | sliderthumb-vertical | square-button | textarea | textfield`
   *
   * **Initial value**: `none` (but this value is overridden in the user agent CSS)
   */
  WebkitAppearance?: WebkitAppearanceProperty;
  /**
   * The **`backdrop-filter`** CSS property lets you apply graphical effects such as blurring or color shifting to the area behind an element. Because it applies to everything _behind_ the element, to see the effect you must make the element or its background at least partially transparent.
   *
   * **Syntax**: `none | <filter-function-list>`
   *
   * **Initial value**: `none`
   */
  WebkitBackdropFilter?: BackdropFilterProperty;
  /**
   * The **`backface-visibility`** CSS property sets whether the back face of an element is visible when turned towards the user.
   *
   * **Syntax**: `visible | hidden`
   *
   * **Initial value**: `visible`
   */
  WebkitBackfaceVisibility?: BackfaceVisibilityProperty;
  /**
   * The **`background-clip`** CSS property sets whether an element's background `<color>` or `<image>` extends underneath its border.
   *
   * **Syntax**: `<box>#`
   *
   * **Initial value**: `border-box`
   */
  WebkitBackgroundClip?: BackgroundClipProperty;
  /**
   * The **`background-origin`** CSS property sets the _background positioning area_. In other words, it sets the origin position of an image set with the `background-image` property.
   *
   * **Syntax**: `<box>#`
   *
   * **Initial value**: `padding-box`
   */
  WebkitBackgroundOrigin?: BackgroundOriginProperty;
  /**
   * The **`background-size`** CSS property sets the size of the element's background image. The image can be left to its natural size, stretched, or constrained to fit the available space.
   *
   * **Syntax**: `<bg-size>#`
   *
   * **Initial value**: `auto auto`
   */
  WebkitBackgroundSize?: BackgroundSizeProperty<TLength>;
  /**
   * **Syntax**: `<'color'>`
   *
   * **Initial value**: `currentcolor`
   */
  WebkitBorderBeforeColor?: WebkitBorderBeforeColorProperty;
  /**
   * **Syntax**: `<'border-style'>`
   *
   * **Initial value**: `none`
   */
  WebkitBorderBeforeStyle?: WebkitBorderBeforeStyleProperty;
  /**
   * **Syntax**: `<'border-width'>`
   *
   * **Initial value**: `medium`
   */
  WebkitBorderBeforeWidth?: WebkitBorderBeforeWidthProperty<TLength>;
  /**
   * The **`border-bottom-left-radius`** CSS property rounds the bottom-left corner of an element.
   *
   * **Syntax**: `<length-percentage>{1,2}`
   *
   * **Initial value**: `0`
   */
  WebkitBorderBottomLeftRadius?: BorderBottomLeftRadiusProperty<TLength>;
  /**
   * The **`border-bottom-right-radius`** CSS property rounds the bottom-right corner of an element.
   *
   * **Syntax**: `<length-percentage>{1,2}`
   *
   * **Initial value**: `0`
   */
  WebkitBorderBottomRightRadius?: BorderBottomRightRadiusProperty<TLength>;
  /**
   * The **`border-image-slice`** CSS property divides the image specified by `border-image-source` into regions. These regions form the components of an element's border image.
   *
   * **Syntax**: `<number-percentage>{1,4} && fill?`
   *
   * **Initial value**: `100%`
   */
  WebkitBorderImageSlice?: BorderImageSliceProperty;
  /**
   * The **`border-top-left-radius`** CSS property rounds the top-left corner of an element.
   *
   * **Syntax**: `<length-percentage>{1,2}`
   *
   * **Initial value**: `0`
   */
  WebkitBorderTopLeftRadius?: BorderTopLeftRadiusProperty<TLength>;
  /**
   * The **`border-top-right-radius`** CSS property rounds the top-right corner of an element.
   *
   * **Syntax**: `<length-percentage>{1,2}`
   *
   * **Initial value**: `0`
   */
  WebkitBorderTopRightRadius?: BorderTopRightRadiusProperty<TLength>;
  /**
   * The **`box-decoration-break`** CSS property specifies how an element's fragments should be rendered when broken across multiple lines, columns, or pages.
   *
   * **Syntax**: `slice | clone`
   *
   * **Initial value**: `slice`
   */
  WebkitBoxDecorationBreak?: BoxDecorationBreakProperty;
  /**
   * The **`-webkit-box-reflect`** CSS property lets you reflect the content of an element in one specific direction.
   *
   * **Syntax**: `[ above | below | right | left ]? <length>? <image>?`
   *
   * **Initial value**: `none`
   */
  WebkitBoxReflect?: WebkitBoxReflectProperty<TLength>;
  /**
   * The **`box-shadow`** CSS property adds shadow effects around an element's frame. You can set multiple effects separated by commas. A box shadow is described by X and Y offsets relative to the element, blur and spread radii, and color.
   *
   * **Syntax**: `none | <shadow>#`
   *
   * **Initial value**: `none`
   */
  WebkitBoxShadow?: BoxShadowProperty;
  /**
   * The **`box-sizing`** CSS property defines how the user agent should calculate the total width and height of an element.
   *
   * **Syntax**: `content-box | border-box`
   *
   * **Initial value**: `content-box`
   */
  WebkitBoxSizing?: BoxSizingProperty;
  /**
   * The `**clip-path**` CSS property creates a clipping region that sets what part of an element should be shown. Parts that are inside the region are shown, while those outside are hidden.
   *
   * **Syntax**: `<clip-source> | [ <basic-shape> || <geometry-box> ] | none`
   *
   * **Initial value**: `none`
   */
  WebkitClipPath?: ClipPathProperty;
  /**
   * The **`color-adjust`** CSS property sets what, if anything, the user agent may do to optimize the appearance of the element on the output device. By default, the browser is allowed to make any adjustments to the element's appearance it determines to be necessary and prudent given the type and capabilities of the output device.
   *
   * **Syntax**: `economy | exact`
   *
   * **Initial value**: `economy`
   */
  WebkitColorAdjust?: ColorAdjustProperty;
  /**
   * The **`column-count`** CSS property breaks an element's content into the specified number of columns.
   *
   * **Syntax**: `<integer> | auto`
   *
   * **Initial value**: `auto`
   */
  WebkitColumnCount?: ColumnCountProperty;
  /**
   * The **`column-fill`** CSS property controls how an element's contents are balanced when broken into columns.
   *
   * **Syntax**: `auto | balance | balance-all`
   *
   * **Initial value**: `balance`
   */
  WebkitColumnFill?: ColumnFillProperty;
  /**
   * The **`column-gap`** CSS property sets the size of the gap (gutter) between an element's columns.
   *
   * **Syntax**: `normal | <length-percentage>`
   *
   * **Initial value**: `normal`
   */
  WebkitColumnGap?: ColumnGapProperty<TLength>;
  /**
   * The **`column-rule-color`** CSS property sets the color of the rule (line) drawn between columns in a multi-column layout.
   *
   * **Syntax**: `<color>`
   *
   * **Initial value**: `currentcolor`
   */
  WebkitColumnRuleColor?: ColumnRuleColorProperty;
  /**
   * The **`column-rule-style`** CSS property sets the style of the line drawn between columns in a multi-column layout.
   *
   * **Syntax**: `<'border-style'>`
   *
   * **Initial value**: `none`
   */
  WebkitColumnRuleStyle?: ColumnRuleStyleProperty;
  /**
   * The **`column-rule-width`** CSS property sets the width of the rule (line) drawn between columns in a multi-column layout.
   *
   * **Syntax**: `<'border-width'>`
   *
   * **Initial value**: `medium`
   */
  WebkitColumnRuleWidth?: ColumnRuleWidthProperty<TLength>;
  /**
   * The **`column-span`** CSS property makes it possible for an element to span across all columns when its value is set to `all`.
   *
   * **Syntax**: `none | all`
   *
   * **Initial value**: `none`
   */
  WebkitColumnSpan?: ColumnSpanProperty;
  /**
   * The **`column-width`** CSS property specifies the ideal column width in a multi-column layout. The container will have as many columns as can fit without any of them having a width less than the `column-width` value. If the width of the container is narrower than the specified value, the single column's width will be smaller than the declared column width.
   *
   * **Syntax**: `<length> | auto`
   *
   * **Initial value**: `auto`
   */
  WebkitColumnWidth?: ColumnWidthProperty<TLength>;
  /**
   * The **`filter`** CSS property applies graphical effects like blur or color shift to an element. Filters are commonly used to adjust the rendering of images, backgrounds, and borders.
   *
   * **Syntax**: `none | <filter-function-list>`
   *
   * **Initial value**: `none`
   */
  WebkitFilter?: FilterProperty;
  /**
   * The **`flex-basis`** CSS property sets the initial main size of a flex item. It sets the size of the content box unless otherwise set with `box-sizing`.
   *
   * **Syntax**: `content | <'width'>`
   *
   * **Initial value**: `auto`
   */
  WebkitFlexBasis?: FlexBasisProperty<TLength>;
  /**
   * The **`flex-direction`** CSS property sets how flex items are placed in the flex container defining the main axis and the direction (normal or reversed).
   *
   * **Syntax**: `row | row-reverse | column | column-reverse`
   *
   * **Initial value**: `row`
   */
  WebkitFlexDirection?: FlexDirectionProperty;
  /**
   * The **`flex-grow`** CSS property sets how much of the available space in the flex container should be assigned to that item (the flex grow factor). If all sibling items have the same flex grow factor, then all items will receive the same share of available space, otherwise it is distributed according to the ratio defined by the different flex grow factors.
   *
   * **Syntax**: `<number>`
   *
   * **Initial value**: `0`
   */
  WebkitFlexGrow?: GlobalsNumber;
  /**
   * The **`flex-shrink`** CSS property sets the flex shrink factor of a flex item. If the size of flex items is larger than the flex container, items shrink to fit according to `flex-shrink`.
   *
   * **Syntax**: `<number>`
   *
   * **Initial value**: `1`
   */
  WebkitFlexShrink?: GlobalsNumber;
  /**
   * The **`flex-wrap`** CSS property sets whether flex items are forced onto one line or can wrap onto multiple lines. If wrapping is allowed, it sets the direction that lines are stacked.
   *
   * **Syntax**: `nowrap | wrap | wrap-reverse`
   *
   * **Initial value**: `nowrap`
   */
  WebkitFlexWrap?: FlexWrapProperty;
  /**
   * The **`font-feature-settings`** CSS property controls advanced typographic features in OpenType fonts.
   *
   * **Syntax**: `normal | <feature-tag-value>#`
   *
   * **Initial value**: `normal`
   */
  WebkitFontFeatureSettings?: FontFeatureSettingsProperty;
  /**
   * The **`font-kerning`** CSS property sets the use of the kerning information stored in a font.
   *
   * **Syntax**: `auto | normal | none`
   *
   * **Initial value**: `auto`
   */
  WebkitFontKerning?: FontKerningProperty;
  /**
   * The **`font-variant-ligatures`** CSS property controls which ligatures and contextual forms are used in textual content of the elements it applies to. This leads to more harmonized forms in the resulting text.
   *
   * **Syntax**: `normal | none | [ <common-lig-values> || <discretionary-lig-values> || <historical-lig-values> || <contextual-alt-values> ]`
   *
   * **Initial value**: `normal`
   */
  WebkitFontVariantLigatures?: FontVariantLigaturesProperty;
  /**
   * The **`hyphens`** CSS property specifies how words should be hyphenated when text wraps across multiple lines. You can prevent hyphenation entirely, use hyphenation in manually-specified points within the text, or let the browser automatically insert hyphens where appropriate.
   *
   * **Syntax**: `none | manual | auto`
   *
   * **Initial value**: `manual`
   */
  WebkitHyphens?: HyphensProperty;
  /**
   * The CSS **`justify-content`** property defines how the browser distributes space between and around content items along the main-axis of a flex container, and the inline axis of a grid container.
   *
   * **Syntax**: `normal | <content-distribution> | <overflow-position>? [ <content-position> | left | right ]`
   *
   * **Initial value**: `normal`
   */
  WebkitJustifyContent?: JustifyContentProperty;
  /**
   * The **`line-break`** CSS property sets how to break lines of Chinese, Japanese, or Korean (CJK) text when working with punctuation and symbols.
   *
   * **Syntax**: `auto | loose | normal | strict | anywhere`
   *
   * **Initial value**: `auto`
   */
  WebkitLineBreak?: LineBreakProperty;
  /**
   * The **`-webkit-line-clamp`** CSS property allows limiting of the contents of a block container to the specified number of lines.
   *
   * **Syntax**: `none | <integer>`
   *
   * **Initial value**: `none`
   */
  WebkitLineClamp?: WebkitLineClampProperty;
  /**
   * The **`margin-inline-end`** CSS property defines the logical inline end margin of an element, which maps to a physical margin depending on the element's writing mode, directionality, and text orientation. In other words, it corresponds to the `margin-top`, `margin-right`, `margin-bottom` or `margin-left` property depending on the values defined for `writing-mode`, `direction`, and `text-orientation`.
   *
   * **Syntax**: `<'margin-left'>`
   *
   * **Initial value**: `0`
   */
  WebkitMarginEnd?: MarginInlineEndProperty<TLength>;
  /**
   * The **`margin-inline-start`** CSS property defines the logical inline start margin of an element, which maps to a physical margin depending on the element's writing mode, directionality, and text orientation. It corresponds to the `margin-top`, `margin-right`, `margin-bottom`, or `margin-left` property depending on the values defined for `writing-mode`, `direction`, and `text-orientation`.
   *
   * **Syntax**: `<'margin-left'>`
   *
   * **Initial value**: `0`
   */
  WebkitMarginStart?: MarginInlineStartProperty<TLength>;
  /**
   * If a `-webkit-mask-image` is specified, `-webkit-mask-attachment` determines whether the mask image's position is fixed within the viewport, or scrolls along with its containing block.
   *
   * **Syntax**: `<attachment>#`
   *
   * **Initial value**: `scroll`
   */
  WebkitMaskAttachment?: WebkitMaskAttachmentProperty;
  /**
   * The **`mask-clip`** CSS property determines the area, which is affected by a mask. The painted content of an element must be restricted to this area.
   *
   * **Syntax**: `[ <box> | border | padding | content | text ]#`
   *
   * **Initial value**: `border`
   */
  WebkitMaskClip?: WebkitMaskClipProperty;
  /**
   * The **`-webkit-mask-composite`** property specifies the manner in which multiple mask images applied to the same element are composited with one another. Mask images are composited in the opposite order that they are declared with the `-webkit-mask-image` property.
   *
   * **Syntax**: `<composite-style>#`
   *
   * **Initial value**: `source-over`
   */
  WebkitMaskComposite?: WebkitMaskCompositeProperty;
  /**
   * The **`mask-image`** CSS property sets the image that is used as mask layer for an element.
   *
   * **Syntax**: `<mask-reference>#`
   *
   * **Initial value**: `none`
   */
  WebkitMaskImage?: WebkitMaskImageProperty;
  /**
   * The **`mask-origin`** CSS property sets the origin of a mask.
   *
   * **Syntax**: `[ <box> | border | padding | content ]#`
   *
   * **Initial value**: `padding`
   */
  WebkitMaskOrigin?: WebkitMaskOriginProperty;
  /**
   * The **`mask-position`** CSS property sets the initial position, relative to the mask position layer set by `mask-origin`, for each defined mask image.
   *
   * **Syntax**: `<position>#`
   *
   * **Initial value**: `0% 0%`
   */
  WebkitMaskPosition?: WebkitMaskPositionProperty<TLength>;
  /**
   * The `-webkit-mask-position-x` CSS property sets the initial horizontal position of a mask image.
   *
   * **Syntax**: `[ <length-percentage> | left | center | right ]#`
   *
   * **Initial value**: `0%`
   */
  WebkitMaskPositionX?: WebkitMaskPositionXProperty<TLength>;
  /**
   * The `-webkit-mask-position-y` CSS property sets the initial vertical position of a mask image.
   *
   * **Syntax**: `[ <length-percentage> | top | center | bottom ]#`
   *
   * **Initial value**: `0%`
   */
  WebkitMaskPositionY?: WebkitMaskPositionYProperty<TLength>;
  /**
   * The **`mask-repeat`** CSS property sets how mask images are repeated. A mask image can be repeated along the horizontal axis, the vertical axis, both axes, or not repeated at all.
   *
   * **Syntax**: `<repeat-style>#`
   *
   * **Initial value**: `repeat`
   */
  WebkitMaskRepeat?: WebkitMaskRepeatProperty;
  /**
   * The `-webkit-mask-repeat-x` property specifies whether and how a mask image is repeated (tiled) horizontally.
   *
   * **Syntax**: `repeat | no-repeat | space | round`
   *
   * **Initial value**: `repeat`
   */
  WebkitMaskRepeatX?: WebkitMaskRepeatXProperty;
  /**
   * The `-webkit-mask-repeat-y` property sets whether and how a mask image is repeated (tiled) vertically.
   *
   * **Syntax**: `repeat | no-repeat | space | round`
   *
   * **Initial value**: `repeat`
   */
  WebkitMaskRepeatY?: WebkitMaskRepeatYProperty;
  /**
   * The **`mask-size`** CSS property specifies the sizes of the mask images. The size of the image can be fully or partially constrained in order to preserve its intrinsic ratio.
   *
   * **Syntax**: `<bg-size>#`
   *
   * **Initial value**: `auto auto`
   */
  WebkitMaskSize?: WebkitMaskSizeProperty<TLength>;
  /**
   * The **`max-inline-size`** CSS property defines the horizontal or vertical maximum size of an element's block depending on its writing mode. It corresponds to the `max-width` or the `max-height` property depending on the value defined for `writing-mode`. If the writing mode is vertically oriented, the value of `max-inline-size` relates to the maximal height of the element, otherwise it relates to the maximal width of the element. It relates to `max-block-size`, which defines the other dimension of the element.
   *
   * **Syntax**: `<'max-width'>`
   *
   * **Initial value**: `0`
   */
  WebkitMaxInlineSize?: MaxInlineSizeProperty<TLength>;
  /**
   * The **`order`** CSS property sets the order to lay out an item in a flex or grid container. Items in a container are sorted by ascending `order` value and then by their source code order.
   *
   * **Syntax**: `<integer>`
   *
   * **Initial value**: `0`
   */
  WebkitOrder?: GlobalsNumber;
  /**
   * The `-webkit-overflow-scrolling` CSS property controls whether or not touch devices use momentum-based scrolling for a given element.
   *
   * **Syntax**: `auto | touch`
   *
   * **Initial value**: `auto`
   */
  WebkitOverflowScrolling?: WebkitOverflowScrollingProperty;
  /**
   * The **`padding-inline-end`** CSS property defines the logical inline end padding of an element, which maps to a physical padding depending on the element's writing mode, directionality, and text orientation. It corresponds to the `padding-top`, `padding-right`, `padding-bottom`, or `padding-left` property depending on the values defined for `writing-mode`, `direction`, and `text-orientation`.
   *
   * **Syntax**: `<'padding-left'>`
   *
   * **Initial value**: `0`
   */
  WebkitPaddingEnd?: PaddingInlineEndProperty<TLength>;
  /**
   * The **`padding-inline-start`** CSS property defines the logical inline start padding of an element, which maps to a physical padding depending on the element's writing mode, directionality, and text orientation. It corresponds to the `padding-top`, `padding-right`, `padding-bottom`, or `padding-left` property depending on the values defined for `writing-mode`, `direction`, and `text-orientation`.
   *
   * **Syntax**: `<'padding-left'>`
   *
   * **Initial value**: `0`
   */
  WebkitPaddingStart?: PaddingInlineStartProperty<TLength>;
  /**
   * The **`perspective`** CSS property determines the distance between the z=0 plane and the user in order to give a 3D-positioned element some perspective. Each 3D element with z>0 becomes larger; each 3D-element with z<0 becomes smaller. The strength of the effect is determined by the value of this property.
   *
   * **Syntax**: `none | <length>`
   *
   * **Initial value**: `none`
   */
  WebkitPerspective?: PerspectiveProperty<TLength>;
  /**
   * The **`perspective-origin`** CSS property determines the position at which the viewer is looking. It is used as the _vanishing point_ by the `perspective` property.
   *
   * **Syntax**: `<position>`
   *
   * **Initial value**: `50% 50%`
   */
  WebkitPerspectiveOrigin?: PerspectiveOriginProperty<TLength>;
  /**
   * The **`scroll-snap-type`** CSS property sets how strictly snap points are enforced on the scroll container in case there is one.
   *
   * **Syntax**: `none | [ x | y | block | inline | both ] [ mandatory | proximity ]?`
   *
   * **Initial value**: `none`
   */
  WebkitScrollSnapType?: ScrollSnapTypeProperty;
  /**
   * The **`shape-margin`** CSS property sets a margin for a CSS shape created using `shape-outside`.
   *
   * **Syntax**: `<length-percentage>`
   *
   * **Initial value**: `0`
   */
  WebkitShapeMargin?: ShapeMarginProperty<TLength>;
  /**
   * **`-webkit-tap-highlight-color`** is a non-standard CSS property that sets the color of the highlight that appears over a link while it's being tapped. The highlighting indicates to the user that their tap is being successfully recognized, and indicates which element they're tapping on.
   *
   * **Syntax**: `<color>`
   *
   * **Initial value**: `black`
   */
  WebkitTapHighlightColor?: WebkitTapHighlightColorProperty;
  /**
   * The **`text-combine-upright`** CSS property sets the combination of characters into the space of a single character. If the combined text is wider than 1em, the user agent must fit the contents within 1em. The resulting composition is treated as a single upright glyph for layout and decoration. This property only has an effect in vertical writing modes.
   *
   * **Syntax**: `none | all | [ digits <integer>? ]`
   *
   * **Initial value**: `none`
   */
  WebkitTextCombine?: TextCombineUprightProperty;
  /**
   * The **`text-decoration-color`** CSS property sets the color of decorations added to text by `text-decoration-line`.
   *
   * **Syntax**: `<color>`
   *
   * **Initial value**: `currentcolor`
   */
  WebkitTextDecorationColor?: TextDecorationColorProperty;
  /**
   * The **`text-decoration-line`** CSS property sets the kind of decoration that is used on text in an element, such as an underline or overline.
   *
   * **Syntax**: `none | [ underline || overline || line-through || blink ] | spelling-error | grammar-error`
   *
   * **Initial value**: `none`
   */
  WebkitTextDecorationLine?: TextDecorationLineProperty;
  /**
   * The **`text-decoration-skip`** CSS property sets what parts of an element’s content any text decoration affecting the element must skip over. It controls all text decoration lines drawn by the element and also any text decoration lines drawn by its ancestors.
   *
   * **Syntax**: `none | [ objects || [ spaces | [ leading-spaces || trailing-spaces ] ] || edges || box-decoration ]`
   *
   * **Initial value**: `objects`
   */
  WebkitTextDecorationSkip?: TextDecorationSkipProperty;
  /**
   * The **`text-decoration-style`** CSS property sets the style of the lines specified by `text-decoration-line`. The style applies to all lines that are set with `text-decoration-line`.
   *
   * **Syntax**: `solid | double | dotted | dashed | wavy`
   *
   * **Initial value**: `solid`
   */
  WebkitTextDecorationStyle?: TextDecorationStyleProperty;
  /**
   * The **`text-emphasis-color`** CSS property sets the color of emphasis marks. This value can also be set using the `text-emphasis` shorthand.
   *
   * **Syntax**: `<color>`
   *
   * **Initial value**: `currentcolor`
   */
  WebkitTextEmphasisColor?: TextEmphasisColorProperty;
  /**
   * The **`text-emphasis-position`** CSS property sets where emphasis marks are drawn. Like ruby text, if there isn't enough room for emphasis marks, the line height is increased.
   *
   * **Syntax**: `[ over | under ] && [ right | left ]`
   *
   * **Initial value**: `over right`
   */
  WebkitTextEmphasisPosition?: GlobalsString;
  /**
   * The **`text-emphasis-style`** CSS property sets the appearance of emphasis marks. It can also be set, and reset, using the `text-emphasis` shorthand.
   *
   * **Syntax**: `none | [ [ filled | open ] || [ dot | circle | double-circle | triangle | sesame ] ] | <string>`
   *
   * **Initial value**: `none`
   */
  WebkitTextEmphasisStyle?: TextEmphasisStyleProperty;
  /**
   * The **`-webkit-text-fill-color`** CSS property specifies the fill color of characters of text. If this property is not set, the value of the `color` property is used.
   *
   * **Syntax**: `<color>`
   *
   * **Initial value**: `currentcolor`
   */
  WebkitTextFillColor?: WebkitTextFillColorProperty;
  /**
   * The **`text-orientation`** CSS property sets the orientation of the text characters in a line. It only affects text in vertical mode (when `writing-mode` is not `horizontal-tb`). It is useful for controlling the display of languages that use vertical script, and also for making vertical table headers.
   *
   * **Syntax**: `mixed | upright | sideways`
   *
   * **Initial value**: `mixed`
   */
  WebkitTextOrientation?: TextOrientationProperty;
  /**
   * The **`text-size-adjust`** CSS property controls the text inflation algorithm used on some smartphones and tablets. Other browsers will ignore this property.
   *
   * **Syntax**: `none | auto | <percentage>`
   *
   * **Initial value**: `auto` for smartphone browsers supporting inflation, `none` in other cases (and then not modifiable).
   */
  WebkitTextSizeAdjust?: TextSizeAdjustProperty;
  /**
   * The **`-webkit-text-stroke-color`** CSS property specifies the stroke color of characters of text. If this property is not set, the value of the `color` property is used.
   *
   * **Syntax**: `<color>`
   *
   * **Initial value**: `currentcolor`
   */
  WebkitTextStrokeColor?: WebkitTextStrokeColorProperty;
  /**
   * The **`-webkit-text-stroke-width`** CSS property specifies the width of the stroke for text.
   *
   * **Syntax**: `<length>`
   *
   * **Initial value**: `0`
   */
  WebkitTextStrokeWidth?: WebkitTextStrokeWidthProperty<TLength>;
  /**
   * The `-webkit-touch-callout` CSS property controls the display of the default callout shown when you touch and hold a touch target.
   *
   * **Syntax**: `default | none`
   *
   * **Initial value**: `default`
   */
  WebkitTouchCallout?: WebkitTouchCalloutProperty;
  /**
   * The **`transform`** CSS property lets you rotate, scale, skew, or translate an element. It modifies the coordinate space of the CSS visual formatting model.
   *
   * **Syntax**: `none | <transform-list>`
   *
   * **Initial value**: `none`
   */
  WebkitTransform?: TransformProperty;
  /**
   * The **`transform-origin`** CSS property sets the origin for an element's transformations.
   *
   * **Syntax**: `[ <length-percentage> | left | center | right | top | bottom ] | [ [ <length-percentage> | left | center | right ] && [ <length-percentage> | top | center | bottom ] ] <length>?`
   *
   * **Initial value**: `50% 50% 0`
   */
  WebkitTransformOrigin?: TransformOriginProperty<TLength>;
  /**
   * The **`transform-style`** CSS property sets whether children of an element are positioned in the 3D space or are flattened in the plane of the element.
   *
   * **Syntax**: `flat | preserve-3d`
   *
   * **Initial value**: `flat`
   */
  WebkitTransformStyle?: TransformStyleProperty;
  /**
   * The **`transition-delay`** CSS property specifies the duration to wait before starting a property's transition effect when its value changes.
   *
   * **Syntax**: `<time>#`
   *
   * **Initial value**: `0s`
   */
  WebkitTransitionDelay?: GlobalsString;
  /**
   * The **`transition-duration`** CSS property sets the length of time a transition animation should take to complete. By default, the value is `0s`, meaning that no animation will occur.
   *
   * **Syntax**: `<time>#`
   *
   * **Initial value**: `0s`
   */
  WebkitTransitionDuration?: GlobalsString;
  /**
   * The **`transition-property`** CSS property sets the CSS properties to which a transition effect should be applied.
   *
   * **Syntax**: `none | <single-transition-property>#`
   *
   * **Initial value**: all
   */
  WebkitTransitionProperty?: TransitionPropertyProperty;
  /**
   * The **`transition-timing-function`** CSS property sets how intermediate values are calculated for CSS properties being affected by a transition effect.
   *
   * **Syntax**: `<timing-function>#`
   *
   * **Initial value**: `ease`
   */
  WebkitTransitionTimingFunction?: TransitionTimingFunctionProperty;
  /**
   * **Syntax**: `read-only | read-write | read-write-plaintext-only`
   *
   * **Initial value**: `read-only`
   */
  WebkitUserModify?: WebkitUserModifyProperty;
  /**
   * The `**user-select**` CSS property controls whether the user can select text. This doesn't have any effect on content loaded as chrome, except in textboxes.
   *
   * **Syntax**: `auto | text | none | contain | all`
   *
   * **Initial value**: `auto`
   */
  WebkitUserSelect?: UserSelectProperty;
  /**
   * The **`writing-mode`** CSS property sets whether lines of text are laid out horizontally or vertically, as well as the direction in which blocks progress.
   *
   * **Syntax**: `horizontal-tb | vertical-rl | vertical-lr | sideways-rl | sideways-lr`
   *
   * **Initial value**: `horizontal-tb`
   */
  WebkitWritingMode?: WritingModeProperty;
  /**
   * The **`text-underline-position`** CSS property specifies the position of the underline which is set using the `text-decoration` property's `underline` value.
   *
   * **Syntax**: `auto | from-font | [ under || [ left | right ] ]`
   *
   * **Initial value**: `auto`
   */
  WebkittextUnderlinePosition?: TextUnderlinePositionProperty;
}

interface VendorShorthandProperties<TLength = string | 0> {
  /**
   * The **`animation`** shorthand CSS property sets an animated transition between styles. It is a shorthand for `animation-name`, `animation-duration`, `animation-timing-function`, `animation-delay`, `animation-iteration-count`, `animation-direction`, `animation-fill-mode`, and `animation-play-state`.
   *
   * **Syntax**: `<single-animation>#`
   */
  MozAnimation?: AnimationProperty;
  /**
   * The **`border-image`** CSS property draws an image in place of an element's `border-style`.
   *
   * **Syntax**: `<'border-image-source'> || <'border-image-slice'> [ / <'border-image-width'> | / <'border-image-width'>? / <'border-image-outset'> ]? || <'border-image-repeat'>`
   */
  MozBorderImage?: BorderImageProperty;
  /**
   * The **`column-rule`** CSS property sets the width, style, and color of the rule (line) drawn between columns in a multi-column layout.
   *
   * **Syntax**: `<'column-rule-width'> || <'column-rule-style'> || <'column-rule-color'>`
   */
  MozColumnRule?: ColumnRuleProperty<TLength>;
  /**
   * The **`columns`** CSS property sets the column width and column count of an element.
   *
   * **Syntax**: `<'column-width'> || <'column-count'>`
   */
  MozColumns?: ColumnsProperty<TLength>;
  /**
   * The **`transition`** CSS property is a shorthand property for `transition-property`, `transition-duration`, `transition-timing-function`, and `transition-delay`.
   *
   * **Syntax**: `<single-transition>#`
   */
  MozTransition?: TransitionProperty;
  /**
   * The **`-ms-content-zoom-limit`** CSS shorthand property is a Microsoft extension that specifies values for the `-ms-content-zoom-limit-min` and `-ms-content-zoom-limit-max` properties.
   *
   * **Syntax**: `<'-ms-content-zoom-limit-min'> <'-ms-content-zoom-limit-max'>`
   */
  msContentZoomLimit?: GlobalsString;
  /**
   * The **`-ms-content-zoom-snap`** CSS shorthand property is a Microsoft extension that specifies values for the `-ms-content-zoom-snap-type` and `-ms-content-zoom-snap-points` properties.
   *
   * **Syntax**: `<'-ms-content-zoom-snap-type'> || <'-ms-content-zoom-snap-points'>`
   */
  msContentZoomSnap?: MsContentZoomSnapProperty;
  /**
   * The **`flex`** CSS property sets how a flex item will grow or shrink to fit the space available in its flex container. It is a shorthand for `flex-grow`, `flex-shrink`, and `flex-basis`.
   *
   * **Syntax**: `none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]`
   */
  msFlex?: FlexProperty<TLength>;
  /**
   * The **\-ms-scroll-limit** CSS property is a Microsoft extension that specifies values for the `-ms-scroll-limit-x-min`, `-ms-scroll-limit-y-min`, `-ms-scroll-limit-x-max`, and `-ms-scroll-limit-y-max` properties.
   *
   * **Syntax**: `<'-ms-scroll-limit-x-min'> <'-ms-scroll-limit-y-min'> <'-ms-scroll-limit-x-max'> <'-ms-scroll-limit-y-max'>`
   */
  msScrollLimit?: GlobalsString;
  /**
   * The **`-ms-scroll-snap-x`** CSS shorthand property is a Microsoft extension that specifies values for the `-ms-scroll-snap-type` and `-ms-scroll-snap-points-x` properties.
   *
   * **Syntax**: `<'-ms-scroll-snap-type'> <'-ms-scroll-snap-points-x'>`
   */
  msScrollSnapX?: GlobalsString;
  /**
   * The **`-ms-scroll-snap-x`** CSS shorthand property is a Microsoft extension that specifies values for the `-ms-scroll-snap-type` and `-ms-scroll-snap-points-y` properties.
   *
   * **Syntax**: `<'-ms-scroll-snap-type'> <'-ms-scroll-snap-points-y'>`
   */
  msScrollSnapY?: GlobalsString;
  /**
   * The **`transition`** CSS property is a shorthand property for `transition-property`, `transition-duration`, `transition-timing-function`, and `transition-delay`.
   *
   * **Syntax**: `<single-transition>#`
   */
  msTransition?: TransitionProperty;
  /**
   * The **`animation`** shorthand CSS property sets an animated transition between styles. It is a shorthand for `animation-name`, `animation-duration`, `animation-timing-function`, `animation-delay`, `animation-iteration-count`, `animation-direction`, `animation-fill-mode`, and `animation-play-state`.
   *
   * **Syntax**: `<single-animation>#`
   */
  WebkitAnimation?: AnimationProperty;
  /**
   * The **`-webkit-border-before`** CSS property is a shorthand property for setting the individual logical block start border property values in a single place in the style sheet.
   *
   * **Syntax**: `<'border-width'> || <'border-style'> || <'color'>`
   */
  WebkitBorderBefore?: WebkitBorderBeforeProperty<TLength>;
  /**
   * The **`border-image`** CSS property draws an image in place of an element's `border-style`.
   *
   * **Syntax**: `<'border-image-source'> || <'border-image-slice'> [ / <'border-image-width'> | / <'border-image-width'>? / <'border-image-outset'> ]? || <'border-image-repeat'>`
   */
  WebkitBorderImage?: BorderImageProperty;
  /**
   * The **`border-radius`** CSS property rounds the corners of an element's outer border edge. You can set a single radius to make circular corners, or two radii to make elliptical corners.
   *
   * **Syntax**: `<length-percentage>{1,4} [ / <length-percentage>{1,4} ]?`
   */
  WebkitBorderRadius?: BorderRadiusProperty<TLength>;
  /**
   * The **`column-rule`** CSS property sets the width, style, and color of the rule (line) drawn between columns in a multi-column layout.
   *
   * **Syntax**: `<'column-rule-width'> || <'column-rule-style'> || <'column-rule-color'>`
   */
  WebkitColumnRule?: ColumnRuleProperty<TLength>;
  /**
   * The **`columns`** CSS property sets the column width and column count of an element.
   *
   * **Syntax**: `<'column-width'> || <'column-count'>`
   */
  WebkitColumns?: ColumnsProperty<TLength>;
  /**
   * The **`flex`** CSS property sets how a flex item will grow or shrink to fit the space available in its flex container. It is a shorthand for `flex-grow`, `flex-shrink`, and `flex-basis`.
   *
   * **Syntax**: `none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]`
   */
  WebkitFlex?: FlexProperty<TLength>;
  /**
   * The **`flex-flow`** CSS property is a shorthand property for `flex-direction` and `flex-wrap` properties.
   *
   * **Syntax**: `<'flex-direction'> || <'flex-wrap'>`
   */
  WebkitFlexFlow?: FlexFlowProperty;
  /**
   * The **`mask`** CSS property hides an element (partially or fully) by masking or clipping the image at specific points.
   *
   * **Syntax**: `[ <mask-reference> || <position> [ / <bg-size> ]? || <repeat-style> || [ <box> | border | padding | content | text ] || [ <box> | border | padding | content ] ]#`
   */
  WebkitMask?: WebkitMaskProperty<TLength>;
  /**
   * The **`text-emphasis`** CSS property applies emphasis marks to text (except spaces and control characters). It is a shorthand for `text-emphasis-style` and `text-emphasis-color`.
   *
   * **Syntax**: `<'text-emphasis-style'> || <'text-emphasis-color'>`
   */
  WebkitTextEmphasis?: TextEmphasisProperty;
  /**
   * The **`-webkit-text-stroke`** CSS property specifies the width and color of strokes for text characters. This is a shorthand property for the longhand properties `-webkit-text-stroke-width` and `-webkit-text-stroke-color`.
   *
   * **Syntax**: `<length> || <color>`
   */
  WebkitTextStroke?: WebkitTextStrokeProperty<TLength>;
  /**
   * The **`transition`** CSS property is a shorthand property for `transition-property`, `transition-duration`, `transition-timing-function`, and `transition-delay`.
   *
   * **Syntax**: `<single-transition>#`
   */
  WebkitTransition?: TransitionProperty;
}

interface VendorProperties<TLength = string | 0> extends VendorLonghandProperties<TLength>, VendorShorthandProperties<TLength> {}

interface ObsoleteProperties<TLength = string | 0> {
  /**
   * The **`box-align`** CSS property specifies how an element aligns its contents across its layout in a perpendicular direction. The effect of the property is only visible if there is extra space in the box.
   *
   * **Syntax**: `start | center | end | baseline | stretch`
   *
   * **Initial value**: `stretch`
   *
   * @deprecated
   */
  boxAlign?: BoxAlignProperty;
  /**
   * The **`box-direction`** CSS property specifies whether a box lays out its contents normally (from the top or left edge), or in reverse (from the bottom or right edge).
   *
   * **Syntax**: `normal | reverse | inherit`
   *
   * **Initial value**: `normal`
   *
   * @deprecated
   */
  boxDirection?: BoxDirectionProperty;
  /**
   * The **`-moz-box-flex`** and **`-webkit-box-flex`** CSS properties specify how a `-moz-box` or `-webkit-box` grows to fill the box that contains it, in the direction of the containing box's layout.
   *
   * **Syntax**: `<number>`
   *
   * **Initial value**: `0`
   *
   * @deprecated
   */
  boxFlex?: GlobalsNumber;
  /**
   * The **`box-flex-group`** CSS property assigns the flexbox's child elements to a flex group.
   *
   * **Syntax**: `<integer>`
   *
   * **Initial value**: `1`
   *
   * @deprecated
   */
  boxFlexGroup?: GlobalsNumber;
  /**
   * The **`box-lines`** CSS property determines whether the box may have a single or multiple lines (rows for horizontally oriented boxes, columns for vertically oriented boxes).
   *
   * **Syntax**: `single | multiple`
   *
   * **Initial value**: `single`
   *
   * @deprecated
   */
  boxLines?: BoxLinesProperty;
  /**
   * The **`box-ordinal-group`** CSS property assigns the flexbox's child elements to an ordinal group.
   *
   * **Syntax**: `<integer>`
   *
   * **Initial value**: `1`
   *
   * @deprecated
   */
  boxOrdinalGroup?: GlobalsNumber;
  /**
   * The **`box-orient`** CSS property specifies whether an element lays out its contents horizontally or vertically.
   *
   * **Syntax**: `horizontal | vertical | inline-axis | block-axis | inherit`
   *
   * **Initial value**: `inline-axis` (`horizontal` in XUL)
   *
   * @deprecated
   */
  boxOrient?: BoxOrientProperty;
  /**
   * The **`-moz-box-pack`** and **`-webkit-box-pack`** CSS properties specify how a `-moz-box` or `-webkit-box` packs its contents in the direction of its layout. The effect of this is only visible if there is extra space in the box.
   *
   * **Syntax**: `start | center | end | justify`
   *
   * **Initial value**: `start`
   *
   * @deprecated
   */
  boxPack?: BoxPackProperty;
  /**
   * The **`clip`** CSS property defines what portion of an element is visible. The `clip` property applies only to absolutely positioned elements, that is elements with `position:absolute` or `position:fixed`.
   *
   * **Syntax**: `<shape> | auto`
   *
   * **Initial value**: `auto`
   *
   * @deprecated
   */
  clip?: ClipProperty;
  /**
   * The **`font-variant-alternates`** CSS property controls the usage of alternate glyphs. These alternate glyphs may be referenced by alternative names defined in `@font-feature-values`.
   *
   * **Syntax**: `normal | [ stylistic( <feature-value-name> ) || historical-forms || styleset( <feature-value-name># ) || character-variant( <feature-value-name># ) || swash( <feature-value-name> ) || ornaments( <feature-value-name> ) || annotation( <feature-value-name> ) ]`
   *
   * **Initial value**: `normal`
   *
   * @deprecated
   */
  fontVariantAlternates?: FontVariantAlternatesProperty;
  /**
   * The **`column-gap`** CSS property sets the size of the gap (gutter) between an element's columns.
   *
   * **Syntax**: `<length-percentage>`
   *
   * **Initial value**: `0`
   *
   * @deprecated
   */
  gridColumnGap?: GridColumnGapProperty<TLength>;
  /**
   * The **`gap`** CSS property sets the gaps (gutters) between rows and columns. It is a shorthand for `row-gap` and `column-gap`.
   *
   * **Syntax**: `<'grid-row-gap'> <'grid-column-gap'>?`
   *
   * @deprecated
   */
  gridGap?: GridGapProperty<TLength>;
  /**
   * The **`row-gap`** CSS property sets the size of the gap (gutter) between an element's grid rows.
   *
   * **Syntax**: `<length-percentage>`
   *
   * **Initial value**: `0`
   *
   * @deprecated
   */
  gridRowGap?: GridRowGapProperty<TLength>;
  /**
   * The **`ime-mode`** CSS property controls the state of the input method editor (IME) for text fields. This property is obsolete.
   *
   * **Syntax**: `auto | normal | active | inactive | disabled`
   *
   * **Initial value**: `auto`
   *
   * @deprecated
   */
  imeMode?: ImeModeProperty;
  /**
   * The **`inset-block`** CSS property defines the logical block start and end offsets of an element, which maps to physical offsets depending on the element's writing mode, directionality, and text orientation. It corresponds to the `top` and `bottom`, or `right` and `left` properties depending on the values defined for `writing-mode`, `direction`, and `text-orientation`.
   *
   * **Syntax**: `<'top'>{1,2}`
   *
   * **Initial value**: `auto`
   *
   * @deprecated
   */
  offsetBlock?: InsetBlockProperty<TLength>;
  /**
   * The **`inset-block-end`** CSS property defines the logical block end offset of an element, which maps to a physical inset depending on the element's writing mode, directionality, and text orientation. It corresponds to the `top`, `right`, `bottom`, or `left` property depending on the values defined for `writing-mode`, `direction`, and `text-orientation`.
   *
   * **Syntax**: `<'top'>`
   *
   * **Initial value**: `auto`
   *
   * @deprecated
   */
  offsetBlockEnd?: InsetBlockEndProperty<TLength>;
  /**
   * The **`inset-block-start`** CSS property defines the logical block start offset of an element, which maps to a physical inset depending on the element's writing mode, directionality, and text orientation. It corresponds to the `top`, `right`, `bottom`, or `left` property depending on the values defined for `writing-mode`, `direction`, and `text-orientation`.
   *
   * **Syntax**: `<'top'>`
   *
   * **Initial value**: `auto`
   *
   * @deprecated
   */
  offsetBlockStart?: InsetBlockStartProperty<TLength>;
  /**
   * The **`inset-inline`** CSS property defines the logical block start and end offsets of an element, which maps to physical offsets depending on the element's writing mode, directionality, and text orientation. It corresponds to the `top` and `bottom`, or `right` and `left` properties depending on the values defined for `writing-mode`, `direction`, and `text-orientation`.
   *
   * **Syntax**: `<'top'>{1,2}`
   *
   * **Initial value**: `auto`
   *
   * @deprecated
   */
  offsetInline?: InsetInlineProperty<TLength>;
  /**
   * The **`inset-inline-end`** CSS property defines the logical inline end inset of an element, which maps to a physical inset depending on the element's writing mode, directionality, and text orientation. It corresponds to the `top`, `right`, `bottom`, or `left` property depending on the values defined for `writing-mode`, `direction`, and `text-orientation`.
   *
   * **Syntax**: `<'top'>`
   *
   * **Initial value**: `auto`
   *
   * @deprecated
   */
  offsetInlineEnd?: InsetInlineEndProperty<TLength>;
  /**
   * The **`inset-inline-start`** CSS property defines the logical inline start inset of an element, which maps to a physical offset depending on the element's writing mode, directionality, and text orientation. It corresponds to the `top`, `right`, `bottom`, or `left` property depending on the values defined for `writing-mode`, `direction`, and `text-orientation`.
   *
   * **Syntax**: `<'top'>`
   *
   * **Initial value**: `auto`
   *
   * @deprecated
   */
  offsetInlineStart?: InsetInlineStartProperty<TLength>;
  /**
   * The **`scroll-snap-coordinate`** CSS property defines the x and y coordinate positions within an element that will align with its nearest ancestor scroll container's `scroll-snap-destination` for each respective axis.
   *
   * **Syntax**: `none | <position>#`
   *
   * **Initial value**: `none`
   *
   * @deprecated
   */
  scrollSnapCoordinate?: ScrollSnapCoordinateProperty<TLength>;
  /**
   * The **`scroll-snap-destination`** CSS property defines the position in x and y coordinates within the scroll container's visual viewport which element snap points align with.
   *
   * **Syntax**: `<position>`
   *
   * **Initial value**: `0px 0px`
   *
   * @deprecated
   */
  scrollSnapDestination?: ScrollSnapDestinationProperty<TLength>;
  /**
   * The **`scroll-snap-points-x`** CSS property defines the horizontal positioning of snap points within the content of the scroll container they are applied to.
   *
   * **Syntax**: `none | repeat( <length-percentage> )`
   *
   * **Initial value**: `none`
   *
   * @deprecated
   */
  scrollSnapPointsX?: ScrollSnapPointsXProperty;
  /**
   * The **`scroll-snap-points-y`** CSS property defines the vertical positioning of snap points within the content of the scroll container they are applied to.
   *
   * **Syntax**: `none | repeat( <length-percentage> )`
   *
   * **Initial value**: `none`
   *
   * @deprecated
   */
  scrollSnapPointsY?: ScrollSnapPointsYProperty;
  /**
   * The **`scroll-snap-type-x`** CSS property defines how strictly snap points are enforced on the horizontal axis of the scroll container in case there is one.
   *
   * **Syntax**: `none | mandatory | proximity`
   *
   * **Initial value**: `none`
   *
   * @deprecated
   */
  scrollSnapTypeX?: ScrollSnapTypeXProperty;
  /**
   * The **`scroll-snap-type-y`** CSS property defines how strictly snap points are enforced on the vertical axis of the scroll container in case there is one.
   *
   * **Syntax**: `none | mandatory | proximity`
   *
   * **Initial value**: `none`
   *
   * @deprecated
   */
  scrollSnapTypeY?: ScrollSnapTypeYProperty;
  /**
   * The **`-ms-scrollbar-track-color`** CSS property is a Microsoft extension that specifies the color of the track element of a scrollbar.
   *
   * **Syntax**: `<color>`
   *
   * **Initial value**: `Scrollbar`
   *
   * @deprecated
   */
  scrollbarTrackColor?: MsScrollbarTrackColorProperty;
  /**
   * The **`text-combine-upright`** CSS property sets the combination of characters into the space of a single character. If the combined text is wider than 1em, the user agent must fit the contents within 1em. The resulting composition is treated as a single upright glyph for layout and decoration. This property only has an effect in vertical writing modes.
   *
   * **Syntax**: `none | all | [ digits <integer>? ]`
   *
   * **Initial value**: `none`
   *
   * @deprecated
   */
  textCombineHorizontal?: TextCombineUprightProperty;
  /**
   * The **`box-align`** CSS property specifies how an element aligns its contents across its layout in a perpendicular direction. The effect of the property is only visible if there is extra space in the box.
   *
   * **Syntax**: `start | center | end | baseline | stretch`
   *
   * **Initial value**: `stretch`
   *
   * @deprecated
   */
  KhtmlBoxAlign?: BoxAlignProperty;
  /**
   * The **`box-direction`** CSS property specifies whether a box lays out its contents normally (from the top or left edge), or in reverse (from the bottom or right edge).
   *
   * **Syntax**: `normal | reverse | inherit`
   *
   * **Initial value**: `normal`
   *
   * @deprecated
   */
  KhtmlBoxDirection?: BoxDirectionProperty;
  /**
   * The **`-moz-box-flex`** and **`-webkit-box-flex`** CSS properties specify how a `-moz-box` or `-webkit-box` grows to fill the box that contains it, in the direction of the containing box's layout.
   *
   * **Syntax**: `<number>`
   *
   * **Initial value**: `0`
   *
   * @deprecated
   */
  KhtmlBoxFlex?: GlobalsNumber;
  /**
   * The **`box-flex-group`** CSS property assigns the flexbox's child elements to a flex group.
   *
   * **Syntax**: `<integer>`
   *
   * **Initial value**: `1`
   *
   * @deprecated
   */
  KhtmlBoxFlexGroup?: GlobalsNumber;
  /**
   * The **`box-lines`** CSS property determines whether the box may have a single or multiple lines (rows for horizontally oriented boxes, columns for vertically oriented boxes).
   *
   * **Syntax**: `single | multiple`
   *
   * **Initial value**: `single`
   *
   * @deprecated
   */
  KhtmlBoxLines?: BoxLinesProperty;
  /**
   * The **`box-ordinal-group`** CSS property assigns the flexbox's child elements to an ordinal group.
   *
   * **Syntax**: `<integer>`
   *
   * **Initial value**: `1`
   *
   * @deprecated
   */
  KhtmlBoxOrdinalGroup?: GlobalsNumber;
  /**
   * The **`box-orient`** CSS property specifies whether an element lays out its contents horizontally or vertically.
   *
   * **Syntax**: `horizontal | vertical | inline-axis | block-axis | inherit`
   *
   * **Initial value**: `inline-axis` (`horizontal` in XUL)
   *
   * @deprecated
   */
  KhtmlBoxOrient?: BoxOrientProperty;
  /**
   * The **`-moz-box-pack`** and **`-webkit-box-pack`** CSS properties specify how a `-moz-box` or `-webkit-box` packs its contents in the direction of its layout. The effect of this is only visible if there is extra space in the box.
   *
   * **Syntax**: `start | center | end | justify`
   *
   * **Initial value**: `start`
   *
   * @deprecated
   */
  KhtmlBoxPack?: BoxPackProperty;
  /**
   * The **`line-break`** CSS property sets how to break lines of Chinese, Japanese, or Korean (CJK) text when working with punctuation and symbols.
   *
   * **Syntax**: `auto | loose | normal | strict | anywhere`
   *
   * **Initial value**: `auto`
   *
   * @deprecated
   */
  KhtmlLineBreak?: LineBreakProperty;
  /**
   * The **`opacity`** CSS property sets the transparency of an element or the degree to which content behind an element is visible.
   *
   * **Syntax**: `<alpha-value>`
   *
   * **Initial value**: `1.0`
   *
   * @deprecated
   */
  KhtmlOpacity?: OpacityProperty;
  /**
   * The `**user-select**` CSS property controls whether the user can select text. This doesn't have any effect on content loaded as chrome, except in textboxes.
   *
   * **Syntax**: `auto | text | none | contain | all`
   *
   * **Initial value**: `auto`
   *
   * @deprecated
   */
  KhtmlUserSelect?: UserSelectProperty;
  /**
   * The **`background-clip`** CSS property sets whether an element's background `<color>` or `<image>` extends underneath its border.
   *
   * **Syntax**: `<box>#`
   *
   * **Initial value**: `border-box`
   *
   * @deprecated
   */
  MozBackgroundClip?: BackgroundClipProperty;
  /**
   * The **`box-decoration-break`** CSS property specifies how an element's fragments should be rendered when broken across multiple lines, columns, or pages.
   *
   * **Syntax**: `slice | clone`
   *
   * **Initial value**: `slice`
   *
   * @deprecated
   */
  MozBackgroundInlinePolicy?: BoxDecorationBreakProperty;
  /**
   * The **`background-origin`** CSS property sets the _background positioning area_. In other words, it sets the origin position of an image set with the `background-image` property.
   *
   * **Syntax**: `<box>#`
   *
   * **Initial value**: `padding-box`
   *
   * @deprecated
   */
  MozBackgroundOrigin?: BackgroundOriginProperty;
  /**
   * The **`background-size`** CSS property sets the size of the element's background image. The image can be left to its natural size, stretched, or constrained to fit the available space.
   *
   * **Syntax**: `<bg-size>#`
   *
   * **Initial value**: `auto auto`
   *
   * @deprecated
   */
  MozBackgroundSize?: BackgroundSizeProperty<TLength>;
  /**
   * The **`-moz-binding`** CSS property is used by Mozilla-based applications to attach an XBL binding to a DOM element.
   *
   * **Syntax**: `<url> | none`
   *
   * **Initial value**: `none`
   *
   * @deprecated
   */
  MozBinding?: MozBindingProperty;
  /**
   * In Mozilla applications like Firefox, the **`-moz-border-bottom-colors`** CSS property sets a list of colors for the bottom border.
   *
   * **Syntax**: `<color>+ | none`
   *
   * **Initial value**: `none`
   *
   * @deprecated
   */
  MozBorderBottomColors?: MozBorderBottomColorsProperty;
  /**
   * In Mozilla applications like Firefox, the **`-moz-border-left-colors`** CSS property sets a list of colors for the left border.
   *
   * **Syntax**: `<color>+ | none`
   *
   * **Initial value**: `none`
   *
   * @deprecated
   */
  MozBorderLeftColors?: MozBorderLeftColorsProperty;
  /**
   * The **`border-radius`** CSS property rounds the corners of an element's outer border edge. You can set a single radius to make circular corners, or two radii to make elliptical corners.
   *
   * **Syntax**: `<length-percentage>{1,4} [ / <length-percentage>{1,4} ]?`
   *
   * @deprecated
   */
  MozBorderRadius?: BorderRadiusProperty<TLength>;
  /**
   * The **`border-bottom-left-radius`** CSS property rounds the bottom-left corner of an element.
   *
   * **Syntax**: `<length-percentage>{1,2}`
   *
   * **Initial value**: `0`
   *
   * @deprecated
   */
  MozBorderRadiusBottomleft?: BorderBottomLeftRadiusProperty<TLength>;
  /**
   * The **`border-bottom-right-radius`** CSS property rounds the bottom-right corner of an element.
   *
   * **Syntax**: `<length-percentage>{1,2}`
   *
   * **Initial value**: `0`
   *
   * @deprecated
   */
  MozBorderRadiusBottomright?: BorderBottomRightRadiusProperty<TLength>;
  /**
   * The **`border-top-left-radius`** CSS property rounds the top-left corner of an element.
   *
   * **Syntax**: `<length-percentage>{1,2}`
   *
   * **Initial value**: `0`
   *
   * @deprecated
   */
  MozBorderRadiusTopleft?: BorderTopLeftRadiusProperty<TLength>;
  /**
   * The **`border-top-right-radius`** CSS property rounds the top-right corner of an element.
   *
   * **Syntax**: `<length-percentage>{1,2}`
   *
   * **Initial value**: `0`
   *
   * @deprecated
   */
  MozBorderRadiusTopright?: BorderTopRightRadiusProperty<TLength>;
  /**
   * In Mozilla applications like Firefox, the **`-moz-border-right-colors`** CSS property sets a list of colors for the right border.
   *
   * **Syntax**: `<color>+ | none`
   *
   * **Initial value**: `none`
   *
   * @deprecated
   */
  MozBorderRightColors?: MozBorderRightColorsProperty;
  /**
   * In Mozilla applications like Firefox, the **`-moz-border-top-colors`** CSS property sets a list of colors for the top border.
   *
   * **Syntax**: `<color>+ | none`
   *
   * **Initial value**: `none`
   *
   * @deprecated
   */
  MozBorderTopColors?: MozBorderTopColorsProperty;
  /**
   * The **`box-align`** CSS property specifies how an element aligns its contents across its layout in a perpendicular direction. The effect of the property is only visible if there is extra space in the box.
   *
   * **Syntax**: `start | center | end | baseline | stretch`
   *
   * **Initial value**: `stretch`
   *
   * @deprecated
   */
  MozBoxAlign?: BoxAlignProperty;
  /**
   * The **`box-direction`** CSS property specifies whether a box lays out its contents normally (from the top or left edge), or in reverse (from the bottom or right edge).
   *
   * **Syntax**: `normal | reverse | inherit`
   *
   * **Initial value**: `normal`
   *
   * @deprecated
   */
  MozBoxDirection?: BoxDirectionProperty;
  /**
   * The **`-moz-box-flex`** and **`-webkit-box-flex`** CSS properties specify how a `-moz-box` or `-webkit-box` grows to fill the box that contains it, in the direction of the containing box's layout.
   *
   * **Syntax**: `<number>`
   *
   * **Initial value**: `0`
   *
   * @deprecated
   */
  MozBoxFlex?: GlobalsNumber;
  /**
   * The **`box-ordinal-group`** CSS property assigns the flexbox's child elements to an ordinal group.
   *
   * **Syntax**: `<integer>`
   *
   * **Initial value**: `1`
   *
   * @deprecated
   */
  MozBoxOrdinalGroup?: GlobalsNumber;
  /**
   * The **`box-orient`** CSS property specifies whether an element lays out its contents horizontally or vertically.
   *
   * **Syntax**: `horizontal | vertical | inline-axis | block-axis | inherit`
   *
   * **Initial value**: `inline-axis` (`horizontal` in XUL)
   *
   * @deprecated
   */
  MozBoxOrient?: BoxOrientProperty;
  /**
   * The **`-moz-box-pack`** and **`-webkit-box-pack`** CSS properties specify how a `-moz-box` or `-webkit-box` packs its contents in the direction of its layout. The effect of this is only visible if there is extra space in the box.
   *
   * **Syntax**: `start | center | end | justify`
   *
   * **Initial value**: `start`
   *
   * @deprecated
   */
  MozBoxPack?: BoxPackProperty;
  /**
   * The **`box-shadow`** CSS property adds shadow effects around an element's frame. You can set multiple effects separated by commas. A box shadow is described by X and Y offsets relative to the element, blur and spread radii, and color.
   *
   * **Syntax**: `none | <shadow>#`
   *
   * **Initial value**: `none`
   *
   * @deprecated
   */
  MozBoxShadow?: BoxShadowProperty;
  /**
   * The **`opacity`** CSS property sets the transparency of an element or the degree to which content behind an element is visible.
   *
   * **Syntax**: `<alpha-value>`
   *
   * **Initial value**: `1.0`
   *
   * @deprecated
   */
  MozOpacity?: OpacityProperty;
  /**
   * The **`outline`** CSS property is a shorthand to set various outline properties in a single declaration: `outline-style`, `outline-width`, and `outline-color`.
   *
   * **Syntax**: `[ <'outline-color'> || <'outline-style'> || <'outline-width'> ]`
   *
   * @deprecated
   */
  MozOutline?: OutlineProperty<TLength>;
  /**
   * The **`outline-color`** CSS property sets the color of an element's outline.
   *
   * **Syntax**: `<color> | invert`
   *
   * **Initial value**: `invert`, for browsers supporting it, `currentColor` for the other
   *
   * @deprecated
   */
  MozOutlineColor?: OutlineColorProperty;
  /**
   * In Mozilla applications like Firefox, the **`-moz-outline-radius`** CSS property can be used to give an element's `outline` rounded corners.
   *
   * **Syntax**: `<outline-radius>{1,4} [ / <outline-radius>{1,4} ]?`
   *
   * @deprecated
   */
  MozOutlineRadius?: MozOutlineRadiusProperty<TLength>;
  /**
   * The **`outline-style`** CSS property sets the style of an element's outline. An outline is a line that is drawn around an element, outside the `border`.
   *
   * **Syntax**: `auto | <'border-style'>`
   *
   * **Initial value**: `none`
   *
   * @deprecated
   */
  MozOutlineStyle?: OutlineStyleProperty;
  /**
   * The **`outline-width`** CSS property sets the thickness of an element's outline. An outline is a line that is drawn around an element, outside the `border`.
   *
   * **Syntax**: `<line-width>`
   *
   * **Initial value**: `medium`
   *
   * @deprecated
   */
  MozOutlineWidth?: OutlineWidthProperty<TLength>;
  /**
   * The **`text-align-last`** CSS property sets how the last line of a block or a line, right before a forced line break, is aligned.
   *
   * **Syntax**: `auto | start | end | left | right | center | justify`
   *
   * **Initial value**: `auto`
   *
   * @deprecated
   */
  MozTextAlignLast?: TextAlignLastProperty;
  /**
   * The **`-moz-text-blink`** non-standard Mozilla CSS extension specifies the blink mode.
   *
   * **Syntax**: `none | blink`
   *
   * **Initial value**: `none`
   *
   * @deprecated
   */
  MozTextBlink?: MozTextBlinkProperty;
  /**
   * The **`text-decoration-color`** CSS property sets the color of decorations added to text by `text-decoration-line`.
   *
   * **Syntax**: `<color>`
   *
   * **Initial value**: `currentcolor`
   *
   * @deprecated
   */
  MozTextDecorationColor?: TextDecorationColorProperty;
  /**
   * The **`text-decoration-line`** CSS property sets the kind of decoration that is used on text in an element, such as an underline or overline.
   *
   * **Syntax**: `none | [ underline || overline || line-through || blink ] | spelling-error | grammar-error`
   *
   * **Initial value**: `none`
   *
   * @deprecated
   */
  MozTextDecorationLine?: TextDecorationLineProperty;
  /**
   * The **`text-decoration-style`** CSS property sets the style of the lines specified by `text-decoration-line`. The style applies to all lines that are set with `text-decoration-line`.
   *
   * **Syntax**: `solid | double | dotted | dashed | wavy`
   *
   * **Initial value**: `solid`
   *
   * @deprecated
   */
  MozTextDecorationStyle?: TextDecorationStyleProperty;
  /**
   * In Mozilla applications, **`-moz-user-input`** determines if an element will accept user input.
   *
   * **Syntax**: `auto | none | enabled | disabled`
   *
   * **Initial value**: `auto`
   *
   * @deprecated
   */
  MozUserInput?: MozUserInputProperty;
  /**
   * The **`-moz-window-shadow`** CSS property specifies whether a window will have a shadow. It only works on Mac OS X.
   *
   * **Syntax**: `default | menu | tooltip | sheet | none`
   *
   * **Initial value**: `default`
   *
   * @deprecated
   */
  MozWindowShadow?: MozWindowShadowProperty;
  /**
   * The **`ime-mode`** CSS property controls the state of the input method editor (IME) for text fields. This property is obsolete.
   *
   * **Syntax**: `auto | normal | active | inactive | disabled`
   *
   * **Initial value**: `auto`
   *
   * @deprecated
   */
  msImeMode?: ImeModeProperty;
  /**
   * The **`-ms-scrollbar-track-color`** CSS property is a Microsoft extension that specifies the color of the track element of a scrollbar.
   *
   * **Syntax**: `<color>`
   *
   * **Initial value**: `Scrollbar`
   *
   * @deprecated
   */
  msScrollbarTrackColor?: MsScrollbarTrackColorProperty;
  /**
   * The **`animation`** shorthand CSS property sets an animated transition between styles. It is a shorthand for `animation-name`, `animation-duration`, `animation-timing-function`, `animation-delay`, `animation-iteration-count`, `animation-direction`, `animation-fill-mode`, and `animation-play-state`.
   *
   * **Syntax**: `<single-animation>#`
   *
   * @deprecated
   */
  OAnimation?: AnimationProperty;
  /**
   * The **`animation-delay`** CSS property sets when an animation starts. The animation can start later, immediately from its beginning, or immediately and partway through the animation.
   *
   * **Syntax**: `<time>#`
   *
   * **Initial value**: `0s`
   *
   * @deprecated
   */
  OAnimationDelay?: GlobalsString;
  /**
   * The **`animation-direction`** CSS property sets whether an animation should play forwards, backwards, or alternating back and forth.
   *
   * **Syntax**: `<single-animation-direction>#`
   *
   * **Initial value**: `normal`
   *
   * @deprecated
   */
  OAnimationDirection?: AnimationDirectionProperty;
  /**
   * The **`animation-duration`** CSS property sets the length of time that an animation takes to complete one cycle.
   *
   * **Syntax**: `<time>#`
   *
   * **Initial value**: `0s`
   *
   * @deprecated
   */
  OAnimationDuration?: GlobalsString;
  /**
   * The **`animation-fill-mode`** CSS property sets how a CSS animation applies styles to its target before and after its execution.
   *
   * **Syntax**: `<single-animation-fill-mode>#`
   *
   * **Initial value**: `none`
   *
   * @deprecated
   */
  OAnimationFillMode?: AnimationFillModeProperty;
  /**
   * The **`animation-iteration-count`** CSS property sets the number of times an animation cycle should be played before stopping.
   *
   * **Syntax**: `<single-animation-iteration-count>#`
   *
   * **Initial value**: `1`
   *
   * @deprecated
   */
  OAnimationIterationCount?: AnimationIterationCountProperty;
  /**
   * The **`animation-name`** CSS property sets one or more animations to apply to an element. Each name is an `@keyframes` at-rule that sets the property values for the animation sequence.
   *
   * **Syntax**: `[ none | <keyframes-name> ]#`
   *
   * **Initial value**: `none`
   *
   * @deprecated
   */
  OAnimationName?: AnimationNameProperty;
  /**
   * The **`animation-play-state`** CSS property sets whether an animation is running or paused.
   *
   * **Syntax**: `<single-animation-play-state>#`
   *
   * **Initial value**: `running`
   *
   * @deprecated
   */
  OAnimationPlayState?: AnimationPlayStateProperty;
  /**
   * The `**animation-timing-function**` CSS property sets how an animation progresses through the duration of each cycle.
   *
   * **Syntax**: `<timing-function>#`
   *
   * **Initial value**: `ease`
   *
   * @deprecated
   */
  OAnimationTimingFunction?: AnimationTimingFunctionProperty;
  /**
   * The **`background-size`** CSS property sets the size of the element's background image. The image can be left to its natural size, stretched, or constrained to fit the available space.
   *
   * **Syntax**: `<bg-size>#`
   *
   * **Initial value**: `auto auto`
   *
   * @deprecated
   */
  OBackgroundSize?: BackgroundSizeProperty<TLength>;
  /**
   * The **`border-image`** CSS property draws an image in place of an element's `border-style`.
   *
   * **Syntax**: `<'border-image-source'> || <'border-image-slice'> [ / <'border-image-width'> | / <'border-image-width'>? / <'border-image-outset'> ]? || <'border-image-repeat'>`
   *
   * @deprecated
   */
  OBorderImage?: BorderImageProperty;
  /**
   * The **`transform`** CSS property lets you rotate, scale, skew, or translate an element. It modifies the coordinate space of the CSS visual formatting model.
   *
   * **Syntax**: `none | <transform-list>`
   *
   * **Initial value**: `none`
   *
   * @deprecated
   */
  OTransform?: TransformProperty;
  /**
   * The **`transition`** CSS property is a shorthand property for `transition-property`, `transition-duration`, `transition-timing-function`, and `transition-delay`.
   *
   * **Syntax**: `<single-transition>#`
   *
   * @deprecated
   */
  OTransition?: TransitionProperty;
  /**
   * The **`transition-delay`** CSS property specifies the duration to wait before starting a property's transition effect when its value changes.
   *
   * **Syntax**: `<time>#`
   *
   * **Initial value**: `0s`
   *
   * @deprecated
   */
  OTransitionDelay?: GlobalsString;
  /**
   * The **`transition-duration`** CSS property sets the length of time a transition animation should take to complete. By default, the value is `0s`, meaning that no animation will occur.
   *
   * **Syntax**: `<time>#`
   *
   * **Initial value**: `0s`
   *
   * @deprecated
   */
  OTransitionDuration?: GlobalsString;
  /**
   * The **`transition-property`** CSS property sets the CSS properties to which a transition effect should be applied.
   *
   * **Syntax**: `none | <single-transition-property>#`
   *
   * **Initial value**: all
   *
   * @deprecated
   */
  OTransitionProperty?: TransitionPropertyProperty;
  /**
   * The **`transition-timing-function`** CSS property sets how intermediate values are calculated for CSS properties being affected by a transition effect.
   *
   * **Syntax**: `<timing-function>#`
   *
   * **Initial value**: `ease`
   *
   * @deprecated
   */
  OTransitionTimingFunction?: TransitionTimingFunctionProperty;
  /**
   * The **`box-align`** CSS property specifies how an element aligns its contents across its layout in a perpendicular direction. The effect of the property is only visible if there is extra space in the box.
   *
   * **Syntax**: `start | center | end | baseline | stretch`
   *
   * **Initial value**: `stretch`
   *
   * @deprecated
   */
  WebkitBoxAlign?: BoxAlignProperty;
  /**
   * The **`box-direction`** CSS property specifies whether a box lays out its contents normally (from the top or left edge), or in reverse (from the bottom or right edge).
   *
   * **Syntax**: `normal | reverse | inherit`
   *
   * **Initial value**: `normal`
   *
   * @deprecated
   */
  WebkitBoxDirection?: BoxDirectionProperty;
  /**
   * The **`-moz-box-flex`** and **`-webkit-box-flex`** CSS properties specify how a `-moz-box` or `-webkit-box` grows to fill the box that contains it, in the direction of the containing box's layout.
   *
   * **Syntax**: `<number>`
   *
   * **Initial value**: `0`
   *
   * @deprecated
   */
  WebkitBoxFlex?: GlobalsNumber;
  /**
   * The **`box-flex-group`** CSS property assigns the flexbox's child elements to a flex group.
   *
   * **Syntax**: `<integer>`
   *
   * **Initial value**: `1`
   *
   * @deprecated
   */
  WebkitBoxFlexGroup?: GlobalsNumber;
  /**
   * The **`box-lines`** CSS property determines whether the box may have a single or multiple lines (rows for horizontally oriented boxes, columns for vertically oriented boxes).
   *
   * **Syntax**: `single | multiple`
   *
   * **Initial value**: `single`
   *
   * @deprecated
   */
  WebkitBoxLines?: BoxLinesProperty;
  /**
   * The **`box-ordinal-group`** CSS property assigns the flexbox's child elements to an ordinal group.
   *
   * **Syntax**: `<integer>`
   *
   * **Initial value**: `1`
   *
   * @deprecated
   */
  WebkitBoxOrdinalGroup?: GlobalsNumber;
  /**
   * The **`box-orient`** CSS property specifies whether an element lays out its contents horizontally or vertically.
   *
   * **Syntax**: `horizontal | vertical | inline-axis | block-axis | inherit`
   *
   * **Initial value**: `inline-axis` (`horizontal` in XUL)
   *
   * @deprecated
   */
  WebkitBoxOrient?: BoxOrientProperty;
  /**
   * The **`-moz-box-pack`** and **`-webkit-box-pack`** CSS properties specify how a `-moz-box` or `-webkit-box` packs its contents in the direction of its layout. The effect of this is only visible if there is extra space in the box.
   *
   * **Syntax**: `start | center | end | justify`
   *
   * **Initial value**: `start`
   *
   * @deprecated
   */
  WebkitBoxPack?: BoxPackProperty;
  /**
   * The **`scroll-snap-points-x`** CSS property defines the horizontal positioning of snap points within the content of the scroll container they are applied to.
   *
   * **Syntax**: `none | repeat( <length-percentage> )`
   *
   * **Initial value**: `none`
   *
   * @deprecated
   */
  WebkitScrollSnapPointsX?: ScrollSnapPointsXProperty;
  /**
   * The **`scroll-snap-points-y`** CSS property defines the vertical positioning of snap points within the content of the scroll container they are applied to.
   *
   * **Syntax**: `none | repeat( <length-percentage> )`
   *
   * **Initial value**: `none`
   *
   * @deprecated
   */
  WebkitScrollSnapPointsY?: ScrollSnapPointsYProperty;
}

interface SvgProperties<TLength = string | 0> {
  alignmentBaseline?: AlignmentBaselineProperty;
  baselineShift?: BaselineShiftProperty<TLength>;
  clip?: ClipProperty;
  clipPath?: ClipPathProperty;
  clipRule?: ClipRuleProperty;
  color?: ColorProperty;
  colorInterpolation?: ColorInterpolationProperty;
  colorRendering?: ColorRenderingProperty;
  cursor?: CursorProperty;
  direction?: DirectionProperty;
  display?: DisplayProperty;
  dominantBaseline?: DominantBaselineProperty;
  fill?: FillProperty;
  fillOpacity?: GlobalsNumber;
  fillRule?: FillRuleProperty;
  filter?: FilterProperty;
  floodColor?: FloodColorProperty;
  floodOpacity?: GlobalsNumber;
  font?: FontProperty;
  fontFamily?: FontFamilyProperty;
  fontSize?: FontSizeProperty<TLength>;
  fontSizeAdjust?: FontSizeAdjustProperty;
  fontStretch?: FontStretchProperty;
  fontStyle?: FontStyleProperty;
  fontVariant?: FontVariantProperty;
  fontWeight?: FontWeightProperty;
  glyphOrientationVertical?: GlyphOrientationVerticalProperty;
  imageRendering?: ImageRenderingProperty;
  letterSpacing?: LetterSpacingProperty<TLength>;
  lightingColor?: LightingColorProperty;
  lineHeight?: LineHeightProperty<TLength>;
  marker?: MarkerProperty;
  markerEnd?: MarkerEndProperty;
  markerMid?: MarkerMidProperty;
  markerStart?: MarkerStartProperty;
  mask?: MaskProperty<TLength>;
  opacity?: OpacityProperty;
  overflow?: OverflowProperty;
  paintOrder?: PaintOrderProperty;
  pointerEvents?: PointerEventsProperty;
  shapeRendering?: ShapeRenderingProperty;
  stopColor?: StopColorProperty;
  stopOpacity?: GlobalsNumber;
  stroke?: StrokeProperty;
  strokeDasharray?: StrokeDasharrayProperty<TLength>;
  strokeDashoffset?: StrokeDashoffsetProperty<TLength>;
  strokeLinecap?: StrokeLinecapProperty;
  strokeLinejoin?: StrokeLinejoinProperty;
  strokeMiterlimit?: GlobalsNumber;
  strokeOpacity?: GlobalsNumber;
  strokeWidth?: StrokeWidthProperty<TLength>;
  textAnchor?: TextAnchorProperty;
  textDecoration?: TextDecorationProperty<TLength>;
  textRendering?: TextRenderingProperty;
  unicodeBidi?: UnicodeBidiProperty;
  vectorEffect?: VectorEffectProperty;
  visibility?: VisibilityProperty;
  whiteSpace?: WhiteSpaceProperty;
  wordSpacing?: WordSpacingProperty<TLength>;
  writingMode?: WritingModeProperty;
}

interface Properties<TLength = string | 0> extends StandardProperties<TLength>, VendorProperties<TLength>, ObsoleteProperties<TLength>, SvgProperties<TLength> {}

interface FontFace {
  MozFontFeatureSettings?: FontFaceFontFeatureSettingsProperty;
  fontDisplay?: FontFaceFontDisplayProperty;
  fontFamily?: string;
  fontFeatureSettings?: FontFaceFontFeatureSettingsProperty;
  fontStretch?: FontFaceFontStretchProperty;
  fontStyle?: FontFaceFontStyleProperty;
  fontVariant?: FontFaceFontVariantProperty;
  fontVariationSettings?: FontFaceFontVariationSettingsProperty;
  fontWeight?: FontFaceFontWeightProperty;
  src?: string;
  unicodeRange?: string;
}

type Globals = "-moz-initial" | "inherit" | "initial" | "revert" | "unset";

type GlobalsString = Globals | string;

type GlobalsNumber = Globals | number;

type AlignContentProperty = Globals | ContentDistribution | ContentPosition | "baseline" | "normal" | string;

type AlignItemsProperty = Globals | SelfPosition | "baseline" | "normal" | "stretch" | string;

type AlignSelfProperty = Globals | SelfPosition | "auto" | "baseline" | "normal" | "stretch" | string;

type AnimationProperty = Globals | SingleAnimation | string;

type AnimationDirectionProperty = Globals | SingleAnimationDirection | string;

type AnimationFillModeProperty = Globals | SingleAnimationFillMode | string;

type AnimationIterationCountProperty = Globals | "infinite" | string | number;

type AnimationNameProperty = Globals | "none" | string;

type AnimationPlayStateProperty = Globals | "paused" | "running" | string;

type AnimationTimingFunctionProperty = Globals | TimingFunction | string;

type AppearanceProperty = Globals | Compat | "button" | "none" | "textfield";

type AspectRatioProperty = Globals | "auto" | string;

type BackdropFilterProperty = Globals | "none" | string;

type BackfaceVisibilityProperty = Globals | "hidden" | "visible";

type BackgroundProperty<TLength> = Globals | FinalBgLayer<TLength> | string;

type BackgroundAttachmentProperty = Globals | Attachment | string;

type BackgroundBlendModeProperty = Globals | BlendMode | string;

type BackgroundClipProperty = Globals | Box | string;

type BackgroundColorProperty = Globals | Color;

type BackgroundImageProperty = Globals | "none" | string;

type BackgroundOriginProperty = Globals | Box | string;

type BackgroundPositionProperty<TLength> = Globals | BgPosition<TLength> | string;

type BackgroundPositionXProperty<TLength> = Globals | TLength | "center" | "left" | "right" | "x-end" | "x-start" | string;

type BackgroundPositionYProperty<TLength> = Globals | TLength | "bottom" | "center" | "top" | "y-end" | "y-start" | string;

type BackgroundRepeatProperty = Globals | RepeatStyle | string;

type BackgroundSizeProperty<TLength> = Globals | BgSize<TLength> | string;

type BlockOverflowProperty = Globals | "clip" | "ellipsis" | string;

type BlockSizeProperty<TLength> = Globals | TLength | "-moz-max-content" | "-moz-min-content" | "auto" | "max-content" | "min-content" | string;

type BorderProperty<TLength> = Globals | LineWidth<TLength> | LineStyle | Color | string;

type BorderBlockProperty<TLength> = Globals | LineWidth<TLength> | LineStyle | Color | string;

type BorderBlockColorProperty = Globals | Color | string;

type BorderBlockEndProperty<TLength> = Globals | LineWidth<TLength> | LineStyle | Color | string;

type BorderBlockEndColorProperty = Globals | Color;

type BorderBlockEndStyleProperty = Globals | LineStyle;

type BorderBlockEndWidthProperty<TLength> = Globals | LineWidth<TLength>;

type BorderBlockStartProperty<TLength> = Globals | LineWidth<TLength> | LineStyle | Color | string;

type BorderBlockStartColorProperty = Globals | Color;

type BorderBlockStartStyleProperty = Globals | LineStyle;

type BorderBlockStartWidthProperty<TLength> = Globals | LineWidth<TLength>;

type BorderBlockStyleProperty = Globals | LineStyle;

type BorderBlockWidthProperty<TLength> = Globals | LineWidth<TLength>;

type BorderBottomProperty<TLength> = Globals | LineWidth<TLength> | LineStyle | Color | string;

type BorderBottomColorProperty = Globals | Color;

type BorderBottomLeftRadiusProperty<TLength> = Globals | TLength | string;

type BorderBottomRightRadiusProperty<TLength> = Globals | TLength | string;

type BorderBottomStyleProperty = Globals | LineStyle;

type BorderBottomWidthProperty<TLength> = Globals | LineWidth<TLength>;

type BorderCollapseProperty = Globals | "collapse" | "separate";

type BorderColorProperty = Globals | Color | string;

type BorderEndEndRadiusProperty<TLength> = Globals | TLength | string;

type BorderEndStartRadiusProperty<TLength> = Globals | TLength | string;

type BorderImageProperty = Globals | "none" | "repeat" | "round" | "space" | "stretch" | string | number;

type BorderImageOutsetProperty<TLength> = Globals | TLength | string | number;

type BorderImageRepeatProperty = Globals | "repeat" | "round" | "space" | "stretch" | string;

type BorderImageSliceProperty = Globals | string | number;

type BorderImageSourceProperty = Globals | "none" | string;

type BorderImageWidthProperty<TLength> = Globals | TLength | "auto" | string | number;

type BorderInlineProperty<TLength> = Globals | LineWidth<TLength> | LineStyle | Color | string;

type BorderInlineColorProperty = Globals | Color | string;

type BorderInlineEndProperty<TLength> = Globals | LineWidth<TLength> | LineStyle | Color | string;

type BorderInlineEndColorProperty = Globals | Color;

type BorderInlineEndStyleProperty = Globals | LineStyle;

type BorderInlineEndWidthProperty<TLength> = Globals | LineWidth<TLength>;

type BorderInlineStartProperty<TLength> = Globals | LineWidth<TLength> | LineStyle | Color | string;

type BorderInlineStartColorProperty = Globals | Color;

type BorderInlineStartStyleProperty = Globals | LineStyle;

type BorderInlineStartWidthProperty<TLength> = Globals | LineWidth<TLength>;

type BorderInlineStyleProperty = Globals | LineStyle;

type BorderInlineWidthProperty<TLength> = Globals | LineWidth<TLength>;

type BorderLeftProperty<TLength> = Globals | LineWidth<TLength> | LineStyle | Color | string;

type BorderLeftColorProperty = Globals | Color;

type BorderLeftStyleProperty = Globals | LineStyle;

type BorderLeftWidthProperty<TLength> = Globals | LineWidth<TLength>;

type BorderRadiusProperty<TLength> = Globals | TLength | string;

type BorderRightProperty<TLength> = Globals | LineWidth<TLength> | LineStyle | Color | string;

type BorderRightColorProperty = Globals | Color;

type BorderRightStyleProperty = Globals | LineStyle;

type BorderRightWidthProperty<TLength> = Globals | LineWidth<TLength>;

type BorderSpacingProperty<TLength> = Globals | TLength | string;

type BorderStartEndRadiusProperty<TLength> = Globals | TLength | string;

type BorderStartStartRadiusProperty<TLength> = Globals | TLength | string;

type BorderStyleProperty = Globals | LineStyle | string;

type BorderTopProperty<TLength> = Globals | LineWidth<TLength> | LineStyle | Color | string;

type BorderTopColorProperty = Globals | Color;

type BorderTopLeftRadiusProperty<TLength> = Globals | TLength | string;

type BorderTopRightRadiusProperty<TLength> = Globals | TLength | string;

type BorderTopStyleProperty = Globals | LineStyle;

type BorderTopWidthProperty<TLength> = Globals | LineWidth<TLength>;

type BorderWidthProperty<TLength> = Globals | LineWidth<TLength> | string;

type BottomProperty<TLength> = Globals | TLength | "auto" | string;

type BoxAlignProperty = Globals | "baseline" | "center" | "end" | "start" | "stretch";

type BoxDecorationBreakProperty = Globals | "clone" | "slice";

type BoxDirectionProperty = Globals | "inherit" | "normal" | "reverse";

type BoxLinesProperty = Globals | "multiple" | "single";

type BoxOrientProperty = Globals | "block-axis" | "horizontal" | "inherit" | "inline-axis" | "vertical";

type BoxPackProperty = Globals | "center" | "end" | "justify" | "start";

type BoxShadowProperty = Globals | "none" | string;

type BoxSizingProperty = Globals | "border-box" | "content-box";

type BreakAfterProperty =
  | Globals
  | "all"
  | "always"
  | "auto"
  | "avoid"
  | "avoid-column"
  | "avoid-page"
  | "avoid-region"
  | "column"
  | "left"
  | "page"
  | "recto"
  | "region"
  | "right"
  | "verso";

type BreakBeforeProperty =
  | Globals
  | "all"
  | "always"
  | "auto"
  | "avoid"
  | "avoid-column"
  | "avoid-page"
  | "avoid-region"
  | "column"
  | "left"
  | "page"
  | "recto"
  | "region"
  | "right"
  | "verso";

type BreakInsideProperty = Globals | "auto" | "avoid" | "avoid-column" | "avoid-page" | "avoid-region";

type CaptionSideProperty = Globals | "block-end" | "block-start" | "bottom" | "inline-end" | "inline-start" | "top";

type CaretColorProperty = Globals | Color | "auto";

type ClearProperty = Globals | "both" | "inline-end" | "inline-start" | "left" | "none" | "right";

type ClipProperty = Globals | "auto" | string;

type ClipPathProperty = Globals | GeometryBox | "none" | string;

type ColorProperty = Globals | Color;

type ColorAdjustProperty = Globals | "economy" | "exact";

type ColumnCountProperty = Globals | "auto" | number;

type ColumnFillProperty = Globals | "auto" | "balance" | "balance-all";

type ColumnGapProperty<TLength> = Globals | TLength | "normal" | string;

type ColumnRuleProperty<TLength> = Globals | LineWidth<TLength> | LineStyle | Color | string;

type ColumnRuleColorProperty = Globals | Color;

type ColumnRuleStyleProperty = Globals | LineStyle | string;

type ColumnRuleWidthProperty<TLength> = Globals | LineWidth<TLength> | string;

type ColumnSpanProperty = Globals | "all" | "none";

type ColumnWidthProperty<TLength> = Globals | TLength | "auto";

type ColumnsProperty<TLength> = Globals | TLength | "auto" | string | number;

type ContainProperty = Globals | "content" | "layout" | "none" | "paint" | "size" | "strict" | "style" | string;

type ContentProperty = Globals | ContentList | "none" | "normal" | string;

type CounterIncrementProperty = Globals | "none" | string;

type CounterResetProperty = Globals | "none" | string;

type CounterSetProperty = Globals | "none" | string;

type CursorProperty =
  | Globals
  | "-moz-grab"
  | "-webkit-grab"
  | "alias"
  | "all-scroll"
  | "auto"
  | "cell"
  | "col-resize"
  | "context-menu"
  | "copy"
  | "crosshair"
  | "default"
  | "e-resize"
  | "ew-resize"
  | "grab"
  | "grabbing"
  | "help"
  | "move"
  | "n-resize"
  | "ne-resize"
  | "nesw-resize"
  | "no-drop"
  | "none"
  | "not-allowed"
  | "ns-resize"
  | "nw-resize"
  | "nwse-resize"
  | "pointer"
  | "progress"
  | "row-resize"
  | "s-resize"
  | "se-resize"
  | "sw-resize"
  | "text"
  | "vertical-text"
  | "w-resize"
  | "wait"
  | "zoom-in"
  | "zoom-out"
  | string;

type DirectionProperty = Globals | "ltr" | "rtl";

type DisplayProperty = Globals | DisplayOutside | DisplayInside | DisplayInternal | DisplayLegacy | "contents" | "list-item" | "none" | string;

type EmptyCellsProperty = Globals | "hide" | "show";

type FilterProperty = Globals | "none" | string;

type FlexProperty<TLength> = Globals | TLength | "auto" | "content" | "max-content" | "min-content" | "none" | string | number;

type FlexBasisProperty<TLength> = Globals | TLength | "-moz-max-content" | "-moz-min-content" | "-webkit-auto" | "auto" | "content" | "max-content" | "min-content" | string;

type FlexDirectionProperty = Globals | "column" | "column-reverse" | "row" | "row-reverse";

type FlexFlowProperty = Globals | "column" | "column-reverse" | "nowrap" | "row" | "row-reverse" | "wrap" | "wrap-reverse" | string;

type FlexWrapProperty = Globals | "nowrap" | "wrap" | "wrap-reverse";

type FloatProperty = Globals | "inline-end" | "inline-start" | "left" | "none" | "right";

type FontProperty = Globals | "caption" | "icon" | "menu" | "message-box" | "small-caption" | "status-bar" | string;

type FontFamilyProperty = Globals | GenericFamily | string;

type FontFeatureSettingsProperty = Globals | "normal" | string;

type FontKerningProperty = Globals | "auto" | "none" | "normal";

type FontLanguageOverrideProperty = Globals | "normal" | string;

type FontOpticalSizingProperty = Globals | "auto" | "none";

type FontSizeProperty<TLength> = Globals | AbsoluteSize | TLength | "larger" | "smaller" | string;

type FontSizeAdjustProperty = Globals | "none" | number;

type FontStretchProperty = Globals | FontStretchAbsolute;

type FontStyleProperty = Globals | "italic" | "normal" | "oblique" | string;

type FontSynthesisProperty = Globals | "none" | "style" | "weight" | string;

type FontVariantProperty =
  | Globals
  | EastAsianVariantValues
  | "all-petite-caps"
  | "all-small-caps"
  | "common-ligatures"
  | "contextual"
  | "diagonal-fractions"
  | "discretionary-ligatures"
  | "full-width"
  | "historical-forms"
  | "historical-ligatures"
  | "lining-nums"
  | "no-common-ligatures"
  | "no-contextual"
  | "no-discretionary-ligatures"
  | "no-historical-ligatures"
  | "none"
  | "normal"
  | "oldstyle-nums"
  | "ordinal"
  | "petite-caps"
  | "proportional-nums"
  | "proportional-width"
  | "ruby"
  | "slashed-zero"
  | "small-caps"
  | "stacked-fractions"
  | "tabular-nums"
  | "titling-caps"
  | "unicase"
  | string;

type FontVariantAlternatesProperty = Globals | "historical-forms" | "normal" | string;

type FontVariantCapsProperty = Globals | "all-petite-caps" | "all-small-caps" | "normal" | "petite-caps" | "small-caps" | "titling-caps" | "unicase";

type FontVariantEastAsianProperty = Globals | EastAsianVariantValues | "full-width" | "normal" | "proportional-width" | "ruby" | string;

type FontVariantLigaturesProperty =
  | Globals
  | "common-ligatures"
  | "contextual"
  | "discretionary-ligatures"
  | "historical-ligatures"
  | "no-common-ligatures"
  | "no-contextual"
  | "no-discretionary-ligatures"
  | "no-historical-ligatures"
  | "none"
  | "normal"
  | string;

type FontVariantNumericProperty =
  | Globals
  | "diagonal-fractions"
  | "lining-nums"
  | "normal"
  | "oldstyle-nums"
  | "ordinal"
  | "proportional-nums"
  | "slashed-zero"
  | "stacked-fractions"
  | "tabular-nums"
  | string;

type FontVariantPositionProperty = Globals | "normal" | "sub" | "super";

type FontVariationSettingsProperty = Globals | "normal" | string;

type FontWeightProperty = Globals | FontWeightAbsolute | "bolder" | "lighter";

type GapProperty<TLength> = Globals | TLength | "normal" | string;

type GridProperty = Globals | "none" | string;

type GridAreaProperty = Globals | GridLine | string;

type GridAutoColumnsProperty<TLength> = Globals | TrackBreadth<TLength> | string;

type GridAutoFlowProperty = Globals | "column" | "dense" | "row" | string;

type GridAutoRowsProperty<TLength> = Globals | TrackBreadth<TLength> | string;

type GridColumnProperty = Globals | GridLine | string;

type GridColumnEndProperty = Globals | GridLine;

type GridColumnGapProperty<TLength> = Globals | TLength | string;

type GridColumnStartProperty = Globals | GridLine;

type GridGapProperty<TLength> = Globals | TLength | string;

type GridRowProperty = Globals | GridLine | string;

type GridRowEndProperty = Globals | GridLine;

type GridRowGapProperty<TLength> = Globals | TLength | string;

type GridRowStartProperty = Globals | GridLine;

type GridTemplateProperty = Globals | "none" | string;

type GridTemplateAreasProperty = Globals | "none" | string;

type GridTemplateColumnsProperty<TLength> = Globals | TrackBreadth<TLength> | "none" | "subgrid" | string;

type GridTemplateRowsProperty<TLength> = Globals | TrackBreadth<TLength> | "none" | "subgrid" | string;

type HangingPunctuationProperty = Globals | "allow-end" | "first" | "force-end" | "last" | "none" | string;

type HeightProperty<TLength> = Globals | TLength | "-moz-max-content" | "-moz-min-content" | "auto" | "max-content" | "min-content" | string;

type HyphensProperty = Globals | "auto" | "manual" | "none";

type ImageOrientationProperty = Globals | "flip" | "from-image" | string;

type ImageRenderingProperty = Globals | "-moz-crisp-edges" | "-webkit-optimize-contrast" | "auto" | "crisp-edges" | "pixelated";

type ImageResolutionProperty = Globals | "from-image" | string;

type ImeModeProperty = Globals | "active" | "auto" | "disabled" | "inactive" | "normal";

type InitialLetterProperty = Globals | "normal" | string | number;

type InlineSizeProperty<TLength> = Globals | TLength | "-moz-max-content" | "-moz-min-content" | "auto" | "max-content" | "min-content" | string;

type InsetProperty<TLength> = Globals | TLength | "auto" | string;

type InsetBlockProperty<TLength> = Globals | TLength | "auto" | string;

type InsetBlockEndProperty<TLength> = Globals | TLength | "auto" | string;

type InsetBlockStartProperty<TLength> = Globals | TLength | "auto" | string;

type InsetInlineProperty<TLength> = Globals | TLength | "auto" | string;

type InsetInlineEndProperty<TLength> = Globals | TLength | "auto" | string;

type InsetInlineStartProperty<TLength> = Globals | TLength | "auto" | string;

type IsolationProperty = Globals | "auto" | "isolate";

type JustifyContentProperty = Globals | ContentDistribution | ContentPosition | "left" | "normal" | "right" | string;

type JustifyItemsProperty = Globals | SelfPosition | "baseline" | "left" | "legacy" | "normal" | "right" | "stretch" | string;

type JustifySelfProperty = Globals | SelfPosition | "auto" | "baseline" | "left" | "normal" | "right" | "stretch" | string;

type LeftProperty<TLength> = Globals | TLength | "auto" | string;

type LetterSpacingProperty<TLength> = Globals | TLength | "normal";

type LineBreakProperty = Globals | "anywhere" | "auto" | "loose" | "normal" | "strict";

type LineClampProperty = Globals | "none" | number;

type LineHeightProperty<TLength> = Globals | TLength | "normal" | string | number;

type LineHeightStepProperty<TLength> = Globals | TLength;

type ListStyleProperty = Globals | "inside" | "none" | "outside" | string;

type ListStyleImageProperty = Globals | "none" | string;

type ListStylePositionProperty = Globals | "inside" | "outside";

type ListStyleTypeProperty = Globals | "none" | string;

type MarginProperty<TLength> = Globals | TLength | "auto" | string;

type MarginBlockProperty<TLength> = Globals | TLength | "auto" | string;

type MarginBlockEndProperty<TLength> = Globals | TLength | "auto" | string;

type MarginBlockStartProperty<TLength> = Globals | TLength | "auto" | string;

type MarginBottomProperty<TLength> = Globals | TLength | "auto" | string;

type MarginInlineProperty<TLength> = Globals | TLength | "auto" | string;

type MarginInlineEndProperty<TLength> = Globals | TLength | "auto" | string;

type MarginInlineStartProperty<TLength> = Globals | TLength | "auto" | string;

type MarginLeftProperty<TLength> = Globals | TLength | "auto" | string;

type MarginRightProperty<TLength> = Globals | TLength | "auto" | string;

type MarginTopProperty<TLength> = Globals | TLength | "auto" | string;

type MaskProperty<TLength> = Globals | MaskLayer<TLength> | string;

type MaskBorderProperty = Globals | "alpha" | "luminance" | "none" | "repeat" | "round" | "space" | "stretch" | string | number;

type MaskBorderModeProperty = Globals | "alpha" | "luminance";

type MaskBorderOutsetProperty<TLength> = Globals | TLength | string | number;

type MaskBorderRepeatProperty = Globals | "repeat" | "round" | "space" | "stretch" | string;

type MaskBorderSliceProperty = Globals | string | number;

type MaskBorderSourceProperty = Globals | "none" | string;

type MaskBorderWidthProperty<TLength> = Globals | TLength | "auto" | string | number;

type MaskClipProperty = Globals | GeometryBox | "no-clip" | string;

type MaskCompositeProperty = Globals | CompositingOperator | string;

type MaskImageProperty = Globals | "none" | string;

type MaskModeProperty = Globals | MaskingMode | string;

type MaskOriginProperty = Globals | Box | "margin-box" | string;

type MaskPositionProperty<TLength> = Globals | Position<TLength> | string;

type MaskRepeatProperty = Globals | RepeatStyle | string;

type MaskSizeProperty<TLength> = Globals | BgSize<TLength> | string;

type MaskTypeProperty = Globals | "alpha" | "luminance";

type MaxBlockSizeProperty<TLength> = Globals | TLength | "-moz-max-content" | "-moz-min-content" | "auto" | "max-content" | "min-content" | string;

type MaxHeightProperty<TLength> =
  | Globals
  | TLength
  | "-moz-max-content"
  | "-moz-min-content"
  | "-webkit-max-content"
  | "-webkit-min-content"
  | "auto"
  | "max-content"
  | "min-content"
  | string;

type MaxInlineSizeProperty<TLength> = Globals | TLength | "-moz-max-content" | "-moz-min-content" | "auto" | "max-content" | "min-content" | string;

type MaxLinesProperty = Globals | "none" | number;

type MaxWidthProperty<TLength> =
  | Globals
  | TLength
  | "-moz-max-content"
  | "-moz-min-content"
  | "-webkit-max-content"
  | "-webkit-min-content"
  | "auto"
  | "intrinsic"
  | "max-content"
  | "min-content"
  | string;

type MinBlockSizeProperty<TLength> = Globals | TLength | "-moz-max-content" | "-moz-min-content" | "auto" | "max-content" | "min-content" | string;

type MinHeightProperty<TLength> =
  | Globals
  | TLength
  | "-moz-max-content"
  | "-moz-min-content"
  | "-webkit-max-content"
  | "-webkit-min-content"
  | "auto"
  | "max-content"
  | "min-content"
  | string;

type MinInlineSizeProperty<TLength> = Globals | TLength | "-moz-max-content" | "-moz-min-content" | "auto" | "max-content" | "min-content" | string;

type MinWidthProperty<TLength> =
  | Globals
  | TLength
  | "-moz-max-content"
  | "-moz-min-content"
  | "-webkit-max-content"
  | "-webkit-min-content"
  | "auto"
  | "intrinsic"
  | "max-content"
  | "min-content"
  | "min-intrinsic"
  | string;

type MixBlendModeProperty = Globals | BlendMode;

type OffsetProperty<TLength> = Globals | Position<TLength> | GeometryBox | "auto" | "none" | string;

type OffsetDistanceProperty<TLength> = Globals | TLength | string;

type OffsetPathProperty = Globals | GeometryBox | "none" | string;

type OffsetRotateProperty = Globals | "auto" | "reverse" | string;

type ObjectFitProperty = Globals | "contain" | "cover" | "fill" | "none" | "scale-down";

type ObjectPositionProperty<TLength> = Globals | Position<TLength>;

type OffsetAnchorProperty<TLength> = Globals | Position<TLength> | "auto";

type OpacityProperty = Globals | string | number;

type OutlineProperty<TLength> = Globals | Color | LineStyle | LineWidth<TLength> | "auto" | "invert" | string;

type OutlineColorProperty = Globals | Color | "invert";

type OutlineOffsetProperty<TLength> = Globals | TLength;

type OutlineStyleProperty = Globals | LineStyle | "auto" | string;

type OutlineWidthProperty<TLength> = Globals | LineWidth<TLength>;

type OverflowProperty = Globals | "auto" | "hidden" | "scroll" | "visible" | string;

type OverflowAnchorProperty = Globals | "auto" | "none";

type OverflowBlockProperty = Globals | "auto" | "clip" | "hidden" | "scroll" | "visible";

type OverflowClipBoxProperty = Globals | "content-box" | "padding-box";

type OverflowInlineProperty = Globals | "auto" | "clip" | "hidden" | "scroll" | "visible";

type OverflowWrapProperty = Globals | "anywhere" | "break-word" | "normal";

type OverflowXProperty = Globals | "auto" | "hidden" | "scroll" | "visible";

type OverflowYProperty = Globals | "auto" | "hidden" | "scroll" | "visible";

type OverscrollBehaviorProperty = Globals | "auto" | "contain" | "none" | string;

type OverscrollBehaviorBlockProperty = Globals | "auto" | "contain" | "none";

type OverscrollBehaviorInlineProperty = Globals | "auto" | "contain" | "none";

type OverscrollBehaviorXProperty = Globals | "auto" | "contain" | "none";

type OverscrollBehaviorYProperty = Globals | "auto" | "contain" | "none";

type PaddingProperty<TLength> = Globals | TLength | string;

type PaddingBlockProperty<TLength> = Globals | TLength | string;

type PaddingBlockEndProperty<TLength> = Globals | TLength | string;

type PaddingBlockStartProperty<TLength> = Globals | TLength | string;

type PaddingBottomProperty<TLength> = Globals | TLength | string;

type PaddingInlineProperty<TLength> = Globals | TLength | string;

type PaddingInlineEndProperty<TLength> = Globals | TLength | string;

type PaddingInlineStartProperty<TLength> = Globals | TLength | string;

type PaddingLeftProperty<TLength> = Globals | TLength | string;

type PaddingRightProperty<TLength> = Globals | TLength | string;

type PaddingTopProperty<TLength> = Globals | TLength | string;

type PageBreakAfterProperty = Globals | "always" | "auto" | "avoid" | "left" | "recto" | "right" | "verso";

type PageBreakBeforeProperty = Globals | "always" | "auto" | "avoid" | "left" | "recto" | "right" | "verso";

type PageBreakInsideProperty = Globals | "auto" | "avoid";

type PaintOrderProperty = Globals | "fill" | "markers" | "normal" | "stroke" | string;

type PerspectiveProperty<TLength> = Globals | TLength | "none";

type PerspectiveOriginProperty<TLength> = Globals | Position<TLength>;

type PlaceContentProperty = Globals | ContentDistribution | ContentPosition | "baseline" | "normal" | string;

type PlaceItemsProperty = Globals | SelfPosition | "baseline" | "normal" | "stretch" | string;

type PlaceSelfProperty = Globals | SelfPosition | "auto" | "baseline" | "normal" | "stretch" | string;

type PointerEventsProperty = Globals | "all" | "auto" | "fill" | "inherit" | "none" | "painted" | "stroke" | "visible" | "visibleFill" | "visiblePainted" | "visibleStroke";

type PositionProperty = Globals | "-webkit-sticky" | "absolute" | "fixed" | "relative" | "static" | "sticky";

type QuotesProperty = Globals | "auto" | "none" | string;

type ResizeProperty = Globals | "block" | "both" | "horizontal" | "inline" | "none" | "vertical";

type RightProperty<TLength> = Globals | TLength | "auto" | string;

type RotateProperty = Globals | "none" | string;

type RowGapProperty<TLength> = Globals | TLength | "normal" | string;

type RubyAlignProperty = Globals | "center" | "space-around" | "space-between" | "start";

type RubyMergeProperty = Globals | "auto" | "collapse" | "separate";

type RubyPositionProperty = Globals | "over" | "under";

type ScaleProperty = Globals | "none" | string | number;

type ScrollBehaviorProperty = Globals | "auto" | "smooth";

type ScrollMarginProperty<TLength> = Globals | TLength | string;

type ScrollMarginBlockProperty<TLength> = Globals | TLength | string;

type ScrollMarginBlockEndProperty<TLength> = Globals | TLength;

type ScrollMarginBlockStartProperty<TLength> = Globals | TLength;

type ScrollMarginBottomProperty<TLength> = Globals | TLength;

type ScrollMarginInlineProperty<TLength> = Globals | TLength | string;

type ScrollMarginInlineEndProperty<TLength> = Globals | TLength;

type ScrollMarginInlineStartProperty<TLength> = Globals | TLength;

type ScrollMarginLeftProperty<TLength> = Globals | TLength;

type ScrollMarginRightProperty<TLength> = Globals | TLength;

type ScrollMarginTopProperty<TLength> = Globals | TLength;

type ScrollPaddingProperty<TLength> = Globals | TLength | "auto" | string;

type ScrollPaddingBlockProperty<TLength> = Globals | TLength | "auto" | string;

type ScrollPaddingBlockEndProperty<TLength> = Globals | TLength | "auto" | string;

type ScrollPaddingBlockStartProperty<TLength> = Globals | TLength | "auto" | string;

type ScrollPaddingBottomProperty<TLength> = Globals | TLength | "auto" | string;

type ScrollPaddingInlineProperty<TLength> = Globals | TLength | "auto" | string;

type ScrollPaddingInlineEndProperty<TLength> = Globals | TLength | "auto" | string;

type ScrollPaddingInlineStartProperty<TLength> = Globals | TLength | "auto" | string;

type ScrollPaddingLeftProperty<TLength> = Globals | TLength | "auto" | string;

type ScrollPaddingRightProperty<TLength> = Globals | TLength | "auto" | string;

type ScrollPaddingTopProperty<TLength> = Globals | TLength | "auto" | string;

type ScrollSnapAlignProperty = Globals | "center" | "end" | "none" | "start" | string;

type ScrollSnapCoordinateProperty<TLength> = Globals | Position<TLength> | "none" | string;

type ScrollSnapDestinationProperty<TLength> = Globals | Position<TLength>;

type ScrollSnapPointsXProperty = Globals | "none" | string;

type ScrollSnapPointsYProperty = Globals | "none" | string;

type ScrollSnapStopProperty = Globals | "always" | "normal";

type ScrollSnapTypeProperty = Globals | "block" | "both" | "inline" | "none" | "x" | "y" | string;

type ScrollSnapTypeXProperty = Globals | "mandatory" | "none" | "proximity";

type ScrollSnapTypeYProperty = Globals | "mandatory" | "none" | "proximity";

type ScrollbarColorProperty = Globals | Color | "auto" | "dark" | "light";

type MsScrollbarTrackColorProperty = Globals | Color;

type ScrollbarWidthProperty = Globals | "auto" | "none" | "thin";

type ShapeImageThresholdProperty = Globals | string | number;

type ShapeMarginProperty<TLength> = Globals | TLength | string;

type ShapeOutsideProperty = Globals | Box | "margin-box" | "none" | string;

type TabSizeProperty<TLength> = Globals | TLength | number;

type TableLayoutProperty = Globals | "auto" | "fixed";

type TextAlignProperty = Globals | "center" | "end" | "justify" | "left" | "match-parent" | "right" | "start";

type TextAlignLastProperty = Globals | "auto" | "center" | "end" | "justify" | "left" | "right" | "start";

type TextCombineUprightProperty = Globals | "all" | "digits" | "none" | string;

type TextDecorationProperty<TLength> =
  | Globals
  | Color
  | TLength
  | "auto"
  | "blink"
  | "dashed"
  | "dotted"
  | "double"
  | "from-font"
  | "grammar-error"
  | "line-through"
  | "none"
  | "overline"
  | "solid"
  | "spelling-error"
  | "underline"
  | "wavy"
  | string;

type TextDecorationColorProperty = Globals | Color;

type TextDecorationLineProperty = Globals | "blink" | "grammar-error" | "line-through" | "none" | "overline" | "spelling-error" | "underline" | string;

type TextDecorationSkipProperty = Globals | "box-decoration" | "edges" | "leading-spaces" | "none" | "objects" | "spaces" | "trailing-spaces" | string;

type TextDecorationSkipInkProperty = Globals | "all" | "auto" | "none";

type TextDecorationStyleProperty = Globals | "dashed" | "dotted" | "double" | "solid" | "wavy";

type TextDecorationThicknessProperty<TLength> = Globals | TLength | "auto" | "from-font" | string;

type TextEmphasisProperty = Globals | Color | "circle" | "dot" | "double-circle" | "filled" | "none" | "open" | "sesame" | "triangle" | string;

type TextEmphasisColorProperty = Globals | Color;

type TextEmphasisStyleProperty = Globals | "circle" | "dot" | "double-circle" | "filled" | "none" | "open" | "sesame" | "triangle" | string;

type TextIndentProperty<TLength> = Globals | TLength | string;

type TextJustifyProperty = Globals | "auto" | "inter-character" | "inter-word" | "none";

type TextOrientationProperty = Globals | "mixed" | "sideways" | "upright";

type TextOverflowProperty = Globals | "clip" | "ellipsis" | string;

type TextRenderingProperty = Globals | "auto" | "geometricPrecision" | "optimizeLegibility" | "optimizeSpeed";

type TextShadowProperty = Globals | "none" | string;

type TextSizeAdjustProperty = Globals | "auto" | "none" | string;

type TextTransformProperty = Globals | "capitalize" | "full-size-kana" | "full-width" | "lowercase" | "none" | "uppercase";

type TextUnderlineOffsetProperty<TLength> = Globals | TLength | "auto" | "from-font" | string;

type TextUnderlinePositionProperty = Globals | "auto" | "from-font" | "left" | "right" | "under" | string;

type TopProperty<TLength> = Globals | TLength | "auto" | string;

type TouchActionProperty =
  | Globals
  | "-ms-manipulation"
  | "-ms-none"
  | "-ms-pinch-zoom"
  | "auto"
  | "manipulation"
  | "none"
  | "pan-down"
  | "pan-left"
  | "pan-right"
  | "pan-up"
  | "pan-x"
  | "pan-y"
  | "pinch-zoom"
  | string;

type TransformProperty = Globals | "none" | string;

type TransformBoxProperty = Globals | "border-box" | "fill-box" | "view-box";

type TransformOriginProperty<TLength> = Globals | TLength | "bottom" | "center" | "left" | "right" | "top" | string;

type TransformStyleProperty = Globals | "flat" | "preserve-3d";

type TransitionProperty = Globals | SingleTransition | string;

type TransitionPropertyProperty = Globals | "all" | "none" | string;

type TransitionTimingFunctionProperty = Globals | TimingFunction | string;

type TranslateProperty<TLength> = Globals | TLength | "none" | string;

type UnicodeBidiProperty =
  | Globals
  | "-moz-isolate"
  | "-moz-isolate-override"
  | "-moz-plaintext"
  | "-webkit-isolate"
  | "bidi-override"
  | "embed"
  | "isolate"
  | "isolate-override"
  | "normal"
  | "plaintext";

type UserSelectProperty = Globals | "-moz-none" | "all" | "auto" | "contain" | "element" | "none" | "text";

type VerticalAlignProperty<TLength> = Globals | TLength | "baseline" | "bottom" | "middle" | "sub" | "super" | "text-bottom" | "text-top" | "top" | string;

type VisibilityProperty = Globals | "collapse" | "hidden" | "visible";

type WhiteSpaceProperty = Globals | "-moz-pre-wrap" | "break-spaces" | "normal" | "nowrap" | "pre" | "pre-line" | "pre-wrap";

type WidthProperty<TLength> =
  | Globals
  | TLength
  | "-moz-max-content"
  | "-moz-min-content"
  | "-webkit-max-content"
  | "auto"
  | "intrinsic"
  | "max-content"
  | "min-content"
  | "min-intrinsic"
  | string;

type WillChangeProperty = Globals | AnimateableFeature | "auto" | string;

type WordBreakProperty = Globals | "break-all" | "break-word" | "keep-all" | "normal";

type WordSpacingProperty<TLength> = Globals | TLength | "normal" | string;

type WordWrapProperty = Globals | "break-word" | "normal";

type WritingModeProperty = Globals | "horizontal-tb" | "sideways-lr" | "sideways-rl" | "vertical-lr" | "vertical-rl";

type ZIndexProperty = Globals | "auto" | number;

type ZoomProperty = Globals | "normal" | "reset" | string | number;

type MozAppearanceProperty =
  | Globals
  | "-moz-mac-unified-toolbar"
  | "-moz-win-borderless-glass"
  | "-moz-win-browsertabbar-toolbox"
  | "-moz-win-communications-toolbox"
  | "-moz-win-communicationstext"
  | "-moz-win-exclude-glass"
  | "-moz-win-glass"
  | "-moz-win-media-toolbox"
  | "-moz-win-mediatext"
  | "-moz-window-button-box"
  | "-moz-window-button-box-maximized"
  | "-moz-window-button-close"
  | "-moz-window-button-maximize"
  | "-moz-window-button-minimize"
  | "-moz-window-button-restore"
  | "-moz-window-frame-bottom"
  | "-moz-window-frame-left"
  | "-moz-window-frame-right"
  | "-moz-window-titlebar"
  | "-moz-window-titlebar-maximized"
  | "button"
  | "button-arrow-down"
  | "button-arrow-next"
  | "button-arrow-previous"
  | "button-arrow-up"
  | "button-bevel"
  | "button-focus"
  | "caret"
  | "checkbox"
  | "checkbox-container"
  | "checkbox-label"
  | "checkmenuitem"
  | "dualbutton"
  | "groupbox"
  | "listbox"
  | "listitem"
  | "menuarrow"
  | "menubar"
  | "menucheckbox"
  | "menuimage"
  | "menuitem"
  | "menuitemtext"
  | "menulist"
  | "menulist-button"
  | "menulist-text"
  | "menulist-textfield"
  | "menupopup"
  | "menuradio"
  | "menuseparator"
  | "meterbar"
  | "meterchunk"
  | "none"
  | "progressbar"
  | "progressbar-vertical"
  | "progresschunk"
  | "progresschunk-vertical"
  | "radio"
  | "radio-container"
  | "radio-label"
  | "radiomenuitem"
  | "range"
  | "range-thumb"
  | "resizer"
  | "resizerpanel"
  | "scale-horizontal"
  | "scale-vertical"
  | "scalethumb-horizontal"
  | "scalethumb-vertical"
  | "scalethumbend"
  | "scalethumbstart"
  | "scalethumbtick"
  | "scrollbarbutton-down"
  | "scrollbarbutton-left"
  | "scrollbarbutton-right"
  | "scrollbarbutton-up"
  | "scrollbarthumb-horizontal"
  | "scrollbarthumb-vertical"
  | "scrollbartrack-horizontal"
  | "scrollbartrack-vertical"
  | "searchfield"
  | "separator"
  | "sheet"
  | "spinner"
  | "spinner-downbutton"
  | "spinner-textfield"
  | "spinner-upbutton"
  | "splitter"
  | "statusbar"
  | "statusbarpanel"
  | "tab"
  | "tab-scroll-arrow-back"
  | "tab-scroll-arrow-forward"
  | "tabpanel"
  | "tabpanels"
  | "textfield"
  | "textfield-multiline"
  | "toolbar"
  | "toolbarbutton"
  | "toolbarbutton-dropdown"
  | "toolbargripper"
  | "toolbox"
  | "tooltip"
  | "treeheader"
  | "treeheadercell"
  | "treeheadersortarrow"
  | "treeitem"
  | "treeline"
  | "treetwisty"
  | "treetwistyopen"
  | "treeview";

type MozBindingProperty = Globals | "none" | string;

type MozBorderBottomColorsProperty = Globals | Color | "none" | string;

type MozBorderLeftColorsProperty = Globals | Color | "none" | string;

type MozBorderRightColorsProperty = Globals | Color | "none" | string;

type MozBorderTopColorsProperty = Globals | Color | "none" | string;

type MozContextPropertiesProperty = Globals | "fill" | "fill-opacity" | "none" | "stroke" | "stroke-opacity" | string;

type MozFloatEdgeProperty = Globals | "border-box" | "content-box" | "margin-box" | "padding-box";

type MozImageRegionProperty = Globals | "auto" | string;

type MozOrientProperty = Globals | "block" | "horizontal" | "inline" | "vertical";

type MozOutlineRadiusProperty<TLength> = Globals | TLength | string;

type MozOutlineRadiusBottomleftProperty<TLength> = Globals | TLength | string;

type MozOutlineRadiusBottomrightProperty<TLength> = Globals | TLength | string;

type MozOutlineRadiusTopleftProperty<TLength> = Globals | TLength | string;

type MozOutlineRadiusToprightProperty<TLength> = Globals | TLength | string;

type MozStackSizingProperty = Globals | "ignore" | "stretch-to-fit";

type MozTextBlinkProperty = Globals | "blink" | "none";

type MozUserFocusProperty = Globals | "ignore" | "none" | "normal" | "select-after" | "select-all" | "select-before" | "select-menu" | "select-same";

type MozUserInputProperty = Globals | "auto" | "disabled" | "enabled" | "none";

type MozUserModifyProperty = Globals | "read-only" | "read-write" | "write-only";

type MozWindowDraggingProperty = Globals | "drag" | "no-drag";

type MozWindowShadowProperty = Globals | "default" | "menu" | "none" | "sheet" | "tooltip";

type MsAcceleratorProperty = Globals | "false" | "true";

type MsBlockProgressionProperty = Globals | "bt" | "lr" | "rl" | "tb";

type MsContentZoomChainingProperty = Globals | "chained" | "none";

type MsContentZoomSnapProperty = Globals | "mandatory" | "none" | "proximity" | string;

type MsContentZoomSnapTypeProperty = Globals | "mandatory" | "none" | "proximity";

type MsContentZoomingProperty = Globals | "none" | "zoom";

type MsFlowFromProperty = Globals | "none" | string;

type MsFlowIntoProperty = Globals | "none" | string;

type MsHighContrastAdjustProperty = Globals | "auto" | "none";

type MsHyphenateLimitCharsProperty = Globals | "auto" | string | number;

type MsHyphenateLimitLinesProperty = Globals | "no-limit" | number;

type MsHyphenateLimitZoneProperty<TLength> = Globals | TLength | string;

type MsImeAlignProperty = Globals | "after" | "auto";

type MsOverflowStyleProperty = Globals | "-ms-autohiding-scrollbar" | "auto" | "none" | "scrollbar";

type MsScrollChainingProperty = Globals | "chained" | "none";

type MsScrollLimitXMaxProperty<TLength> = Globals | TLength | "auto";

type MsScrollLimitXMinProperty<TLength> = Globals | TLength;

type MsScrollLimitYMaxProperty<TLength> = Globals | TLength | "auto";

type MsScrollLimitYMinProperty<TLength> = Globals | TLength;

type MsScrollRailsProperty = Globals | "none" | "railed";

type MsScrollSnapTypeProperty = Globals | "mandatory" | "none" | "proximity";

type MsScrollTranslationProperty = Globals | "none" | "vertical-to-horizontal";

type MsScrollbar3dlightColorProperty = Globals | Color;

type MsScrollbarArrowColorProperty = Globals | Color;

type MsScrollbarBaseColorProperty = Globals | Color;

type MsScrollbarDarkshadowColorProperty = Globals | Color;

type MsScrollbarFaceColorProperty = Globals | Color;

type MsScrollbarHighlightColorProperty = Globals | Color;

type MsScrollbarShadowColorProperty = Globals | Color;

type MsTextAutospaceProperty = Globals | "ideograph-alpha" | "ideograph-numeric" | "ideograph-parenthesis" | "ideograph-space" | "none";

type MsTouchSelectProperty = Globals | "grippers" | "none";

type MsUserSelectProperty = Globals | "element" | "none" | "text";

type MsWrapFlowProperty = Globals | "auto" | "both" | "clear" | "end" | "maximum" | "start";

type MsWrapMarginProperty<TLength> = Globals | TLength;

type MsWrapThroughProperty = Globals | "none" | "wrap";

type WebkitAppearanceProperty =
  | Globals
  | "button"
  | "button-bevel"
  | "caret"
  | "checkbox"
  | "default-button"
  | "inner-spin-button"
  | "listbox"
  | "listitem"
  | "media-controls-background"
  | "media-controls-fullscreen-background"
  | "media-current-time-display"
  | "media-enter-fullscreen-button"
  | "media-exit-fullscreen-button"
  | "media-fullscreen-button"
  | "media-mute-button"
  | "media-overlay-play-button"
  | "media-play-button"
  | "media-seek-back-button"
  | "media-seek-forward-button"
  | "media-slider"
  | "media-sliderthumb"
  | "media-time-remaining-display"
  | "media-toggle-closed-captions-button"
  | "media-volume-slider"
  | "media-volume-slider-container"
  | "media-volume-sliderthumb"
  | "menulist"
  | "menulist-button"
  | "menulist-text"
  | "menulist-textfield"
  | "meter"
  | "none"
  | "progress-bar"
  | "progress-bar-value"
  | "push-button"
  | "radio"
  | "searchfield"
  | "searchfield-cancel-button"
  | "searchfield-decoration"
  | "searchfield-results-button"
  | "searchfield-results-decoration"
  | "slider-horizontal"
  | "slider-vertical"
  | "sliderthumb-horizontal"
  | "sliderthumb-vertical"
  | "square-button"
  | "textarea"
  | "textfield";

type WebkitBorderBeforeProperty<TLength> = Globals | LineWidth<TLength> | LineStyle | Color | string;

type WebkitBorderBeforeColorProperty = Globals | Color;

type WebkitBorderBeforeStyleProperty = Globals | LineStyle | string;

type WebkitBorderBeforeWidthProperty<TLength> = Globals | LineWidth<TLength> | string;

type WebkitBoxReflectProperty<TLength> = Globals | TLength | "above" | "below" | "left" | "right" | string;

type WebkitLineClampProperty = Globals | "none" | number;

type WebkitMaskProperty<TLength> = Globals | Position<TLength> | RepeatStyle | Box | "border" | "content" | "none" | "padding" | "text" | string;

type WebkitMaskAttachmentProperty = Globals | Attachment | string;

type WebkitMaskClipProperty = Globals | Box | "border" | "content" | "padding" | "text" | string;

type WebkitMaskCompositeProperty = Globals | CompositeStyle | string;

type WebkitMaskImageProperty = Globals | "none" | string;

type WebkitMaskOriginProperty = Globals | Box | "border" | "content" | "padding" | string;

type WebkitMaskPositionProperty<TLength> = Globals | Position<TLength> | string;

type WebkitMaskPositionXProperty<TLength> = Globals | TLength | "center" | "left" | "right" | string;

type WebkitMaskPositionYProperty<TLength> = Globals | TLength | "bottom" | "center" | "top" | string;

type WebkitMaskRepeatProperty = Globals | RepeatStyle | string;

type WebkitMaskRepeatXProperty = Globals | "no-repeat" | "repeat" | "round" | "space";

type WebkitMaskRepeatYProperty = Globals | "no-repeat" | "repeat" | "round" | "space";

type WebkitMaskSizeProperty<TLength> = Globals | BgSize<TLength> | string;

type WebkitOverflowScrollingProperty = Globals | "auto" | "touch";

type WebkitTapHighlightColorProperty = Globals | Color;

type WebkitTextFillColorProperty = Globals | Color;

type WebkitTextStrokeProperty<TLength> = Globals | Color | TLength | string;

type WebkitTextStrokeColorProperty = Globals | Color;

type WebkitTextStrokeWidthProperty<TLength> = Globals | TLength;

type WebkitTouchCalloutProperty = Globals | "default" | "none";

type WebkitUserModifyProperty = Globals | "read-only" | "read-write" | "read-write-plaintext-only";

type AlignmentBaselineProperty =
  | Globals
  | "after-edge"
  | "alphabetic"
  | "auto"
  | "baseline"
  | "before-edge"
  | "central"
  | "hanging"
  | "ideographic"
  | "mathematical"
  | "middle"
  | "text-after-edge"
  | "text-before-edge";

type BaselineShiftProperty<TLength> = Globals | TLength | "baseline" | "sub" | "super" | string;

type ClipRuleProperty = Globals | "evenodd" | "nonzero";

type ColorInterpolationProperty = Globals | "auto" | "linearRGB" | "sRGB";

type ColorRenderingProperty = Globals | "auto" | "optimizeQuality" | "optimizeSpeed";

type DominantBaselineProperty =
  | Globals
  | "alphabetic"
  | "auto"
  | "central"
  | "hanging"
  | "ideographic"
  | "mathematical"
  | "middle"
  | "no-change"
  | "reset-size"
  | "text-after-edge"
  | "text-before-edge"
  | "use-script";

type FillProperty = Globals | Paint;

type FillRuleProperty = Globals | "evenodd" | "nonzero";

type FloodColorProperty = Globals | Color | "currentColor";

type GlyphOrientationVerticalProperty = Globals | "auto" | string | number;

type LightingColorProperty = Globals | Color | "currentColor";

type MarkerProperty = Globals | "none" | string;

type MarkerEndProperty = Globals | "none" | string;

type MarkerMidProperty = Globals | "none" | string;

type MarkerStartProperty = Globals | "none" | string;

type ShapeRenderingProperty = Globals | "auto" | "crispEdges" | "geometricPrecision" | "optimizeSpeed";

type StopColorProperty = Globals | Color | "currentColor";

type StrokeProperty = Globals | Paint;

type StrokeDasharrayProperty<TLength> = Globals | Dasharray<TLength> | "none";

type StrokeDashoffsetProperty<TLength> = Globals | TLength | string;

type StrokeLinecapProperty = Globals | "butt" | "round" | "square";

type StrokeLinejoinProperty = Globals | "bevel" | "miter" | "round";

type StrokeWidthProperty<TLength> = Globals | TLength | string;

type TextAnchorProperty = Globals | "end" | "middle" | "start";

type VectorEffectProperty = Globals | "non-scaling-stroke" | "none";

type FontFaceFontFeatureSettingsProperty = "normal" | string;

type FontFaceFontDisplayProperty = "auto" | "block" | "fallback" | "optional" | "swap";

type FontFaceFontStretchProperty = FontStretchAbsolute | string;

type FontFaceFontStyleProperty = "italic" | "normal" | "oblique" | string;

type FontFaceFontVariantProperty =
  | EastAsianVariantValues
  | "all-petite-caps"
  | "all-small-caps"
  | "common-ligatures"
  | "contextual"
  | "diagonal-fractions"
  | "discretionary-ligatures"
  | "full-width"
  | "historical-forms"
  | "historical-ligatures"
  | "lining-nums"
  | "no-common-ligatures"
  | "no-contextual"
  | "no-discretionary-ligatures"
  | "no-historical-ligatures"
  | "none"
  | "normal"
  | "oldstyle-nums"
  | "ordinal"
  | "petite-caps"
  | "proportional-nums"
  | "proportional-width"
  | "ruby"
  | "slashed-zero"
  | "small-caps"
  | "stacked-fractions"
  | "tabular-nums"
  | "titling-caps"
  | "unicase"
  | string;

type FontFaceFontVariationSettingsProperty = "normal" | string;

type FontFaceFontWeightProperty = FontWeightAbsolute | string;

type AbsoluteSize = "large" | "medium" | "small" | "x-large" | "x-small" | "xx-large" | "xx-small" | "xxx-large";

type AnimateableFeature = "contents" | "scroll-position" | string;

type Attachment = "fixed" | "local" | "scroll";

type BgPosition<TLength> = TLength | "bottom" | "center" | "left" | "right" | "top" | string;

type BgSize<TLength> = TLength | "auto" | "contain" | "cover" | string;

type BlendMode =
  | "color"
  | "color-burn"
  | "color-dodge"
  | "darken"
  | "difference"
  | "exclusion"
  | "hard-light"
  | "hue"
  | "lighten"
  | "luminosity"
  | "multiply"
  | "normal"
  | "overlay"
  | "saturation"
  | "screen"
  | "soft-light";

type Box = "border-box" | "content-box" | "padding-box";

type Color = NamedColor | DeprecatedSystemColor | "currentcolor" | string;

type Compat =
  | "button-bevel"
  | "checkbox"
  | "listbox"
  | "menulist"
  | "menulist-button"
  | "meter"
  | "progress-bar"
  | "push-button"
  | "radio"
  | "searchfield"
  | "slider-horizontal"
  | "square-button"
  | "textarea";

type CompositeStyle =
  | "clear"
  | "copy"
  | "destination-atop"
  | "destination-in"
  | "destination-out"
  | "destination-over"
  | "source-atop"
  | "source-in"
  | "source-out"
  | "source-over"
  | "xor";

type CompositingOperator = "add" | "exclude" | "intersect" | "subtract";

type ContentDistribution = "space-around" | "space-between" | "space-evenly" | "stretch";

type ContentList = Quote | "contents" | string;

type ContentPosition = "center" | "end" | "flex-end" | "flex-start" | "start";

type CubicBezierTimingFunction = "ease" | "ease-in" | "ease-in-out" | "ease-out" | string;

type Dasharray<TLength> = TLength | string | number;

type DeprecatedSystemColor =
  | "ActiveBorder"
  | "ActiveCaption"
  | "AppWorkspace"
  | "Background"
  | "ButtonFace"
  | "ButtonHighlight"
  | "ButtonShadow"
  | "ButtonText"
  | "CaptionText"
  | "GrayText"
  | "Highlight"
  | "HighlightText"
  | "InactiveBorder"
  | "InactiveCaption"
  | "InactiveCaptionText"
  | "InfoBackground"
  | "InfoText"
  | "Menu"
  | "MenuText"
  | "Scrollbar"
  | "ThreeDDarkShadow"
  | "ThreeDFace"
  | "ThreeDHighlight"
  | "ThreeDLightShadow"
  | "ThreeDShadow"
  | "Window"
  | "WindowFrame"
  | "WindowText";

type DisplayInside = "-ms-flexbox" | "-ms-grid" | "-webkit-flex" | "flex" | "flow" | "flow-root" | "grid" | "ruby" | "table";

type DisplayInternal =
  | "ruby-base"
  | "ruby-base-container"
  | "ruby-text"
  | "ruby-text-container"
  | "table-caption"
  | "table-cell"
  | "table-column"
  | "table-column-group"
  | "table-footer-group"
  | "table-header-group"
  | "table-row"
  | "table-row-group";

type DisplayLegacy = "-ms-inline-flexbox" | "-ms-inline-grid" | "-webkit-inline-flex" | "inline-block" | "inline-flex" | "inline-grid" | "inline-list-item" | "inline-table";

type DisplayOutside = "block" | "inline" | "run-in";

type EastAsianVariantValues = "jis04" | "jis78" | "jis83" | "jis90" | "simplified" | "traditional";

type FinalBgLayer<TLength> = Color | BgPosition<TLength> | RepeatStyle | Attachment | Box | "none" | string;

type FontStretchAbsolute =
  | "condensed"
  | "expanded"
  | "extra-condensed"
  | "extra-expanded"
  | "normal"
  | "semi-condensed"
  | "semi-expanded"
  | "ultra-condensed"
  | "ultra-expanded"
  | string;

type FontWeightAbsolute = "bold" | "normal" | number;

type GenericFamily = "cursive" | "fantasy" | "monospace" | "sans-serif" | "serif";

type GeometryBox = Box | "fill-box" | "margin-box" | "stroke-box" | "view-box";

type GridLine = "auto" | string | number;

type LineStyle = "dashed" | "dotted" | "double" | "groove" | "hidden" | "inset" | "none" | "outset" | "ridge" | "solid";

type LineWidth<TLength> = TLength | "medium" | "thick" | "thin";

type MaskLayer<TLength> = Position<TLength> | RepeatStyle | GeometryBox | CompositingOperator | MaskingMode | "no-clip" | "none" | string;

type MaskingMode = "alpha" | "luminance" | "match-source";

type NamedColor =
  | "aliceblue"
  | "antiquewhite"
  | "aqua"
  | "aquamarine"
  | "azure"
  | "beige"
  | "bisque"
  | "black"
  | "blanchedalmond"
  | "blue"
  | "blueviolet"
  | "brown"
  | "burlywood"
  | "cadetblue"
  | "chartreuse"
  | "chocolate"
  | "coral"
  | "cornflowerblue"
  | "cornsilk"
  | "crimson"
  | "cyan"
  | "darkblue"
  | "darkcyan"
  | "darkgoldenrod"
  | "darkgray"
  | "darkgreen"
  | "darkgrey"
  | "darkkhaki"
  | "darkmagenta"
  | "darkolivegreen"
  | "darkorange"
  | "darkorchid"
  | "darkred"
  | "darksalmon"
  | "darkseagreen"
  | "darkslateblue"
  | "darkslategray"
  | "darkslategrey"
  | "darkturquoise"
  | "darkviolet"
  | "deeppink"
  | "deepskyblue"
  | "dimgray"
  | "dimgrey"
  | "dodgerblue"
  | "firebrick"
  | "floralwhite"
  | "forestgreen"
  | "fuchsia"
  | "gainsboro"
  | "ghostwhite"
  | "gold"
  | "goldenrod"
  | "gray"
  | "green"
  | "greenyellow"
  | "grey"
  | "honeydew"
  | "hotpink"
  | "indianred"
  | "indigo"
  | "ivory"
  | "khaki"
  | "lavender"
  | "lavenderblush"
  | "lawngreen"
  | "lemonchiffon"
  | "lightblue"
  | "lightcoral"
  | "lightcyan"
  | "lightgoldenrodyellow"
  | "lightgray"
  | "lightgreen"
  | "lightgrey"
  | "lightpink"
  | "lightsalmon"
  | "lightseagreen"
  | "lightskyblue"
  | "lightslategray"
  | "lightslategrey"
  | "lightsteelblue"
  | "lightyellow"
  | "lime"
  | "limegreen"
  | "linen"
  | "magenta"
  | "maroon"
  | "mediumaquamarine"
  | "mediumblue"
  | "mediumorchid"
  | "mediumpurple"
  | "mediumseagreen"
  | "mediumslateblue"
  | "mediumspringgreen"
  | "mediumturquoise"
  | "mediumvioletred"
  | "midnightblue"
  | "mintcream"
  | "mistyrose"
  | "moccasin"
  | "navajowhite"
  | "navy"
  | "oldlace"
  | "olive"
  | "olivedrab"
  | "orange"
  | "orangered"
  | "orchid"
  | "palegoldenrod"
  | "palegreen"
  | "paleturquoise"
  | "palevioletred"
  | "papayawhip"
  | "peachpuff"
  | "peru"
  | "pink"
  | "plum"
  | "powderblue"
  | "purple"
  | "rebeccapurple"
  | "red"
  | "rosybrown"
  | "royalblue"
  | "saddlebrown"
  | "salmon"
  | "sandybrown"
  | "seagreen"
  | "seashell"
  | "sienna"
  | "silver"
  | "skyblue"
  | "slateblue"
  | "slategray"
  | "slategrey"
  | "snow"
  | "springgreen"
  | "steelblue"
  | "tan"
  | "teal"
  | "thistle"
  | "tomato"
  | "transparent"
  | "turquoise"
  | "violet"
  | "wheat"
  | "white"
  | "whitesmoke"
  | "yellow"
  | "yellowgreen";

type Paint = Color | "child" | "context-fill" | "context-stroke" | "none" | string;

type Position<TLength> = TLength | "bottom" | "center" | "left" | "right" | "top" | string;

type Quote = "close-quote" | "no-close-quote" | "no-open-quote" | "open-quote";

type RepeatStyle = "no-repeat" | "repeat" | "repeat-x" | "repeat-y" | "round" | "space" | string;

type SelfPosition = "center" | "end" | "flex-end" | "flex-start" | "self-end" | "self-start" | "start";

type SingleAnimation = TimingFunction | SingleAnimationDirection | SingleAnimationFillMode | "infinite" | "none" | "paused" | "running" | string | number;

type SingleAnimationDirection = "alternate" | "alternate-reverse" | "normal" | "reverse";

type SingleAnimationFillMode = "backwards" | "both" | "forwards" | "none";

type SingleTransition = TimingFunction | "all" | "none" | string;

type StepTimingFunction = "step-end" | "step-start" | string;

type TimingFunction = CubicBezierTimingFunction | StepTimingFunction | "linear";

type TrackBreadth<TLength> = TLength | "auto" | "max-content" | "min-content" | string;

// TODO: Type data better, currently typed as any for allowing to override it
type FnValue<R> = R | ((data: any) => R)

type NormalCssProperties = Properties<string | number>
type CssProperties = {[K in keyof NormalCssProperties]: FnValue<NormalCssProperties[K] | JssValue>}

// Jss Style definitions
type JssStyleP = {
  [key: string]: FnValue<JssValue | JssStyleP>
}

type JssStyle = CssProperties & JssStyleP

type Styles<Name extends string | number | symbol = string> = Record<Name, JssStyle | string>
type Classes<Name extends string | number | symbol = string> = Record<Name, string>
type Keyframes<Name extends string = string> = Record<Name, string>

interface CreateGenerateIdOptions {
  minify?: boolean
}

type CreateGenerateId = (options?: CreateGenerateIdOptions) => GenerateId

type GenerateId = (rule: Rule, sheet?: StyleSheet<string>) => string

type JssValue =
  | string
  | number
  | Array<string | number | Array<string | number> | '!important'>
  | null
  | false

type InsertionPoint = string | HTMLElement | Comment

interface UpdateOptions {
  process?: boolean
  force?: boolean
}

interface ToCssOptions {
  indent?: number
  allowEmpty?: boolean
}

interface RuleListOptions {
  classes: Classes
  generateClassName: GenerateId
  Renderer: Renderer
  jss: Jss
  sheet: StyleSheet
  parent: ContainerRule | StyleSheet
}

declare class RuleList {
  constructor(options: RuleListOptions)
  add(name: string, decl: JssStyle, options?: RuleOptions): Rule
  get(name: string): Rule
  remove(rule: Rule): void
  indexOf(rule: Rule): number
  process(): void
  register(rule: Rule, className?: string): void
  unregister(rule: Rule): void
  update(name: string, data: {}): void
  update(data: {}): void
  toString(options?: ToCssOptions): string
}

interface RuleOptions {
  selector?: string
  sheet?: StyleSheet
  index?: number
  parent?: ContainerRule | StyleSheet
  classes: Classes
  jss: Jss
  generateId: GenerateId
  Renderer: Renderer
}

interface BaseRule {
  type: string
  key: string
  isProcessed: boolean
  // eslint-disable-next-line no-use-before-define
  options: RuleOptions
  toString(options?: ToCssOptions): string
}

interface ContainerRule extends BaseRule {
  rules: RuleList
}

interface Plugin {
  onCreateRule?(name: string, decl: JssStyle, options: RuleOptions): Rule
  onProcessRule?(rule: Rule, sheet?: StyleSheet): void
  onProcessStyle?(style: JssStyle, rule: Rule, sheet?: StyleSheet): JssStyle
  onProcessSheet?(sheet?: StyleSheet): void
  onChangeValue?(value: string, prop: string, rule: Rule): string | null | false
  onUpdate?(data: object, rule: Rule, sheet?: StyleSheet): void
}

type Rule = BaseRule | ContainerRule

interface Renderer {
  setProperty(cssRule: HTMLElement | CSSStyleRule, prop: string, value: JssValue): boolean
  getPropertyValue(cssRule: HTMLElement | CSSStyleRule, prop: string): string
  removeProperty(cssRule: HTMLElement | CSSStyleRule, prop: string): void
  setSelector(cssRule: CSSStyleRule, selectorText: string): boolean
  attach(): void
  detach(): void
  deploy(sheet: StyleSheet): void
  insertRule(rule: Rule): false | CSSRule
  deleteRule(cssRule: CSSRule): boolean
  replaceRule(cssRule: CSSRule, rule: Rule): false | CSSRule
  indexOf(cssRule: CSSRule): number
  getRules(): CSSRuleList | void
}

interface RuleFactoryOptions {
  selector?: string
  classes?: object
  sheet?: StyleSheet
  index?: number
  jss?: Jss
  generateId?: GenerateId
  Renderer?: Renderer
}

interface StyleSheetFactoryOptions {
  media?: string
  meta?: string
  index?: number
  link?: boolean
  element?: HTMLStyleElement
  generateId?: GenerateId
  classNamePrefix?: string
}

interface StyleSheetOptions extends StyleSheetFactoryOptions {
  index: number
  generateId: GenerateId
  Renderer: Renderer
  insertionPoint?: InsertionPoint
  jss: Jss
}

interface StyleSheet<RuleName extends string | number | symbol = string | number | symbol> {
  // Gives auto-completion on the rules declared in `createStyleSheet` without
  // causing errors for rules added dynamically after creation.
  classes: Classes<RuleName>
  keyframes: Keyframes<string>
  options: StyleSheetOptions
  linked: boolean
  attached: boolean
  /**
   * Attach renderable to the render tree.
   */
  attach(): this
  /**
   * Remove renderable from render tree.
   */
  detach(): this
  deploy(): this
  /**
   * Add a rule to the current stylesheet.
   * Will insert a rule also after the stylesheet has been rendered first time.
   */
  addRule(style: JssStyle, options?: Partial<RuleOptions>): Rule
  addRule(name: RuleName, style: JssStyle, options?: Partial<RuleOptions>): Rule

  insertRule(rule: Rule): void
  /**
   * Create and add rules.
   * Will render also after Style Sheet was rendered the first time.
   */
  addRules(styles: Partial<Styles<RuleName>>, options?: Partial<RuleOptions>): Rule[]
  /**
   * Get a rule by name.
   */
  getRule(name: RuleName): Rule
  /**
   * Delete a rule by name.
   * Returns `true`: if rule has been deleted from the DOM.
   */
  deleteRule(name: RuleName): boolean
  /**
   * Get index of a rule.
   */
  indexOf(rule: Rule): number
  /**
   * Update the function values with a new data.
   */
  update(name: string, data: object, options?: UpdateOptions): this
  update(data: object, options?: UpdateOptions): this
  /**
   * Convert rules to a CSS string.
   */
  toString(options?: ToCssOptions): string
}

interface JssOptions {
  createGenerateId: CreateGenerateId
  plugins: ReadonlyArray<Plugin>
  Renderer?: {new (): Renderer} | null
  insertionPoint: InsertionPoint
  id: CreateGenerateIdOptions
}

interface Jss {
  createStyleSheet<Name extends string | number | symbol>(
    styles: Partial<Styles<Name>>,
    options?: StyleSheetFactoryOptions
  ): StyleSheet<Name>
  removeStyleSheet(sheet: StyleSheet): this
  setup(options?: Partial<JssOptions>): this
  use(...plugins: Plugin[]): this
  createRule(style: JssStyle, options?: RuleFactoryOptions): Rule
  createRule<Name extends string>(name: Name, style: JssStyle, options?: RuleFactoryOptions): Rule
}

/**
 * The default theme interface, augment this to avoid having to set the theme type everywhere
 */
interface DefaultTheme {}

type JSSFontface = FontFace & { fallbacks?: FontFace[] };

type PropsFunc<Props extends object, T> = (props: Props) => T;

/**
 * Allows the user to augment the properties available
 */
interface BaseCSSProperties extends Properties<number | string> {
  '@font-face'?: JSSFontface | JSSFontface[];
}

interface CSSProperties extends BaseCSSProperties {
  // Allow pseudo selectors and media queries
  // `unknown` is used since TS does not allow assigning an interface without
  // an index signature to one with an index signature. This is to allow type safe
  // module augmentation.
  // Technically we want any key not typed in `BaseCSSProperties` to be of type
  // `CSSProperties` but this doesn't work. The index signature needs to cover
  // BaseCSSProperties as well. Usually you would use `BaseCSSProperties[keyof BaseCSSProperties]`
  // but this would not allow assigning React.CSSProperties to CSSProperties
  [k: string]: unknown | CSSProperties;
}

type BaseCreateCSSProperties<Props extends object = {}> = {
  [P in keyof BaseCSSProperties]: BaseCSSProperties[P] | PropsFunc<Props, BaseCSSProperties[P]>;
};

interface CreateCSSProperties<Props extends object = {}>
  extends BaseCreateCSSProperties<Props> {
  // Allow pseudo selectors and media queries
  [k: string]:
    | BaseCreateCSSProperties<Props>[keyof BaseCreateCSSProperties<Props>]
    | CreateCSSProperties<Props>;
}

/**
 * This is basically the API of JSS. It defines a Map<string, CSS>,
 * where
 * - the `keys` are the class (names) that will be created
 * - the `values` are objects that represent CSS rules (`React.CSSProperties`).
 *
 * if only `CSSProperties` are matched `Props` are inferred to `any`
 */
type StyleRules<Props extends object = {}, ClassKey extends string = string> = Record<
  ClassKey,
  // JSS property bag
  | CSSProperties
  // JSS property bag where values are based on props
  | CreateCSSProperties<Props>
  // JSS property bag based on props
  | PropsFunc<Props, CreateCSSProperties<Props>>
>;

/**
 * @internal
 */
type StyleRulesCallback<Theme, Props extends object, ClassKey extends string = string> = (
  theme: Theme
) => StyleRules<Props, ClassKey>;

type Styles$1<Theme, Props extends object, ClassKey extends string = string> =
  | StyleRules<Props, ClassKey>
  | StyleRulesCallback<Theme, Props, ClassKey>;

interface WithStylesOptions<Theme = DefaultTheme> extends StyleSheetFactoryOptions {
  defaultTheme?: Theme;
  flip?: boolean;
  withTheme?: boolean;
  name?: string;
}

type ClassNameMap<ClassKey extends string = string> = Record<ClassKey, string>;
type ClassKeyOfStyles<StylesOrClassKey> = StylesOrClassKey extends string
  ? StylesOrClassKey
  : StylesOrClassKey extends StyleRulesCallback<any, any, infer ClassKey>
  ? ClassKey
  : StylesOrClassKey extends StyleRules<any, infer ClassKey>
  ? ClassKey
  : never;

interface StyledComponentProps<ClassKey extends string = string> {
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<ClassNameMap<ClassKey>>;
  innerRef?: Ref<any>;
}

/**
 * Adapter for `StyleRules` from `@material-ui/styles` for backwards compatibility.
 * Order of generic arguments is just reversed.
 *
 * TODO: to normalize in v5
 */
type StyleRules$1<
  ClassKey extends string = string,
  Props extends object = {}
> = StyleRules<Props, ClassKey>;

type WithStyles<
  StylesOrClassKey extends string | Styles$1<any, any, any> = string,
  IncludeTheme extends boolean | undefined = false
> = (IncludeTheme extends true ? { theme: Theme } : {}) & {
  classes: ClassNameMap<ClassKeyOfStyles<StylesOrClassKey>>;
};

declare function withStyles<
  ClassKey extends string,
  Options extends WithStylesOptions<Theme> = {},
  Props extends object = {}
>(
  style: Styles$1<Theme, Props, ClassKey>,
  options?: Options
): PropInjector<WithStyles<ClassKey, Options['withTheme']>, StyledComponentProps<ClassKey> & Props>;

interface Mixins {
  gutters: (styles?: CSSProperties) => CSSProperties;
  toolbar: CSSProperties;
  // ... use interface declaration merging to add custom mixins
}

interface MixinsOptions extends Partial<Mixins> {
  // ... use interface declaration merging to add custom mixin options
}

// use standalone interface over typeof colors/commons
// to enable module augmentation
interface CommonColors {
  black: string;
  white: string;
}

type ColorPartial = Partial<Color$1>;

interface TypeText {
  primary: string;
  secondary: string;
  disabled: string;
  hint: string;
}

interface TypeAction {
  active: string;
  hover: string;
  hoverOpacity: number;
  selected: string;
  selectedOpacity: number;
  disabled: string;
  disabledOpacity: number;
  disabledBackground: string;
  focus: string;
  focusOpacity: number;
  activatedOpacity: number;
}

interface TypeBackground {
  default: string;
  paper: string;
}

type TypeDivider = string;

type PaletteColorOptions = SimplePaletteColorOptions | ColorPartial;

interface SimplePaletteColorOptions {
  light?: string;
  main: string;
  dark?: string;
  contrastText?: string;
}

interface PaletteColor {
  light: string;
  main: string;
  dark: string;
  contrastText: string;
}

type PaletteTonalOffset =
  | number
  | {
      light: number;
      dark: number;
    };

interface Palette {
  common: CommonColors;
  type: PaletteType;
  contrastThreshold: number;
  tonalOffset: PaletteTonalOffset;
  primary: PaletteColor;
  secondary: PaletteColor;
  error: PaletteColor;
  warning: PaletteColor;
  info: PaletteColor;
  success: PaletteColor;
  grey: Color$1;
  text: TypeText;
  divider: TypeDivider;
  action: TypeAction;
  background: TypeBackground;
  getContrastText: (background: string) => string;
  augmentColor: {
    (
      color: ColorPartial,
      mainShade?: number | string,
      lightShade?: number | string,
      darkShade?: number | string
    ): PaletteColor;
    (color: PaletteColorOptions): PaletteColor;
  };
}

interface PaletteOptions {
  primary?: PaletteColorOptions;
  secondary?: PaletteColorOptions;
  error?: PaletteColorOptions;
  warning?: PaletteColorOptions;
  info?: PaletteColorOptions;
  success?: PaletteColorOptions;
  type?: PaletteType;
  tonalOffset?: PaletteTonalOffset;
  contrastThreshold?: number;
  common?: Partial<CommonColors>;
  grey?: ColorPartial;
  text?: Partial<TypeText>;
  divider?: string;
  action?: Partial<TypeAction>;
  background?: Partial<TypeBackground>;
  getContrastText?: (background: string) => string;
}

type Variant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'subtitle1'
  | 'subtitle2'
  | 'body1'
  | 'body2'
  | 'caption'
  | 'button'
  | 'overline';

interface FontStyle
  extends Required<{
    fontFamily: CSSProperties$1['fontFamily'];
    fontSize: number;
    fontWeightLight: CSSProperties$1['fontWeight'];
    fontWeightRegular: CSSProperties$1['fontWeight'];
    fontWeightMedium: CSSProperties$1['fontWeight'];
    fontWeightBold: CSSProperties$1['fontWeight'];
  }> {}

interface FontStyleOptions extends Partial<FontStyle> {
  htmlFontSize?: number;
  allVariants?: CSSProperties$1;
}

// TODO: which one should actually be allowed to be subject to module augmentation?
// current type vs interface decision is kept for historical reasons until we
// made a decision
type TypographyStyle = CSSProperties;
interface TypographyStyleOptions extends TypographyStyle {}

interface TypographyUtils {
  pxToRem: (px: number) => string;
}

interface Typography extends Record<Variant, TypographyStyle>, FontStyle, TypographyUtils {}

interface TypographyOptions
  extends Partial<Record<Variant, TypographyStyleOptions> & FontStyleOptions> {}

type Shadows = [
  'none',
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
];

interface Shape {
  borderRadius: number;
}

type ShapeOptions = Partial<Shape>;

interface Easing {
  easeInOut: string;
  easeOut: string;
  easeIn: string;
  sharp: string;
}
declare const easing: Easing;

interface Duration {
  shortest: number;
  shorter: number;
  short: number;
  standard: number;
  complex: number;
  enteringScreen: number;
  leavingScreen: number;
}
declare const duration: Duration;

declare function formatMs(milliseconds: number): string;

interface Transitions {
  easing: Easing;
  duration: Duration;
  create(
    props: string | string[],
    options?: Partial<{ duration: number | string; easing: string; delay: number | string }>
  ): string;
  getAutoHeightDuration(height: number): number;
}

interface TransitionsOptions {
  easing?: Partial<Easing>;
  duration?: Partial<Duration>;
  create?: (
    props: string | string[],
    options?: Partial<{ duration: number | string; easing: string; delay: number | string }>
  ) => string;
  getAutoHeightDuration?: (height: number) => number;
}

interface ZIndex {
  mobileStepper: number;
  speedDial: number;
  appBar: number;
  drawer: number;
  modal: number;
  snackbar: number;
  tooltip: number;
}

type ZIndexOptions = Partial<ZIndex>;

interface PaperProps
  extends StandardProps<HTMLAttributes<HTMLDivElement>, PaperClassKey> {
  /**
   * The content of the component.
   */
  children?: ReactNode;
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component?: ElementType<HTMLAttributes<HTMLElement>>;
  /**
   * Shadow depth, corresponds to `dp` in the spec.
   * It accepts values between 0 and 24 inclusive.
   */
  elevation?: number;
  /**
   * If `true`, rounded corners are disabled.
   */
  square?: boolean;
  /**
   * The variant to use.
   */
  variant?: 'elevation' | 'outlined';
}

type PaperClassKey =
  | 'root'
  | 'rounded'
  | 'outlined'
  | 'elevation0'
  | 'elevation1'
  | 'elevation2'
  | 'elevation3'
  | 'elevation4'
  | 'elevation5'
  | 'elevation6'
  | 'elevation7'
  | 'elevation8'
  | 'elevation9'
  | 'elevation10'
  | 'elevation11'
  | 'elevation12'
  | 'elevation13'
  | 'elevation14'
  | 'elevation15'
  | 'elevation16'
  | 'elevation17'
  | 'elevation18'
  | 'elevation19'
  | 'elevation20'
  | 'elevation21'
  | 'elevation22'
  | 'elevation23'
  | 'elevation24';

/**
 *
 * Demos:
 *
 * - [Cards](https://material-ui.com/components/cards/)
 * - [Paper](https://material-ui.com/components/paper/)
 *
 * API:
 *
 * - [Paper API](https://material-ui.com/api/paper/)
 */
declare function Paper(props: PaperProps): JSX.Element;

interface AppBarProps extends StandardProps<PaperProps, AppBarClassKey> {
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   */
  color?: PropTypes.Color | 'transparent';
  /**
   * The positioning type. The behavior of the different options is described
   * [in the MDN web docs](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Positioning).
   * Note: `sticky` is not universally supported and will fall back to `static` when unavailable.
   */
  position?: 'fixed' | 'absolute' | 'sticky' | 'static' | 'relative';
}

type AppBarClassKey =
  | 'root'
  | 'positionFixed'
  | 'positionAbsolute'
  | 'positionSticky'
  | 'positionStatic'
  | 'positionRelative'
  | 'colorDefault'
  | 'colorPrimary'
  | 'colorSecondary';

/**
 *
 * Demos:
 *
 * - [App Bar](https://material-ui.com/components/app-bar/)
 *
 * API:
 *
 * - [AppBar API](https://material-ui.com/api/app-bar/)
 * - inherits [Paper API](https://material-ui.com/api/paper/)
 */
declare function AppBar(props: AppBarProps): JSX.Element;

/**
 * A component whose root component can be controlled via a `component` prop.
 *
 * Adjusts valid props based on the type of `component`.
 */
interface OverridableComponent<M extends OverridableTypeMap> {
  <C extends ElementType>(
    props: {
      /**
       * The component used for the root node.
       * Either a string to use a HTML element or a component.
       */
      component: C;
    } & OverrideProps<M, C>
  ): JSX.Element;
  (props: DefaultComponentProps<M>): JSX.Element;
}

/**
 * Props of the component if `component={Component}` is used.
 */
// prettier-ignore
type OverrideProps<
  M extends OverridableTypeMap,
  C extends ElementType
> = (
  & BaseProps<M>
  & Omit<ComponentPropsWithRef<C>, keyof CommonProps<M>>
);

/**
 * Props if `component={Component}` is NOT used.
 */
// prettier-ignore
type DefaultComponentProps<M extends OverridableTypeMap> =
  & BaseProps<M>
  & Omit<ComponentPropsWithRef<M['defaultComponent']>, keyof BaseProps<M>>;

/**
 * Props defined on the component (+ common material-ui props).
 */
// prettier-ignore
type BaseProps<M extends OverridableTypeMap> =
  & M['props']
  & CommonProps<M>;

/**
 * Props that are valid for material-ui components.
 */
interface CommonProps<M extends OverridableTypeMap>
  extends StyledComponentProps<M['classKey']> {
  className?: string;
  style?: CSSProperties$1;
}

interface OverridableTypeMap {
  props: {};
  defaultComponent: ElementType;
  classKey: string;
}

interface AvatarTypeMap<P = {}, D extends ElementType = 'div'> {
  props: P & {
    /**
     * Used in combination with `src` or `srcSet` to
     * provide an alt attribute for the rendered `img` element.
     */
    alt?: string;
    /**
     * Used to render icon or text elements inside the Avatar if `src` is not set.
     * This can be an element, or just a string.
     */
    children?: ReactNode;
    /**
     * Attributes applied to the `img` element if the component is used to display an image.
     * It can be used to listen for the loading error event.
     */
    imgProps?: ImgHTMLAttributes<HTMLImageElement>;
    /**
     * The `sizes` attribute for the `img` element.
     */
    sizes?: string;
    /**
     * The `src` attribute for the `img` element.
     */
    src?: string;
    /**
     * The `srcSet` attribute for the `img` element.
     * Use this attribute for responsive image display.
     */
    srcSet?: string;
    /**
     * The shape of the avatar.
     */
    variant?: 'circle' | 'circular' | 'rounded' | 'square';
  };
  defaultComponent: D;
  classKey: AvatarClassKey;
}

/**
 *
 * Demos:
 *
 * - [Avatars](https://material-ui.com/components/avatars/)
 *
 * API:
 *
 * - [Avatar API](https://material-ui.com/api/avatar/)
 */
declare const Avatar: OverridableComponent<AvatarTypeMap>;

type AvatarClassKey =
  | 'root'
  | 'colorDefault'
  | 'circle'
  | 'circular'
  | 'rounded'
  | 'square'
  | 'img'
  | 'fallback';

type AvatarProps<
  D extends ElementType = AvatarTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<AvatarTypeMap<P, D>, D>;

type RefHandler<
    RefElement extends undefined | HTMLElement,
    ImplicitRefHandler extends (node: HTMLElement, ...args: any[]) => void,
    ExplicitRefHandler extends (...args: any[]) => void
> = {
    implicit: ImplicitRefHandler;
    explicit: ExplicitRefHandler;
}[RefElement extends undefined ? 'implicit' : 'explicit'];

type EndHandler<RefElement extends undefined | HTMLElement> = RefHandler<
    RefElement,
    (node: HTMLElement, done: () => void) => void,
    (done: () => void) => void
>;

type EnterHandler<RefElement extends undefined | HTMLElement> = RefHandler<
    RefElement,
    (node: HTMLElement, isAppearing: boolean) => void,
    (isAppearing: boolean) => void
>;

type ExitHandler<E extends undefined | HTMLElement> = RefHandler<E, (node: HTMLElement) => void, () => void>;

declare const UNMOUNTED = 'unmounted';
declare const EXITED = 'exited';
declare const ENTERING = 'entering';
declare const ENTERED = 'entered';
declare const EXITING = 'exiting';

interface TransitionActions {
    /**
     * Normally a component is not transitioned if it is shown when the
     * `<Transition>` component mounts. If you want to transition on the first
     * mount set  appear to true, and the component will transition in as soon
     * as the `<Transition>` mounts. Note: there are no specific "appear" states.
     * appear only adds an additional enter transition.
     */
    appear?: boolean;

    /**
     * Enable or disable enter transitions.
     */
    enter?: boolean;

    /**
     * Enable or disable exit transitions.
     */
    exit?: boolean;
}

interface BaseTransitionProps<RefElement extends undefined | HTMLElement> {
    /**
     * Show the component; triggers the enter or exit states
     */
    in?: boolean;

    /**
     * By default the child component is mounted immediately along with the
     * parent Transition component. If you want to "lazy mount" the component on
     * the first `in={true}` you can set `mountOnEnter`. After the first enter
     * transition the component will stay mounted, even on "exited", unless you
     * also specify `unmountOnExit`.
     */
    mountOnEnter?: boolean;

    /**
     * By default the child component stays mounted after it reaches the
     * 'exited' state. Set `unmountOnExit` if you'd prefer to unmount the
     * component after it finishes exiting.
     */
    unmountOnExit?: boolean;

    /**
     * Callback fired before the "entering" status is applied. An extra
     * parameter `isAppearing` is supplied to indicate if the enter stage is
     * occurring on the initial mount
     */
    onEnter?: EnterHandler<RefElement>;

    /**
     * Callback fired after the "entering" status is applied. An extra parameter
     * isAppearing is supplied to indicate if the enter stage is occurring on
     * the initial mount
     */
    onEntering?: EnterHandler<RefElement>;

    /**
     * Callback fired after the "entered" status is applied. An extra parameter
     * isAppearing is supplied to indicate if the enter stage is occurring on
     * the initial mount
     */
    onEntered?: EnterHandler<RefElement>;

    /**
     * Callback fired before the "exiting" status is applied.
     */
    onExit?: ExitHandler<RefElement>;

    /**
     * Callback fired after the "exiting" status is applied.
     */
    onExiting?: ExitHandler<RefElement>;

    /**
     * Callback fired after the "exited" status is applied.
     */
    onExited?: ExitHandler<RefElement>;

    /**
     * A function child can be used instead of a React element. This function is
     * called with the current transition status ('entering', 'entered',
     * 'exiting',  'exited', 'unmounted'), which can be used to apply context
     * specific props to a component.
     * ```jsx
     *    <Transition in={this.state.in} timeout={150}>
     *        {state => (
     *            <MyComponent className={`fade fade-${state}`} />
     *        )}
     *    </Transition>
     * ```
     */
    children?: TransitionChildren;

    /**
     * A React reference to DOM element that need to transition: https://stackoverflow.com/a/51127130/4671932
     * When `nodeRef` prop is used, node is not passed to callback functions (e.g. onEnter) because user already has direct access to the node.
     * When changing `key` prop of `Transition` in a `TransitionGroup` a new `nodeRef` need to be provided to `Transition` with changed `key`
     * prop (@see https://github.com/reactjs/react-transition-group/blob/master/test/Transition-test.js).
     */
    nodeRef?: React.Ref<RefElement>;

    [prop: string]: any;
}

type TransitionStatus = typeof ENTERING | typeof ENTERED | typeof EXITING | typeof EXITED | typeof UNMOUNTED;
type TransitionChildren = ReactNode | ((status: TransitionStatus) => ReactNode);

interface TimeoutProps<RefElement extends undefined | HTMLElement> extends BaseTransitionProps<RefElement> {
    /**
     * The duration of the transition, in milliseconds. Required unless addEndListener is provided.
     *
     * You may specify a single timeout for all transitions:
     * ```js
     *   timeout={500}
     * ```
     * or individually:
     * ```js
     * timeout={{
     *  appear: 500,
     *  enter: 300,
     *  exit: 500,
     * }}
     * ```
     * - appear defaults to the value of `enter`
     * - enter defaults to `0`
     * - exit defaults to `0`
     */
    timeout: number | { appear?: number; enter?: number; exit?: number };

    /**
     * Add a custom transition end trigger. Called with the transitioning DOM
     * node and a done callback. Allows for more fine grained transition end
     * logic. Note: Timeouts are still used as a fallback if provided.
     */
    addEndListener?: EndHandler<RefElement>;
}

interface EndListenerProps<Ref extends undefined | HTMLElement> extends BaseTransitionProps<Ref> {
    /**
     * The duration of the transition, in milliseconds. Required unless addEndListener is provided.
     *
     * You may specify a single timeout for all transitions:
     * ```js
     *   timeout={500}
     * ```
     * or individually:
     * ```js
     * timeout={{
     *  appear: 500,
     *  enter: 300,
     *  exit: 500,
     * }}
     * ```
     * - appear defaults to the value of `enter`
     * - enter defaults to `0`
     * - exit defaults to `0`
     */
    timeout?: number | { appear?: number; enter?: number; exit?: number };
    /**
     * Add a custom transition end trigger. Called with the transitioning DOM
     * node and a done callback. Allows for more fine grained transition end
     * logic. Note: Timeouts are still used as a fallback if provided.
     */
    addEndListener: EndHandler<Ref>;
}

type TransitionProps<RefElement extends undefined | HTMLElement = undefined> =
    | TimeoutProps<RefElement>
    | EndListenerProps<RefElement>;

type TransitionHandlerKeys =
  | 'onEnter'
  | 'onEntering'
  | 'onEntered'
  | 'onExit'
  | 'onExiting'
  | 'onExited';
type TransitionHandlerProps = Pick<TransitionProps, TransitionHandlerKeys>;

type TransitionKeys =
  | 'in'
  | 'mountOnEnter'
  | 'unmountOnExit'
  | 'timeout'
  | 'addEndListener'
  | TransitionHandlerKeys;
interface TransitionProps$1
  extends TransitionActions,
    Partial<Pick<TransitionProps, TransitionKeys>> {
  style?: CSSProperties$1;
}

interface FadeProps extends Omit<TransitionProps$1, 'children'> {
  /**
   * A single child content element.
   */
  children?: ReactElement<any, any>;
  /**
   * Enable this prop if you encounter 'Function components cannot be given refs',
   * use `unstable_createStrictModeTheme`,
   * and can't forward the ref in the child component.
   */
  disableStrictModeCompat?: boolean;
  /**
   * If `true`, the component will transition in.
   */
  in?: boolean;
  ref?: Ref<unknown>;
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   */
  timeout?: TransitionProps$1['timeout'];
}

/**
 * The Fade transition is used by the [Modal](https://material-ui.com/components/modal/) component.
 * It uses [react-transition-group](https://github.com/reactjs/react-transition-group) internally.
 * Demos:
 *
 * - [Transitions](https://material-ui.com/components/transitions/)
 *
 * API:
 *
 * - [Fade API](https://material-ui.com/api/fade/)
 * - inherits [Transition API](https://reactcommunity.org/react-transition-group/transition#Transition-props)
 */
declare function Fade(props: FadeProps): JSX.Element;

interface BackdropProps
  extends StandardProps<
    HTMLAttributes<HTMLDivElement> & Partial<Omit<FadeProps, 'children'>>,
    BackdropClassKey
  > {
  /**
   * The content of the component.
   */
  children?: ReactNode;
  /**
   * If `true`, the backdrop is invisible.
   * It can be used when rendering a popover or a custom select component.
   */
  invisible?: boolean;
  /**
   * If `true`, the backdrop is open.
   */
  open: boolean;
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   */
  transitionDuration?: TransitionProps$1['timeout'];
}

type BackdropClassKey = 'root' | 'invisible';

/**
 *
 * Demos:
 *
 * - [Backdrop](https://material-ui.com/components/backdrop/)
 *
 * API:
 *
 * - [Backdrop API](https://material-ui.com/api/backdrop/)
 * - inherits [Fade API](https://material-ui.com/api/fade/)
 */
declare function Backdrop(props: BackdropProps): JSX.Element;

interface BadgeOrigin {
  vertical: 'top' | 'bottom';
  horizontal: 'left' | 'right';
}

interface BadgeTypeMap<P = {}, D extends ElementType = 'div'> {
  props: P & {
    /**
     * The anchor of the badge.
     */
    anchorOrigin?: BadgeOrigin;
    /**
     * Wrapped shape the badge should overlap.
     */
    overlap?: 'rectangle' | 'circle';
    /**
     * The content rendered within the badge.
     */
    badgeContent?: ReactNode;
    /**
     * The badge will be added relative to this node.
     */
    children?: ReactNode;
    /**
     * The color of the component. It supports those theme colors that make sense for this component.
     */
    color?: 'primary' | 'secondary' | 'default' | 'error';
    /**
     * If `true`, the badge will be invisible.
     */
    invisible?: boolean;
    /**
     * Max count to show.
     */
    max?: number;
    /**
     * Controls whether the badge is hidden when `badgeContent` is zero.
     */
    showZero?: boolean;
    /**
     * The variant to use.
     */
    variant?: 'standard' | 'dot';
  };
  defaultComponent: D;
  classKey: BadgeClassKey;
}

type BadgeClassKey =
  | 'root'
  | 'badge'
  | 'colorPrimary'
  | 'colorSecondary'
  | 'colorError'
  | 'dot'
  | 'anchorOriginTopRightRectangle'
  | 'anchorOriginBottomRightRectangle'
  | 'anchorOriginTopLeftRectangle'
  | 'anchorOriginBottomLeftRectangle'
  | 'anchorOriginTopRightCircle'
  | 'anchorOriginBottomRightCircle'
  | 'anchorOriginTopLeftCircle'
  | 'invisible';
/**
 *
 * Demos:
 *
 * - [Avatars](https://material-ui.com/components/avatars/)
 * - [Badges](https://material-ui.com/components/badges/)
 *
 * API:
 *
 * - [Badge API](https://material-ui.com/api/badge/)
 */
declare const Badge: OverridableComponent<BadgeTypeMap>;

type BadgeProps<
  D extends ElementType = BadgeTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<BadgeTypeMap<P, D>, D>;

type TouchRippleProps = StandardProps<
  HTMLAttributes<HTMLElement>,
  TouchRippleClassKey
> & {
  center?: boolean;
};

type TouchRippleClassKey =
  | 'root'
  | 'ripple'
  | 'rippleVisible'
  | 'ripplePulsate'
  | 'child'
  | 'childLeaving'
  | 'childPulsate';

interface ButtonBaseTypeMap<P = {}, D extends ElementType = 'button'> {
  props: P & {
    /**
     * A ref for imperative actions.
     * It currently only supports `focusVisible()` action.
     */
    action?: Ref<ButtonBaseActions>;
    /**
     * @ignore
     *
     * Use that prop to pass a ref to the native button component.
     * @deprecated Use `ref` instead.
     */
    buttonRef?: Ref<unknown>;
    /**
     * If `true`, the ripples will be centered.
     * They won't start at the cursor interaction position.
     */
    centerRipple?: boolean;
    /**
     * The content of the component.
     */
    children?: ReactNode;
    /**
     * If `true`, the base button will be disabled.
     */
    disabled?: boolean;
    /**
     * If `true`, the ripple effect will be disabled.
     *
     * ⚠️ Without a ripple there is no styling for :focus-visible by default. Be sure
     * to highlight the element by applying separate styles with the `focusVisibleClassName`.
     */
    disableRipple?: boolean;
    /**
     * If `true`, the touch ripple effect will be disabled.
     */
    disableTouchRipple?: boolean;
    /**
     * If `true`, the base button will have a keyboard focus ripple.
     */
    focusRipple?: boolean;
    /**
     * This prop can help a person know which element has the keyboard focus.
     * The class name will be applied when the element gain the focus through a keyboard interaction.
     * It's a polyfill for the [CSS :focus-visible selector](https://drafts.csswg.org/selectors-4/#the-focus-visible-pseudo).
     * The rationale for using this feature [is explained here](https://github.com/WICG/focus-visible/blob/master/explainer.md).
     * A [polyfill can be used](https://github.com/WICG/focus-visible) to apply a `focus-visible` class to other components
     * if needed.
     */
    focusVisibleClassName?: string;
    /**
     * Callback fired when the component is focused with a keyboard.
     * We trigger a `onFocus` callback too.
     */
    onFocusVisible?: FocusEventHandler<any>;
    // @types/react is stricter
    tabIndex?: string | number;
    /**
     * Props applied to the `TouchRipple` element.
     */
    TouchRippleProps?: Partial<TouchRippleProps>;
  };
  defaultComponent: D;
  classKey: ButtonBaseClassKey;
}

/**
 * utility to create component types that inherit props from ButtonBase.
 * This component has an additional overload if the `href` prop is set which
 * can make extension quite tricky
 */
interface ExtendButtonBaseTypeMap<M extends OverridableTypeMap> {
  props: M['props'] & ButtonBaseTypeMap['props'];
  defaultComponent: M['defaultComponent'];
  classKey: M['classKey'];
}

type ExtendButtonBase<M extends OverridableTypeMap> = ((
  props: { href: string } & OverrideProps<ExtendButtonBaseTypeMap<M>, 'a'>
) => JSX.Element) &
  OverridableComponent<ExtendButtonBaseTypeMap<M>>;

/**
 * `ButtonBase` contains as few styles as possible.
 * It aims to be a simple building block for creating a button.
 * It contains a load of style reset and some focus/ripple logic.
 * Demos:
 *
 * - [Buttons](https://material-ui.com/components/buttons/)
 *
 * API:
 *
 * - [ButtonBase API](https://material-ui.com/api/button-base/)
 */
declare const ButtonBase: ExtendButtonBase<ButtonBaseTypeMap>;

type ButtonBaseProps<
  D extends ElementType = ButtonBaseTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<ButtonBaseTypeMap<P, D>, D>;

type ButtonBaseClassKey = 'root' | 'disabled' | 'focusVisible';

interface ButtonBaseActions {
  focusVisible(): void;
}

type BottomNavigationActionTypeMap<
  P,
  D extends ElementType
> = ExtendButtonBaseTypeMap<{
  props: P & {
    /**
     * This prop isn't supported.
     * Use the `component` prop if you need to change the children structure.
     */
    children?: ReactNode;
    /**
     * The icon element.
     */
    icon?: ReactNode;
    /**
     * The label element.
     */
    label?: ReactNode;
    onChange?: (event: ChangeEvent<{}>, value: any) => void;
    onClick?: ReactEventHandler<any>;
    selected?: boolean;
    /**
     * If `true`, the `BottomNavigationAction` will show its label.
     * By default, only the selected `BottomNavigationAction`
     * inside `BottomNavigation` will show its label.
     */
    showLabel?: boolean;
    /**
     * You can provide your own value. Otherwise, we fallback to the child position index.
     */
    value?: any;
  };
  defaultComponent: D;
  classKey: BottomNavigationActionClassKey;
}>;

/**
 *
 * Demos:
 *
 * - [Bottom Navigation](https://material-ui.com/components/bottom-navigation/)
 *
 * API:
 *
 * - [BottomNavigationAction API](https://material-ui.com/api/bottom-navigation-action/)
 * - inherits [ButtonBase API](https://material-ui.com/api/button-base/)
 */
declare const BottomNavigationAction: ExtendButtonBase<BottomNavigationActionTypeMap<
  {},
  ButtonBaseTypeMap['defaultComponent']
>>;

type BottomNavigationActionClassKey = 'root' | 'selected' | 'iconOnly' | 'wrapper' | 'label';

type BottomNavigationActionProps<
  D extends ElementType = ButtonBaseTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<BottomNavigationActionTypeMap<P, D>, D>;

interface BottomNavigationTypeMap<P = {}, D extends ElementType = 'div'> {
  props: P & {
    /**
     * The content of the component.
     */
    children?: ReactNode;
    /**
     * Callback fired when the value changes.
     *
     * @param {object} event The event source of the callback.
     * @param {any} value We default to the index of the child.
     */
    onChange?: (event: ChangeEvent<{}>, value: any) => void;
    /**
     * If `true`, all `BottomNavigationAction`s will show their labels.
     * By default, only the selected `BottomNavigationAction` will show its label.
     */
    showLabels?: boolean;
    /**
     * The value of the currently selected `BottomNavigationAction`.
     */
    value?: any;
  };
  defaultComponent: D;
  classKey: BottomNavigationClassKey;
}
/**
 *
 * Demos:
 *
 * - [Bottom Navigation](https://material-ui.com/components/bottom-navigation/)
 *
 * API:
 *
 * - [BottomNavigation API](https://material-ui.com/api/bottom-navigation/)
 */
declare const BottomNavigation: OverridableComponent<BottomNavigationTypeMap>;

type BottomNavigationClassKey = 'root';

type BottomNavigationProps<
  D extends ElementType = BottomNavigationTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<BottomNavigationTypeMap<P, D>, D>;

interface BreadcrumbsTypeMap<P = {}, D extends ElementType = 'nav'> {
  props: P & {
    /**
     * The breadcrumb children.
     */
    children?: ReactNode;
    /**
     * Override the default label for the expand button.
     *
     * For localization purposes, you can use the provided [translations](/guides/localization/).
     */
    expandText?: string;
    /**
     * If max items is exceeded, the number of items to show after the ellipsis.
     */
    itemsAfterCollapse?: number;
    /**
     * If max items is exceeded, the number of items to show before the ellipsis.
     */
    itemsBeforeCollapse?: number;
    /**
     * Specifies the maximum number of breadcrumbs to display. When there are more
     * than the maximum number, only the first `itemsBeforeCollapse` and last `itemsAfterCollapse`
     * will be shown, with an ellipsis in between.
     */
    maxItems?: number;
    /**
     * Custom separator node.
     */
    separator?: ReactNode;
  };
  defaultComponent: D;
  classKey: BreadcrumbsClassKey;
}

/**
 *
 * Demos:
 *
 * - [Breadcrumbs](https://material-ui.com/components/breadcrumbs/)
 *
 * API:
 *
 * - [Breadcrumbs API](https://material-ui.com/api/breadcrumbs/)
 */
declare const Breadcrumbs: OverridableComponent<BreadcrumbsTypeMap>;

type BreadcrumbsClassKey = 'root' | 'ol' | 'li' | 'separator';

type BreadcrumbsProps<
  D extends ElementType = BreadcrumbsTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<BreadcrumbsTypeMap<P, D>, D>;

type ButtonTypeMap<
  P = {},
  D extends React.ElementType = 'button'
> = ExtendButtonBaseTypeMap<{
  props: P & {
    /**
     * The content of the button.
     */
    children?: React.ReactNode;
    /**
     * The color of the component. It supports those theme colors that make sense for this component.
     */
    color?: PropTypes.Color;
    /**
     * If `true`, the button will be disabled.
     */
    disabled?: boolean;
    /**
     * If `true`, no elevation is used.
     */
    disableElevation?: boolean;
    /**
     * If `true`, the  keyboard focus ripple will be disabled.
     */
    disableFocusRipple?: boolean;
    /**
     * Element placed after the children.
     */
    endIcon?: React.ReactNode;
    /**
     * If `true`, the button will take up the full width of its container.
     */
    fullWidth?: boolean;
    /**
     * The URL to link to when the button is clicked.
     * If defined, an `a` element will be used as the root node.
     */
    href?: string;
    /**
     * The size of the button.
     * `small` is equivalent to the dense button styling.
     */
    size?: 'small' | 'medium' | 'large';
    /**
     * Element placed before the children.
     */
    startIcon?: React.ReactNode;
    /**
     * The variant to use.
     */
    variant?: 'text' | 'outlined' | 'contained';
  };
  defaultComponent: D;
  classKey: ButtonClassKey;
}>;

/**
 *
 * Demos:
 *
 * - [Button Group](https://material-ui.com/components/button-group/)
 * - [Buttons](https://material-ui.com/components/buttons/)
 *
 * API:
 *
 * - [Button API](https://material-ui.com/api/button/)
 * - inherits [ButtonBase API](https://material-ui.com/api/button-base/)
 */
declare const Button: ExtendButtonBase<ButtonTypeMap>;

type ButtonProps<
  D extends React.ElementType = ButtonTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<ButtonTypeMap<P, D>, D>;

type ButtonClassKey =
  | 'root'
  | 'label'
  | 'text'
  | 'textPrimary'
  | 'textSecondary'
  | 'outlined'
  | 'outlinedPrimary'
  | 'outlinedSecondary'
  | 'contained'
  | 'containedPrimary'
  | 'containedSecondary'
  | 'disableElevation'
  | 'focusVisible'
  | 'disabled'
  | 'colorInherit'
  | 'textSizeSmall'
  | 'textSizeLarge'
  | 'outlinedSizeSmall'
  | 'outlinedSizeLarge'
  | 'containedSizeSmall'
  | 'containedSizeLarge'
  | 'sizeSmall'
  | 'sizeLarge'
  | 'fullWidth'
  | 'startIcon'
  | 'endIcon'
  | 'iconSizeSmall'
  | 'iconSizeMedium'
  | 'iconSizeLarge';

interface ButtonGroupTypeMap<P = {}, D extends ElementType = 'div'> {
  props: P & {
    /**
     * The content of the button group.
     */
    children?: ReactNode;
    /**
     * The color of the component. It supports those theme colors that make sense for this component.
     */
    color?: PropTypes.Color;
    /**
     * If `true`, the buttons will be disabled.
     */
    disabled?: boolean;
    /**
     * If `true`, no elevation is used.
     */
    disableElevation?: boolean;
    /**
     * If `true`, the button keyboard focus ripple will be disabled.
     */
    disableFocusRipple?: boolean;
    /**
     * If `true`, the button ripple effect will be disabled.
     */
    disableRipple?: boolean;
    /**
     * If `true`, the buttons will take up the full width of its container.
     */
    fullWidth?: boolean;
    /**
     * The group orientation (layout flow direction).
     */
    orientation?: 'vertical' | 'horizontal';
    /**
     * The size of the button.
     * `small` is equivalent to the dense button styling.
     */
    size?: 'small' | 'medium' | 'large';
    /**
     * The variant to use.
     */
    variant?: 'text' | 'outlined' | 'contained';
  };
  defaultComponent: D;
  classKey: ButtonGroupClassKey;
}

/**
 *
 * Demos:
 *
 * - [Button Group](https://material-ui.com/components/button-group/)
 *
 * API:
 *
 * - [ButtonGroup API](https://material-ui.com/api/button-group/)
 */
declare const ButtonGroup: OverridableComponent<ButtonGroupTypeMap>;

type ButtonGroupClassKey =
  | 'root'
  | 'contained'
  | 'disabled'
  | 'disableElevation'
  | 'fullWidth'
  | 'vertical'
  | 'grouped'
  | 'groupedHorizontal'
  | 'groupedVertical'
  | 'groupedText'
  | 'groupedTextHorizontal'
  | 'groupedTextVertical'
  | 'groupedTextPrimary'
  | 'groupedTextSecondary'
  | 'groupedOutlined'
  | 'groupedOutlinedHorizontal'
  | 'groupedOutlinedVertical'
  | 'groupedOutlinedPrimary'
  | 'groupedOutlinedSecondary'
  | 'groupedContained'
  | 'groupedContainedHorizontal'
  | 'groupedContainedVertical'
  | 'groupedContainedPrimary'
  | 'groupedContainedSecondary';

type ButtonGroupProps<
  D extends ElementType = ButtonGroupTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<ButtonGroupTypeMap<P, D>, D>;

type CardActionAreaTypeMap<P, D extends React.ElementType> = ExtendButtonBaseTypeMap<{
  props: P & {
    focusVisibleClassName?: string;
  };
  defaultComponent: D;
  classKey: CardActionAreaClassKey;
}>;

/**
 *
 * Demos:
 *
 * - [Cards](https://material-ui.com/components/cards/)
 *
 * API:
 *
 * - [CardActionArea API](https://material-ui.com/api/card-action-area/)
 * - inherits [ButtonBase API](https://material-ui.com/api/button-base/)
 */
declare const CardActionArea: ExtendButtonBase<CardActionAreaTypeMap<
  {},
  ButtonBaseTypeMap['defaultComponent']
>>;

type CardActionAreaClassKey = 'root' | 'focusVisible' | 'focusHighlight';

type CardActionAreaProps<
  D extends React.ElementType = ButtonBaseTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<CardActionAreaTypeMap<P, D>, D>;

interface CardActionsProps
  extends StandardProps<HTMLAttributes<HTMLDivElement>, CardActionsClassKey> {
  /**
   * The content of the component.
   */
  children?: ReactNode;
  /**
   * If `true`, the actions do not have additional margin.
   */
  disableSpacing?: boolean;
}

type CardActionsClassKey = 'root' | 'spacing';

/**
 *
 * Demos:
 *
 * - [Cards](https://material-ui.com/components/cards/)
 *
 * API:
 *
 * - [CardActions API](https://material-ui.com/api/card-actions/)
 */
declare function CardActions(props: CardActionsProps): JSX.Element;

interface CardProps extends StandardProps<PaperProps, CardClassKey> {
  /**
   * If `true`, the card will use raised styling.
   */
  raised?: boolean;
}

type CardClassKey = 'root';

/**
 *
 * Demos:
 *
 * - [Cards](https://material-ui.com/components/cards/)
 *
 * API:
 *
 * - [Card API](https://material-ui.com/api/card/)
 * - inherits [Paper API](https://material-ui.com/api/paper/)
 */
declare function Card(props: CardProps): JSX.Element;

interface CardContentTypeMap<P = {}, D extends ElementType = 'div'> {
  props: P & {
    /**
     * The content of the component.
     */
    children?: ReactNode;
  };
  defaultComponent: D;
  classKey: CardContentClassKey;
}
/**
 *
 * Demos:
 *
 * - [Cards](https://material-ui.com/components/cards/)
 *
 * API:
 *
 * - [CardContent API](https://material-ui.com/api/card-content/)
 */
declare const CardContent: OverridableComponent<CardContentTypeMap>;

type CardContentClassKey = 'root';

type CardContentProps<
  D extends ElementType = CardContentTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<CardContentTypeMap<P, D>, D>;

type Variant$1 = Variant | 'srOnly';

interface TypographyTypeMap<P = {}, D extends ElementType = 'span'> {
  props: P & {
    align?: PropTypes.Alignment;
    /**
     * The content of the component.
     */
    children?: ReactNode;
    color?:
      | 'initial'
      | 'inherit'
      | 'primary'
      | 'secondary'
      | 'textPrimary'
      | 'textSecondary'
      | 'error';
    display?: 'initial' | 'block' | 'inline';
    gutterBottom?: boolean;
    noWrap?: boolean;
    paragraph?: boolean;
    variant?: Variant$1 | 'inherit';
    variantMapping?: Partial<Record<Variant$1, string>>;
  };
  defaultComponent: D;
  classKey: TypographyClassKey;
}

/**
 *
 * Demos:
 *
 * - [Breadcrumbs](https://material-ui.com/components/breadcrumbs/)
 * - [Typography](https://material-ui.com/components/typography/)
 *
 * API:
 *
 * - [Typography API](https://material-ui.com/api/typography/)
 */
declare const Typography$1: OverridableComponent<TypographyTypeMap>;

type TypographyProps<
  D extends ElementType = TypographyTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<TypographyTypeMap<P, D>, D>;

type TypographyClassKey =
  | 'root'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'subtitle1'
  | 'subtitle2'
  | 'body1'
  | 'body2'
  | 'caption'
  | 'button'
  | 'overline'
  | 'srOnly'
  | 'alignLeft'
  | 'alignCenter'
  | 'alignRight'
  | 'alignJustify'
  | 'noWrap'
  | 'gutterBottom'
  | 'paragraph'
  | 'colorInherit'
  | 'colorPrimary'
  | 'colorSecondary'
  | 'colorTextPrimary'
  | 'colorTextSecondary'
  | 'colorError'
  | 'displayInline'
  | 'displayBlock';

interface CardHeaderTypeMap<
  Props = {},
  DefaultComponent extends ElementType = 'div',
  TitleTypographyComponent extends ElementType = 'span',
  SubheaderTypographyComponent extends ElementType = 'span'
> {
  props: Props & {
    /**
     * The action to display in the card header.
     */
    action?: ReactNode;
    /**
     * The Avatar for the Card Header.
     */
    avatar?: ReactNode;
    /**
     * If `true`, `subheader` and `title` won't be wrapped by a Typography component.
     * This can be useful to render an alternative Typography variant by wrapping
     * the `title` text, and optional `subheader` text
     * with the Typography component.
     */
    disableTypography?: boolean;
    /**
     * The content of the component.
     */
    subheader?: ReactNode;
    /**
     * These props will be forwarded to the subheader
     * (as long as disableTypography is not `true`).
     */
    subheaderTypographyProps?: TypographyProps<
      SubheaderTypographyComponent,
      { component?: SubheaderTypographyComponent }
    >;
    /**
     * The content of the Card Title.
     */
    title?: ReactNode;
    /**
     * These props will be forwarded to the title
     * (as long as disableTypography is not `true`).
     */
    titleTypographyProps?: TypographyProps<
      TitleTypographyComponent,
      { component?: TitleTypographyComponent }
    >;
  };
  defaultComponent: DefaultComponent;
  classKey: CardHeaderClassKey;
}
/**
 *
 * Demos:
 *
 * - [Cards](https://material-ui.com/components/cards/)
 *
 * API:
 *
 * - [CardHeader API](https://material-ui.com/api/card-header/)
 */
declare const CardHeader: OverridableCardHeader;

interface OverridableCardHeader extends OverridableComponent<CardHeaderTypeMap> {
  <
    DefaultComponent extends ElementType = CardHeaderTypeMap['defaultComponent'],
    Props = {},
    TitleTypographyComponent extends ElementType = 'span',
    SubheaderTypographyComponent extends ElementType = 'span'
  >(
    props: CardHeaderPropsWithComponent<
      DefaultComponent,
      Props,
      TitleTypographyComponent,
      SubheaderTypographyComponent
    >
  ): JSX.Element;
}

type CardHeaderClassKey = 'root' | 'avatar' | 'action' | 'content' | 'title' | 'subheader';

type CardHeaderProps<
  DefaultComponent extends ElementType = CardHeaderTypeMap['defaultComponent'],
  Props = {},
  TitleTypographyComponent extends ElementType = 'span',
  SubheaderTypographyComponent extends ElementType = 'span'
> = OverrideProps<
  CardHeaderTypeMap<
    Props,
    DefaultComponent,
    TitleTypographyComponent,
    SubheaderTypographyComponent
  >,
  DefaultComponent
>;

type CardHeaderPropsWithComponent<
  DefaultComponent extends ElementType = CardHeaderTypeMap['defaultComponent'],
  Props = {},
  TitleTypographyComponent extends ElementType = 'span',
  SubheaderTypographyComponent extends ElementType = 'span'
> = {
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component?: DefaultComponent;
} & CardHeaderProps<
  DefaultComponent,
  Props,
  TitleTypographyComponent,
  SubheaderTypographyComponent
>;

interface CardMediaTypeMap<P, D extends ElementType> {
  props: P & {
    /**
     * The content of the component.
     */
    children?: ReactNode;
    /**
     * Image to be displayed as a background image.
     * Either `image` or `src` prop must be specified.
     * Note that caller must specify height otherwise the image will not be visible.
     */
    image?: string;
    /**
     * An alias for `image` property.
     * Available only with media components.
     * Media components: `video`, `audio`, `picture`, `iframe`, `img`.
     */
    src?: string;
  };
  defaultComponent: D;
  classKey: CardMediaClassKey;
}

/**
 *
 * Demos:
 *
 * - [Cards](https://material-ui.com/components/cards/)
 *
 * API:
 *
 * - [CardMedia API](https://material-ui.com/api/card-media/)
 */
declare const CardMedia: OverridableComponent<CardMediaTypeMap<{}, 'div'>>;

type CardMediaClassKey = 'root' | 'media';

type CardMediaProps<D extends ElementType = 'div', P = {}> = OverrideProps<
  CardMediaTypeMap<P, D>,
  D
>;

type IconButtonTypeMap<
  P = {},
  D extends React.ElementType = 'button'
> = ExtendButtonBaseTypeMap<{
  props: P & {
    color?: PropTypes.Color;
    disableFocusRipple?: boolean;
    /**
     * If given, uses a negative margin to counteract the padding on one
     * side (this is often helpful for aligning the left or right
     * side of the icon with content above or below, without ruining the border
     * size and shape).
     */
    edge?: 'start' | 'end' | false;
    size?: 'small' | 'medium';
  };
  defaultComponent: D;
  classKey: IconButtonClassKey;
}>;

/**
 * Refer to the [Icons](https://material-ui.com/components/icons/) section of the documentation
 * regarding the available icon options.
 * Demos:
 *
 * - [Buttons](https://material-ui.com/components/buttons/)
 *
 * API:
 *
 * - [IconButton API](https://material-ui.com/api/icon-button/)
 * - inherits [ButtonBase API](https://material-ui.com/api/button-base/)
 */
declare const IconButton: ExtendButtonBase<IconButtonTypeMap>;

type IconButtonClassKey =
  | 'root'
  | 'edgeStart'
  | 'edgeEnd'
  | 'colorInherit'
  | 'colorPrimary'
  | 'colorSecondary'
  | 'disabled'
  | 'sizeSmall'
  | 'label';

type IconButtonProps<
  D extends React.ElementType = IconButtonTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<IconButtonTypeMap<P, D>, D>;

interface SwitchBaseProps
  extends StandardProps<
    IconButtonProps,
    SwitchBaseClassKey,
    'children' | 'onChange' | 'type' | 'value'
  > {
  autoFocus?: boolean;
  /**
   * If `true`, the component is checked.
   */
  checked?: boolean;
  checkedIcon: ReactNode;
  defaultChecked?: boolean;
  disabled?: boolean;
  /**
   * If `true`, the ripple effect will be disabled.
   */
  disableRipple?: boolean;
  icon: ReactNode;
  /**
   * The id of the `input` element.
   */
  id?: string;
  /**
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element.
   */
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  /**
   * Pass a ref to the `input` element.
   */
  inputRef?: Ref<any>;
  /**
   * Name attribute of the `input` element.
   */
  name?: string;
  /**
   * Callback fired when the state is changed.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   * You can pull out the new checked state by accessing `event.target.checked` (boolean).
   */
  onChange?: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  readOnly?: boolean;
  /**
   * If `true`, the `input` element will be required.
   */
  required?: boolean;
  tabIndex?: number;
  type?: InputHTMLAttributes<HTMLInputElement>['type'];
  /**
   * The value of the component. The DOM API casts this to a string.
   */
  value?: unknown;
}

type SwitchBaseClassKey = 'root' | 'checked' | 'disabled' | 'input';

interface CheckboxProps
  extends StandardProps<
    SwitchBaseProps,
    CheckboxClassKey,
    'checkedIcon' | 'color' | 'icon' | 'type'
  > {
  /**
   * If `true`, the component is checked.
   */
  checked?: SwitchBaseProps['checked'];
  /**
   * The icon to display when the component is checked.
   */
  checkedIcon?: ReactNode;
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   */
  color?: 'primary' | 'secondary' | 'default';
  /**
   * If `true`, the checkbox will be disabled.
   */
  disabled?: SwitchBaseProps['disabled'];
  /**
   * If `true`, the ripple effect will be disabled.
   */
  disableRipple?: SwitchBaseProps['disableRipple'];
  /**
   * The icon to display when the component is unchecked.
   */
  icon?: ReactNode;
  /**
   * The id of the `input` element.
   */
  id?: SwitchBaseProps['id'];
  /**
   * If `true`, the component appears indeterminate.
   * This does not set the native input element to indeterminate due
   * to inconsistent behavior across browsers.
   * However, we set a `data-indeterminate` attribute on the input.
   */
  indeterminate?: boolean;
  /**
   * The icon to display when the component is indeterminate.
   */
  indeterminateIcon?: ReactNode;
  /**
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element.
   */
  inputProps?: SwitchBaseProps['inputProps'];
  /**
   * Pass a ref to the `input` element.
   */
  inputRef?: Ref<HTMLInputElement>;
  /**
   * Callback fired when the state is changed.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new checked state by accessing `event.target.checked` (boolean).
   */
  onChange?: SwitchBaseProps['onChange'];
  /**
   * If `true`, the `input` element will be required.
   */
  required?: SwitchBaseProps['required'];
  /**
   * The size of the checkbox.
   * `small` is equivalent to the dense checkbox styling.
   */
  size?: 'small' | 'medium';
  /**
   * The value of the component. The DOM API casts this to a string.
   * The browser uses "on" as the default value.
   */
  value?: SwitchBaseProps['value'];
}

type CheckboxClassKey =
  | SwitchBaseClassKey
  | 'indeterminate'
  | 'colorPrimary'
  | 'colorSecondary';

/**
 *
 * Demos:
 *
 * - [Checkboxes](https://material-ui.com/components/checkboxes/)
 * - [Transfer List](https://material-ui.com/components/transfer-list/)
 *
 * API:
 *
 * - [Checkbox API](https://material-ui.com/api/checkbox/)
 * - inherits [IconButton API](https://material-ui.com/api/icon-button/)
 */
declare function Checkbox(props: CheckboxProps): JSX.Element;

interface ChipTypeMap<P = {}, D extends ElementType = 'div'> {
  props: P & {
    /**
     * Avatar element.
     */
    avatar?: ReactElement;
    /**
     * This prop isn't supported.
     * Use the `component` prop if you need to change the children structure.
     */
    children?: null;
    /**
     * If `true`, the chip will appear clickable, and will raise when pressed,
     * even if the onClick prop is not defined.
     * If false, the chip will not be clickable, even if onClick prop is defined.
     * This can be used, for example,
     * along with the component prop to indicate an anchor Chip is clickable.
     */
    clickable?: boolean;
    /**
     * The color of the component. It supports those theme colors that make sense for this component.
     */
    color?: Exclude<PropTypes.Color, 'inherit'>;
    /**
     * Override the default delete icon element. Shown only if `onDelete` is set.
     */
    deleteIcon?: ReactElement;
    /**
     * If `true`, the chip should be displayed in a disabled state.
     */
    disabled?: boolean;
    /**
     * Icon element.
     */
    icon?: ReactElement;
    /**
     * The content of the label.
     */
    label?: ReactNode;
    /**
     * Callback function fired when the delete icon is clicked.
     * If set, the delete icon will be shown.
     */
    onDelete?: EventHandler<any>;
    /**
     * The size of the chip.
     */
    size?: 'small' | 'medium';
    /**
     * The variant to use.
     */
    variant?: 'default' | 'outlined';
  };
  defaultComponent: D;
  classKey: ChipClassKey;
}

/**
 * Chips represent complex entities in small blocks, such as a contact.
 * Demos:
 *
 * - [Chips](https://material-ui.com/components/chips/)
 *
 * API:
 *
 * - [Chip API](https://material-ui.com/api/chip/)
 */
declare const Chip: OverridableComponent<ChipTypeMap>;

type ChipClassKey =
  | 'root'
  | 'sizeSmall'
  | 'colorPrimary'
  | 'colorSecondary'
  | 'disabled'
  | 'clickable'
  | 'clickableColorPrimary'
  | 'clickableColorSecondary'
  | 'deletable'
  | 'deletableColorPrimary'
  | 'deletableColorSecondary'
  | 'outlined'
  | 'outlinedPrimary'
  | 'outlinedSecondary'
  | 'avatar'
  | 'avatarSmall'
  | 'avatarColorPrimary'
  | 'avatarColorSecondary'
  | 'icon'
  | 'iconSmall'
  | 'iconColorPrimary'
  | 'iconColorSecondary'
  | 'label'
  | 'labelSmall'
  | 'deleteIcon'
  | 'deleteIconSmall'
  | 'deleteIconColorPrimary'
  | 'deleteIconColorSecondary'
  | 'deleteIconOutlinedColorPrimary'
  | 'deleteIconOutlinedColorSecondary';

type ChipProps<
  D extends ElementType = ChipTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<ChipTypeMap<P, D>, D>;

interface CircularProgressProps
  extends StandardProps<
    HTMLAttributes<HTMLDivElement>,
    CircularProgressClassKey,
    'children'
  > {
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   */
  color?: 'primary' | 'secondary' | 'inherit';
  /**
   * If `true`, the shrink animation is disabled.
   * This only works if variant is `indeterminate`.
   */
  disableShrink?: boolean;
  /**
   * The size of the circle.
   * If using a number, the pixel unit is assumed.
   * If using a string, you need to provide the CSS unit, e.g '3rem'.
   */
  size?: number | string;
  /**
   * The thickness of the circle.
   */
  thickness?: number;
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   */
  value?: number;
  /**
   * The variant to use.
   * Use indeterminate when there is no progress value.
   */
  variant?: 'determinate' | 'indeterminate' | 'static';
}

type CircularProgressClassKey =
  | 'root'
  | 'static'
  | 'determinate'
  | 'indeterminate'
  | 'colorPrimary'
  | 'colorSecondary'
  | 'svg'
  | 'circle'
  | 'circleStatic'
  | 'circleDeterminate'
  | 'circleIndeterminate'
  | 'circleDisableShrink';

/**
 * ## ARIA
 *
 * If the progress bar is describing the loading progress of a particular region of a page,
 * you should use `aria-describedby` to point to the progress bar, and set the `aria-busy`
 * attribute to `true` on that region until it has finished loading.
 * Demos:
 *
 * - [Progress](https://material-ui.com/components/progress/)
 *
 * API:
 *
 * - [CircularProgress API](https://material-ui.com/api/circular-progress/)
 */
declare function CircularProgress(props: CircularProgressProps): JSX.Element;

interface CollapseProps extends StandardProps<TransitionProps$1, CollapseClassKey, 'timeout'> {
  /**
   * The content node to be collapsed.
   */
  children?: ReactNode;
  /**
   * The height of the container when collapsed.
   */
  collapsedHeight?: string | number;
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component?: ElementType<TransitionProps$1>;
  /**
   * Enable this prop if you encounter 'Function components cannot be given refs',
   * use `unstable_createStrictModeTheme`,
   * and can't forward the ref in the passed `Component`.
   */
  disableStrictModeCompat?: boolean;
  /**
   * If `true`, the component will transition in.
   */
  in?: boolean;
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   *
   * Set to 'auto' to automatically calculate transition time based on height.
   */
  timeout?: TransitionProps$1['timeout'] | 'auto';
}

type CollapseClassKey = 'container' | 'entered' | 'hidden' | 'wrapper' | 'wrapperInner';

/**
 * The Collapse transition is used by the
 * [Vertical Stepper](https://material-ui.com/components/steppers/#vertical-stepper) StepContent component.
 * It uses [react-transition-group](https://github.com/reactjs/react-transition-group) internally.
 * Demos:
 *
 * - [Cards](https://material-ui.com/components/cards/)
 * - [Lists](https://material-ui.com/components/lists/)
 * - [Transitions](https://material-ui.com/components/transitions/)
 *
 * API:
 *
 * - [Collapse API](https://material-ui.com/api/collapse/)
 * - inherits [Transition API](https://reactcommunity.org/react-transition-group/transition#Transition-props)
 */

declare function Collapse(props: CollapseProps): JSX.Element;

interface ContainerTypeMap<P = {}, D extends ElementType = 'div'> {
  props: P & {
    children: NonNullable<ReactNode>;
    /**
     * If `true`, the left and right padding is removed.
     */
    disableGutters?: boolean;
    /**
     * Set the max-width to match the min-width of the current breakpoint.
     * This is useful if you'd prefer to design for a fixed set of sizes
     * instead of trying to accommodate a fully fluid viewport.
     * It's fluid by default.
     */
    fixed?: boolean;
    /**
     * Determine the max-width of the container.
     * The container width grows with the size of the screen.
     * Set to `false` to disable `maxWidth`.
     */
    maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  };
  defaultComponent: D;
  classKey: ContainerClassKey;
}
/**
 *
 * Demos:
 *
 * - [Container](https://material-ui.com/components/container/)
 *
 * API:
 *
 * - [Container API](https://material-ui.com/api/container/)
 */
declare const Container: OverridableComponent<ContainerTypeMap>;

type ContainerClassKey =
  | 'root'
  | 'disableGutters'
  | 'fixed'
  | 'maxWidthXs'
  | 'maxWidthSm'
  | 'maxWidthMd'
  | 'maxWidthLg'
  | 'maxWidthXl';

type ContainerProps<
  D extends ElementType = ContainerTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<ContainerTypeMap<P, D>, D>;

interface DialogActionsProps
  extends StandardProps<HTMLAttributes<HTMLDivElement>, DialogActionsClassKey> {
  /**
   * The content of the component.
   */
  children?: ReactNode;
  /**
   * If `true`, the actions do not have additional margin.
   */
  disableSpacing?: boolean;
}

type DialogActionsClassKey = 'root' | 'spacing';

/**
 *
 * Demos:
 *
 * - [Dialogs](https://material-ui.com/components/dialogs/)
 *
 * API:
 *
 * - [DialogActions API](https://material-ui.com/api/dialog-actions/)
 */
declare function DialogActions(props: DialogActionsProps): JSX.Element;

interface PortalProps {
  /**
   * The children to render into the `container`.
   */
  children?: ReactNode;
  /**
   * A HTML element, component instance, or function that returns either.
   * The `container` will have the portal children appended to it.
   *
   * By default, it uses the body of the top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container?: ReactInstance | (() => ReactInstance | null) | null;
  /**
   * Disable the portal behavior.
   * The children stay within it's parent DOM hierarchy.
   */
  disablePortal?: boolean;
  /**
   * Callback fired once the children has been mounted into the `container`.
   *
   * This prop will be deprecated and removed in v5, the ref can be used instead.
   */
  onRendered?: () => void;
}

/**
 * Portals provide a first-class way to render children into a DOM node
 * that exists outside the DOM hierarchy of the parent component.
 * Demos:
 *
 * - [Portal](https://material-ui.com/components/portal/)
 *
 * API:
 *
 * - [Portal API](https://material-ui.com/api/portal/)
 */
declare function Portal(props: PortalProps): JSX.Element;

interface ModalProps
  extends StandardProps<HTMLAttributes<HTMLDivElement>, never, 'children'> {
  BackdropComponent?: ElementType<BackdropProps>;
  BackdropProps?: Partial<BackdropProps>;
  children: ReactElement;
  closeAfterTransition?: boolean;
  container?: PortalProps['container'];
  disableAutoFocus?: boolean;
  disableBackdropClick?: boolean;
  disableEnforceFocus?: boolean;
  disableEscapeKeyDown?: boolean;
  disablePortal?: PortalProps['disablePortal'];
  disableRestoreFocus?: boolean;
  disableScrollLock?: boolean;
  hideBackdrop?: boolean;
  keepMounted?: boolean;
  manager?: ModalManager;
  onBackdropClick?: ReactEventHandler<{}>;
  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {object} event The event source of the callback.
   * @param {string} reason Can be: `"escapeKeyDown"`, `"backdropClick"`.
   */
  onClose?: {
    bivarianceHack(event: {}, reason: 'backdropClick' | 'escapeKeyDown'): void;
  }['bivarianceHack'];
  onEscapeKeyDown?: ReactEventHandler<{}>;
  onRendered?: PortalProps['onRendered'];
  open: boolean;
}

/**
 * Modal is a lower-level construct that is leveraged by the following components:
 *
 * -   [Dialog](https://material-ui.com/api/dialog/)
 * -   [Drawer](https://material-ui.com/api/drawer/)
 * -   [Menu](https://material-ui.com/api/menu/)
 * -   [Popover](https://material-ui.com/api/popover/)
 *
 * If you are creating a modal dialog, you probably want to use the [Dialog](https://material-ui.com/api/dialog/) component
 * rather than directly using Modal.
 *
 * This component shares many concepts with [react-overlays](https://react-bootstrap.github.io/react-overlays/#modals).
 * Demos:
 *
 * - [Modal](https://material-ui.com/components/modal/)
 *
 * API:
 *
 * - [Modal API](https://material-ui.com/api/modal/)
 */
declare const Modal: ComponentType<ModalProps>;

declare class ModalManager {
  constructor(opts?: { hideSiblingNodes?: boolean; handleContainerOverflow?: boolean });
  add(modal: any, container: any): number;
  remove(modal: any): void;
  isTopModal(modal: any): boolean;
}

interface DialogProps
  extends StandardProps<ModalProps & Partial<TransitionHandlerProps>, DialogClassKey, 'children'> {
  /**
   * The id(s) of the element(s) that describe the dialog.
   */
  'aria-describedby'?: string;
  /**
   * The id(s) of the element(s) that label the dialog.
   */
  'aria-labelledby'?: string;
  /**
   * Dialog children, usually the included sub-components.
   */
  children?: ReactNode;
  /**
   * If `true`, clicking the backdrop will not fire the `onClose` callback.
   */
  disableBackdropClick?: boolean;
  /**
   * If `true`, hitting escape will not fire the `onClose` callback.
   */
  disableEscapeKeyDown?: boolean;
  /**
   * If `true`, the dialog will be full-screen
   */
  fullScreen?: boolean;
  /**
   * If `true`, the dialog stretches to `maxWidth`.
   *
   * Notice that the dialog width grow is limited by the default margin.
   */
  fullWidth?: boolean;
  /**
   * Determine the max-width of the dialog.
   * The dialog width grows with the size of the screen.
   * Set to `false` to disable `maxWidth`.
   */
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  /**
   * Callback fired when the backdrop is clicked.
   */
  onBackdropClick?: ModalProps['onBackdropClick'];
  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {object} event The event source of the callback.
   * @param {string} reason Can be: `"escapeKeyDown"`, `"backdropClick"`.
   */
  onClose?: ModalProps['onClose'];
  /**
   * Callback fired before the dialog enters.
   */
  onEnter?: TransitionHandlerProps['onEnter'];
  /**
   * Callback fired when the dialog has entered.
   */
  onEntered?: TransitionHandlerProps['onEntered'];
  /**
   * Callback fired when the dialog is entering.
   */
  onEntering?: TransitionHandlerProps['onEntering'];
  /**
   * Callback fired when the escape key is pressed,
   * `disableKeyboard` is false and the modal is in focus.
   */
  onEscapeKeyDown?: ModalProps['onEscapeKeyDown'];
  /**
   * Callback fired before the dialog exits.
   */
  onExit?: TransitionHandlerProps['onExit'];
  /**
   * Callback fired when the dialog has exited.
   */
  onExited?: TransitionHandlerProps['onExited'];
  /**
   * Callback fired when the dialog is exiting.
   */
  onExiting?: TransitionHandlerProps['onExiting'];
  /**
   * If `true`, the Dialog is open.
   */
  open: ModalProps['open'];
  /**
   * The component used to render the body of the dialog.
   */
  PaperComponent?: ComponentType<PaperProps>;
  /**
   * Props applied to the [`Paper`](/api/paper/) element.
   */
  PaperProps?: Partial<PaperProps>;
  /**
   * Determine the container for scrolling the dialog.
   */
  scroll?: 'body' | 'paper';
  /**
   * The component used for the transition.
   * [Follow this guide](/components/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   */
  TransitionComponent?: ComponentType<
    TransitionProps$1 & { children?: ReactElement<any, any> }
  >;
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   */
  transitionDuration?: TransitionProps$1['timeout'];
  /**
   * Props applied to the [`Transition`](http://reactcommunity.org/react-transition-group/transition#Transition-props) element.
   */
  TransitionProps?: TransitionProps$1;
}

type DialogClassKey =
  | 'root'
  | 'scrollPaper'
  | 'scrollBody'
  | 'container'
  | 'paper'
  | 'paperScrollPaper'
  | 'paperScrollBody'
  | 'paperWidthFalse'
  | 'paperWidthXs'
  | 'paperWidthSm'
  | 'paperWidthMd'
  | 'paperWidthLg'
  | 'paperWidthXl'
  | 'paperFullWidth'
  | 'paperFullScreen';

/**
 * Dialogs are overlaid modal paper based components with a backdrop.
 * Demos:
 *
 * - [Dialogs](https://material-ui.com/components/dialogs/)
 *
 * API:
 *
 * - [Dialog API](https://material-ui.com/api/dialog/)
 * - inherits [Modal API](https://material-ui.com/api/modal/)
 */
declare function Dialog(props: DialogProps): JSX.Element;

interface DialogContentProps
  extends StandardProps<HTMLAttributes<HTMLDivElement>, DialogContentClassKey> {
  /**
   * The content of the component.
   */
  children?: ReactNode;
  /**
   * Display the top and bottom dividers.
   */
  dividers?: boolean;
}

type DialogContentClassKey = 'root' | 'dividers';

/**
 *
 * Demos:
 *
 * - [Dialogs](https://material-ui.com/components/dialogs/)
 *
 * API:
 *
 * - [DialogContent API](https://material-ui.com/api/dialog-content/)
 */
declare function DialogContent(props: DialogContentProps): JSX.Element;

interface DialogContentTextTypeMap<
  P = {},
  D extends ElementType = TypographyTypeMap['defaultComponent']
> {
  props: P & TypographyTypeMap['props'];
  defaultComponent: D;
  classKey: DialogContentTextClassKey;
}

type DialogContentTextClassKey = 'root';

/**
 *
 * Demos:
 *
 * - [Dialogs](https://material-ui.com/components/dialogs/)
 *
 * API:
 *
 * - [DialogContentText API](https://material-ui.com/api/dialog-content-text/)
 * - inherits [Typography API](https://material-ui.com/api/typography/)
 */
declare const DialogContentText: OverridableComponent<DialogContentTextTypeMap>;

type DialogContentTextProps<
  D extends ElementType = DialogContentTextTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<DialogContentTextTypeMap<P, D>, D>;

interface DialogTitleProps
  extends StandardProps<HTMLAttributes<HTMLDivElement>, DialogTitleClassKey> {
  /**
   * The content of the component.
   */
  children?: ReactNode;
  /**
   * If `true`, the children won't be wrapped by a typography component.
   * For instance, this can be useful to render an h4 instead of the default h2.
   */
  disableTypography?: boolean;
}

type DialogTitleClassKey = 'root';

/**
 *
 * Demos:
 *
 * - [Dialogs](https://material-ui.com/components/dialogs/)
 *
 * API:
 *
 * - [DialogTitle API](https://material-ui.com/api/dialog-title/)
 */
declare function DialogTitle(props: DialogTitleProps): JSX.Element;

interface DividerTypeMap<P = {}, D extends React.ElementType = 'hr'> {
  props: P & {
    /**
     * Absolutely position the element.
     */
    absolute?: boolean;
    /**
     * If `true`, a vertical divider will have the correct height when used in flex container.
     * (By default, a vertical divider will have a calculated height of `0px` if it is the child of a flex container.)
     */
    flexItem?: boolean;
    /**
     * If `true`, the divider will have a lighter color.
     */
    light?: boolean;
    /**
     * The divider orientation.
     */
    orientation?: 'horizontal' | 'vertical';
    /**
     * The variant to use.
     */
    variant?: 'fullWidth' | 'inset' | 'middle';
  };
  defaultComponent: D;
  classKey: DividerClassKey;
}

/**
 *
 * Demos:
 *
 * - [Dividers](https://material-ui.com/components/dividers/)
 * - [Lists](https://material-ui.com/components/lists/)
 *
 * API:
 *
 * - [Divider API](https://material-ui.com/api/divider/)
 */
declare const Divider: OverridableComponent<DividerTypeMap>;

type DividerClassKey = 'root' | 'absolute' | 'inset' | 'light' | 'middle' | 'vertical';

type DividerProps<
  D extends React.ElementType = DividerTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<DividerTypeMap<P, D>, D>;

interface SlideProps extends TransitionProps$1 {
  /**
   * A single child content element.
   */
  children?: ReactElement<any, any>;
  /**
   * Direction the child node will enter from.
   */
  direction?: 'left' | 'right' | 'up' | 'down';
  /**
   * If `true`, show the component; triggers the enter or exit animation.
   */
  in?: TransitionProps$1['in'];
  ref?: Ref<unknown>;
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   */
  timeout?: TransitionProps$1['timeout'];
}

/**
 * The Slide transition is used by the [Drawer](https://material-ui.com/components/drawers/) component.
 * It uses [react-transition-group](https://github.com/reactjs/react-transition-group) internally.
 * Demos:
 *
 * - [Dialogs](https://material-ui.com/components/dialogs/)
 * - [Transitions](https://material-ui.com/components/transitions/)
 *
 * API:
 *
 * - [Slide API](https://material-ui.com/api/slide/)
 * - inherits [Transition API](https://reactcommunity.org/react-transition-group/transition#Transition-props)
 */
declare function Slide(props: SlideProps): JSX.Element;

interface DrawerProps
  extends StandardProps<
    ModalProps & Partial<TransitionHandlerProps>,
    DrawerClassKey,
    'open' | 'children'
  > {
  /**
   * Side from which the drawer will appear.
   */
  anchor?: 'left' | 'top' | 'right' | 'bottom';
  /**
   * The contents of the drawer.
   */
  children?: ReactNode;
  /**
   * The elevation of the drawer.
   */
  elevation?: number;
  /**
   * Props applied to the [`Modal`](/api/modal/) element.
   */
  ModalProps?: Partial<ModalProps>;
  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {object} event The event source of the callback.
   */
  onClose?: ModalProps['onClose'];
  /**
   * If `true`, the drawer is open.
   */
  open?: boolean;
  /**
   * Props applied to the [`Paper`](/api/paper/) element.
   */
  PaperProps?: Partial<PaperProps>;
  /**
   * Props applied to the [`Slide`](/api/slide/) element.
   */
  SlideProps?: Partial<SlideProps>;
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   */
  transitionDuration?: TransitionProps$1['timeout'];
  /**
   * The variant to use.
   */
  variant?: 'permanent' | 'persistent' | 'temporary';
}

type DrawerClassKey =
  | 'root'
  | 'docked'
  | 'paper'
  | 'paperAnchorLeft'
  | 'paperAnchorRight'
  | 'paperAnchorTop'
  | 'paperAnchorBottom'
  | 'paperAnchorDockedLeft'
  | 'paperAnchorDockedTop'
  | 'paperAnchorDockedRight'
  | 'paperAnchorDockedBottom'
  | 'modal';

/**
 * The props of the [Modal](https://material-ui.com/api/modal/) component are available
 * when `variant="temporary"` is set.
 * Demos:
 *
 * - [Drawers](https://material-ui.com/components/drawers/)
 *
 * API:
 *
 * - [Drawer API](https://material-ui.com/api/drawer/)
 */
declare function Drawer(props: DrawerProps): JSX.Element;

interface AccordionActionsProps
  extends StandardProps<HTMLAttributes<HTMLDivElement>, AccordionActionsClassKey> {
  /**
   * The content of the component.
   */
  children?: ReactNode;
  /**
   * If `true`, the actions do not have additional margin.
   */
  disableSpacing?: boolean;
}

type AccordionActionsClassKey = 'root' | 'spacing';

/**
 *
 * Demos:
 *
 * - [Accordion](https://material-ui.com/components/accordion/)
 *
 * API:
 *
 * - [AccordionActions API](https://material-ui.com/api/accordion-actions/)
 */
declare function AccordionActions(props: AccordionActionsProps): JSX.Element;

interface AccordionProps extends StandardProps<PaperProps, AccordionClassKey, 'onChange'> {
  /**
   * The content of the accordion.
   */
  children: NonNullable<ReactNode>;
  /**
   * If `true`, expands the accordion by default.
   */
  defaultExpanded?: boolean;
  /**
   * If `true`, the accordion will be displayed in a disabled state.
   */
  disabled?: boolean;
  /**
   * If `true`, expands the accordion, otherwise collapse it.
   * Setting this prop enables control over the accordion.
   */
  expanded?: boolean;
  /**
   * Callback fired when the expand/collapse state is changed.
   *
   * @param {object} event The event source of the callback.
   * @param {boolean} expanded The `expanded` state of the accordion.
   */
  onChange?: (event: ChangeEvent<{}>, expanded: boolean) => void;
  /**
   * The component used for the collapse effect.
   * [Follow this guide](/components/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   */
  TransitionComponent?: ComponentType<
    TransitionProps$1 & { children?: ReactElement<any, any> }
  >;
  /**
   * Props applied to the [`Transition`](http://reactcommunity.org/react-transition-group/transition#Transition-props) element.
   */
  TransitionProps?: TransitionProps$1;
}

type AccordionClassKey = 'root' | 'rounded' | 'expanded' | 'disabled';

/**
 *
 * Demos:
 *
 * - [Accordion](https://material-ui.com/components/accordion/)
 *
 * API:
 *
 * - [Accordion API](https://material-ui.com/api/accordion/)
 * - inherits [Paper API](https://material-ui.com/api/paper/)
 */
declare function Accordion(props: AccordionProps): JSX.Element;

interface AccordionDetailsProps
  extends StandardProps<HTMLAttributes<HTMLDivElement>, AccordionDetailsClassKey> {
  /**
   * The content of the accordion details.
   */
  children?: ReactNode;
}

type AccordionDetailsClassKey = 'root';

/**
 *
 * Demos:
 *
 * - [Accordion](https://material-ui.com/components/accordion/)
 *
 * API:
 *
 * - [AccordionDetails API](https://material-ui.com/api/accordion-details/)
 */
declare function AccordionDetails(props: AccordionDetailsProps): JSX.Element;

type AccordionSummaryTypeMap<
  P = {},
  D extends ElementType = 'div'
> = ExtendButtonBaseTypeMap<{
  props: P & {
    /**
     * The content of the accordion summary.
     */
    children?: ReactNode;
    /**
     * The icon to display as the expand indicator.
     */
    expandIcon?: ReactNode;
    /**
     * Props applied to the `IconButton` element wrapping the expand icon.
     */
    IconButtonProps?: Partial<IconButtonProps>;
  };
  defaultComponent: D;
  classKey: AccordionSummaryClassKey;
}>;

/**
 *
 * Demos:
 *
 * - [Accordion](https://material-ui.com/components/accordion/)
 *
 * API:
 *
 * - [AccordionSummary API](https://material-ui.com/api/accordion-summary/)
 * - inherits [ButtonBase API](https://material-ui.com/api/button-base/)
 */
declare const AccordionSummary: ExtendButtonBase<AccordionSummaryTypeMap>;

type AccordionSummaryClassKey =
  | 'root'
  | 'expanded'
  | 'focused'
  | 'disabled'
  | 'content'
  | 'expandIcon';

type AccordionSummaryProps<
  D extends ElementType = AccordionSummaryTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<AccordionSummaryTypeMap<P, D>, D>;

interface ExpansionPanelActionsProps
  extends StandardProps<HTMLAttributes<HTMLDivElement>, ExpansionPanelActionsClassKey> {
  /**
   * The content of the component.
   */
  children?: ReactNode;
  /**
   * If `true`, the actions do not have additional margin.
   */
  disableSpacing?: boolean;
}

type ExpansionPanelActionsClassKey = 'root' | 'spacing';

/**
 * ⚠️ The ExpansionPanelActions component was renamed to AccordionActions to use a more common naming convention.
 *
 * You should use `import { AccordionActions } from '@material-ui/core'`
 * or `import AccordionActions from '@material-ui/core/AccordionActions'`.
 * API:
 *
 * - [ExpansionPanelActions API](https://material-ui.com/api/expansion-panel-actions/)
 */
declare function ExpansionPanelActions(props: ExpansionPanelActionsProps): JSX.Element;

interface ExpansionPanelProps
  extends StandardProps<PaperProps, ExpansionPanelClassKey, 'onChange'> {
  /**
   * The content of the expansion panel.
   */
  children: NonNullable<ReactNode>;
  /**
   * If `true`, expands the panel by default.
   */
  defaultExpanded?: boolean;
  /**
   * If `true`, the panel will be displayed in a disabled state.
   */
  disabled?: boolean;
  /**
   * If `true`, expands the panel, otherwise collapse it.
   * Setting this prop enables control over the panel.
   */
  expanded?: boolean;
  /**
   * Callback fired when the expand/collapse state is changed.
   *
   * @param {object} event The event source of the callback.
   * @param {boolean} expanded The `expanded` state of the panel.
   */
  onChange?: (event: ChangeEvent<{}>, expanded: boolean) => void;
  /**
   * The component used for the collapse effect.
   * [Follow this guide](/components/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   */
  TransitionComponent?: ComponentType<
    TransitionProps$1 & { children?: ReactElement<any, any> }
  >;
  /**
   * Props applied to the [`Transition`](http://reactcommunity.org/react-transition-group/transition#Transition-props) element.
   */
  TransitionProps?: TransitionProps$1;
}

type ExpansionPanelClassKey = 'root' | 'rounded' | 'expanded' | 'disabled';

/**
 * ⚠️ The ExpansionPanel component was renamed to Accordion to use a more common naming convention.
 *
 * You should use `import { Accordion } from '@material-ui/core'`
 * or `import Accordion from '@material-ui/core/Accordion'`.
 * API:
 *
 * - [ExpansionPanel API](https://material-ui.com/api/expansion-panel/)
 * - inherits [Paper API](https://material-ui.com/api/paper/)
 */
declare function ExpansionPanel(props: ExpansionPanelProps): JSX.Element;

interface ExpansionPanelDetailsProps
  extends StandardProps<HTMLAttributes<HTMLDivElement>, ExpansionPanelDetailsClassKey> {
  /**
   * The content of the expansion panel details.
   */
  children?: ReactNode;
}

type ExpansionPanelDetailsClassKey = 'root';

/**
 * ⚠️ The ExpansionPanelDetails component was renamed to AccordionDetails to use a more common naming convention.
 *
 * You should use `import { AccordionDetails } from '@material-ui/core'`
 * or `import AccordionDetails from '@material-ui/core/AccordionDetails'`.
 * API:
 *
 * - [ExpansionPanelDetails API](https://material-ui.com/api/expansion-panel-details/)
 */
declare function ExpansionPanelDetails(props: ExpansionPanelDetailsProps): JSX.Element;

type ExpansionPanelSummaryTypeMap<
  P = {},
  D extends ElementType = 'div'
> = ExtendButtonBaseTypeMap<{
  props: P & {
    /**
     * The content of the expansion panel summary.
     */
    children?: ReactNode;
    /**
     * The icon to display as the expand indicator.
     */
    expandIcon?: ReactNode;
    /**
     * Props applied to the `IconButton` element wrapping the expand icon.
     */
    IconButtonProps?: Partial<IconButtonProps>;
  };
  defaultComponent: D;
  classKey: ExpansionPanelSummaryClassKey;
}>;

/**
 * ⚠️ The ExpansionPanelSummary component was renamed to AccordionSummary to use a more common naming convention.
 *
 * You should use `import { AccordionSummary } from '@material-ui/core'`
 * or `import AccordionSummary from '@material-ui/core/AccordionSummary'`.
 * API:
 *
 * - [ExpansionPanelSummary API](https://material-ui.com/api/expansion-panel-summary/)
 * - inherits [ButtonBase API](https://material-ui.com/api/button-base/)
 */
declare const ExpansionPanelSummary: ExtendButtonBase<ExpansionPanelSummaryTypeMap>;

type ExpansionPanelSummaryClassKey =
  | 'root'
  | 'expanded'
  | 'focused'
  | 'disabled'
  | 'content'
  | 'expandIcon';

type ExpansionPanelSummaryProps<
  D extends ElementType = ExpansionPanelSummaryTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<ExpansionPanelSummaryTypeMap<P, D>, D>;

type FabTypeMap<P = {}, D extends React.ElementType = 'button'> = ExtendButtonBaseTypeMap<{
  props: P & {
    /**
     * The content of the button.
     */
    children: NonNullable<React.ReactNode>;
    /**
     * The color of the component. It supports those theme colors that make sense for this component.
     */
    color?: PropTypes.Color;
    /**
     * If `true`, the button will be disabled.
     */
    disabled?: boolean;
    /**
     * If `true`, the  keyboard focus ripple will be disabled.
     */
    disableFocusRipple?: boolean;
    /**
     * If `true`, the ripple effect will be disabled.
     */
    disableRipple?: boolean;
    /**
     * The URL to link to when the button is clicked.
     * If defined, an `a` element will be used as the root node.
     */
    href?: string;
    /**
     * The size of the button.
     * `small` is equivalent to the dense button styling.
     */
    size?: 'small' | 'medium' | 'large';
    /**
     * The variant to use.
     */
    variant?: 'round' | 'extended';
  };
  defaultComponent: D;
  classKey: FabClassKey;
}>;

/**
 *
 * Demos:
 *
 * - [Floating Action Button](https://material-ui.com/components/floating-action-button/)
 *
 * API:
 *
 * - [Fab API](https://material-ui.com/api/fab/)
 * - inherits [ButtonBase API](https://material-ui.com/api/button-base/)
 */
declare const Fab: ExtendButtonBase<FabTypeMap>;

type FabProps<
  D extends React.ElementType = FabTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<FabTypeMap<P, D>, D>;

type FabClassKey =
  | 'root'
  | 'label'
  | 'primary'
  | 'secondary'
  | 'extended'
  | 'focusVisible'
  | 'disabled'
  | 'colorInherit'
  | 'sizeSmall'
  | 'sizeMedium';

interface InputBaseProps
  extends StandardProps<
    HTMLAttributes<HTMLDivElement>,
    InputBaseClassKey,
    /*
     * `onChange`, `onKeyUp`, `onKeyDown`, `onBlur`, `onFocus` are applied to the inner `InputComponent`,
     * which by default is an input or textarea. Since these handlers differ from the
     * ones inherited by `React.HTMLAttributes<HTMLDivElement>` we need to omit them.
     */
    'children' | 'onChange' | 'onKeyUp' | 'onKeyDown' | 'onBlur' | 'onFocus' | 'defaultValue'
  > {
  'aria-describedby'?: string;
  /**
   * This prop helps users to fill forms faster, especially on mobile devices.
   * The name can be confusing, as it's more like an autofill.
   * You can learn more about it [following the specification](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill).
   */
  autoComplete?: string;
  /**
   * If `true`, the `input` element will be focused during the first mount.
   */
  autoFocus?: boolean;
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   */
  color?: 'primary' | 'secondary';
  /**
   * The default `input` element value. Use when the component is not controlled.
   */
  defaultValue?: unknown;
  /**
   * If `true`, the `input` element will be disabled.
   */
  disabled?: boolean;
  /**
   * End `InputAdornment` for this component.
   */
  endAdornment?: ReactNode;
  /**
   * If `true`, the input will indicate an error. This is normally obtained via context from
   * FormControl.
   */
  error?: boolean;
  /**
   * If `true`, the input will take up the full width of its container.
   */
  fullWidth?: boolean;
  /**
   * The id of the `input` element.
   */
  id?: string;
  /**
   * The component used for the `input` element.
   * Either a string to use a HTML element or a component.
   */
  inputComponent?: ElementType<InputBaseComponentProps>;
  /**
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element.
   */
  inputProps?: InputBaseComponentProps;
  /**
   * Pass a ref to the `input` element.
   */
  inputRef?: Ref<any>;
  /**
   * If `dense`, will adjust vertical spacing. This is normally obtained via context from
   * FormControl.
   */
  margin?: 'dense' | 'none';
  /**
   * If `true`, a textarea element will be rendered.
   */
  multiline?: boolean;
  /**
   * Name attribute of the `input` element.
   */
  name?: string;
  /**
   * Callback fired when the input is blurred.
   *
   * Notice that the first argument (event) might be undefined.
   */
  onBlur?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  /**
   * Callback fired when the value is changed.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   */
  onChange?: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  onFocus?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onKeyDown?: KeyboardEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  onKeyUp?: KeyboardEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  /**
   * The short hint displayed in the input before the user enters a value.
   */
  placeholder?: string;
  /**
   * It prevents the user from changing the value of the field
   * (not from interacting with the field).
   */
  readOnly?: boolean;
  /**
   * If `true`, the `input` element will be required.
   */
  required?: boolean;
  renderSuffix?: (state: {
    disabled?: boolean;
    error?: boolean;
    filled?: boolean;
    focused?: boolean;
    margin?: 'dense' | 'none' | 'normal';
    required?: boolean;
    startAdornment?: ReactNode;
  }) => ReactNode;
  /**
   * Number of rows to display when multiline option is set to true.
   */
  rows?: string | number;
  /**
   * Maximum number of rows to display when multiline option is set to true.
   */
  rowsMax?: string | number;
  /**
   * Minimum number of rows to display when multiline option is set to true.
   */
  rowsMin?: string | number;
  /**
   * Start `InputAdornment` for this component.
   */
  startAdornment?: ReactNode;
  /**
   * Type of the `input` element. It should be [a valid HTML5 input type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types).
   */
  type?: string;
  /**
   * The value of the `input` element, required for a controlled component.
   */
  value?: unknown;
}

interface InputBaseComponentProps
  extends HTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  // Accommodate arbitrary additional props coming from the `inputProps` prop
  [arbitrary: string]: any;
}

type InputBaseClassKey =
  | 'root'
  | 'formControl'
  | 'focused'
  | 'disabled'
  | 'adornedEnd'
  | 'adornedStart'
  | 'error'
  | 'marginDense'
  | 'multiline'
  | 'fullWidth'
  | 'colorSecondary'
  | 'input'
  | 'inputMarginDense'
  | 'inputMultiline'
  | 'inputTypeSearch'
  | 'inputAdornedStart'
  | 'inputAdornedEnd'
  | 'inputHiddenLabel';

/**
 * `InputBase` contains as few styles as possible.
 * It aims to be a simple building block for creating an input.
 * It contains a load of style reset and some state logic.
 * Demos:
 *
 * - [Text Fields](https://material-ui.com/components/text-fields/)
 *
 * API:
 *
 * - [InputBase API](https://material-ui.com/api/input-base/)
 */
declare function InputBase(props: InputBaseProps): JSX.Element;

interface FilledInputProps extends StandardProps<InputBaseProps, FilledInputClassKey> {
  /**
   * If `true`, the input will not have an underline.
   */
  disableUnderline?: boolean;
}

type FilledInputClassKey = InputBaseClassKey | 'colorSecondary' | 'underline';

/**
 *
 * Demos:
 *
 * - [Text Fields](https://material-ui.com/components/text-fields/)
 *
 * API:
 *
 * - [FilledInput API](https://material-ui.com/api/filled-input/)
 * - inherits [InputBase API](https://material-ui.com/api/input-base/)
 */
declare function FilledInput(props: FilledInputProps): JSX.Element;

interface FormControlTypeMap<P = {}, D extends ElementType = 'div'> {
  props: P & {
    /**
     * The contents of the form control.
     */
    children?: ReactNode;
    /**
     * The color of the component. It supports those theme colors that make sense for this component.
     */
    color?: 'primary' | 'secondary';
    /**
     * If `true`, the label, input and helper text should be displayed in a disabled state.
     */
    disabled?: boolean;
    /**
     * If `true`, the label should be displayed in an error state.
     */
    error?: boolean;
    /**
     * If `true`, the component will take up the full width of its container.
     */
    fullWidth?: boolean;
    /**
     * If `true`, the component will be displayed in focused state.
     */
    focused?: boolean;
    /**
     * If `true`, the label will be hidden.
     * This is used to increase density for a `FilledInput`.
     * Be sure to add `aria-label` to the `input` element.
     */
    hiddenLabel?: boolean;
    /**
     * If `dense` or `normal`, will adjust vertical spacing of this and contained components.
     */
    margin?: PropTypes.Margin;
    /**
     * If `true`, the label will indicate that the input is required.
     */
    required?: boolean;
    /**
     * The size of the text field.
     */
    size?: 'small' | 'medium';
    /**
     * The variant to use.
     */
    variant?: 'standard' | 'outlined' | 'filled';
  };
  defaultComponent: D;
  classKey: FormControlClassKey;
}

/**
 * Provides context such as filled/focused/error/required for form inputs.
 * Relying on the context provides high flexibility and ensures that the state always stays
 * consistent across the children of the `FormControl`.
 * This context is used by the following components:
 *
 * -   FormLabel
 * -   FormHelperText
 * -   Input
 * -   InputLabel
 *
 * You can find one composition example below and more going to [the demos](https://material-ui.com/components/text-fields/#components).
 *
 * ```jsx
 * <FormControl>
 *   <InputLabel htmlFor="my-input">Email address</InputLabel>
 *   <Input id="my-input" aria-describedby="my-helper-text" />
 *   <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
 * </FormControl>
 * ```
 *
 * ⚠️Only one input can be used within a FormControl.
 * Demos:
 *
 * - [Checkboxes](https://material-ui.com/components/checkboxes/)
 * - [Radio Buttons](https://material-ui.com/components/radio-buttons/)
 * - [Switches](https://material-ui.com/components/switches/)
 * - [Text Fields](https://material-ui.com/components/text-fields/)
 *
 * API:
 *
 * - [FormControl API](https://material-ui.com/api/form-control/)
 */
declare const FormControl: OverridableComponent<FormControlTypeMap>;

type FormControlClassKey = 'root' | 'marginNormal' | 'marginDense' | 'fullWidth';

type FormControlProps<
  D extends ElementType = FormControlTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<FormControlTypeMap<P, D>, D>;

type ContextFromPropsKey =
  | 'disabled'
  | 'error'
  | 'fullWidth'
  | 'hiddenLabel'
  | 'margin'
  | 'required'
  | 'variant';

interface FormControlState extends Pick<FormControlProps, ContextFromPropsKey> {
  adornedStart: boolean;
  filled: boolean;
  focused: boolean;
  onBlur: () => void;
  onEmpty: () => void;
  onFilled: () => void;
  onFocus: () => void;
}

declare function useFormControl(): FormControlState | undefined;

interface FormControlLabelProps
  extends StandardProps<
    LabelHTMLAttributes<HTMLLabelElement>,
    FormControlLabelClassKey,
    'children' | 'onChange'
  > {
  /**
   * If `true`, the component appears selected.
   */
  checked?: boolean;
  /**
   * A control element. For instance, it can be be a `Radio`, a `Switch` or a `Checkbox`.
   */
  control: ReactElement<any, any>;
  /**
   * If `true`, the control will be disabled.
   */
  disabled?: boolean;
  /**
   * Pass a ref to the `input` element.
   */
  inputRef?: Ref<any>;
  /**
   * The text to be used in an enclosing label element.
   */
  label: ReactNode;
  /**
   * The position of the label.
   */
  labelPlacement?: 'end' | 'start' | 'top' | 'bottom';
  name?: string;
  /**
   * Callback fired when the state is changed.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new checked state by accessing `event.target.checked` (boolean).
   */
  onChange?: (event: ChangeEvent<{}>, checked: boolean) => void;
  /**
   * The value of the component.
   */
  value?: unknown;
}

type FormControlLabelClassKey =
  | 'root'
  | 'labelPlacementStart'
  | 'labelPlacementTop'
  | 'labelPlacementBottom'
  | 'disabled'
  | 'label';

/**
 * Drop in replacement of the `Radio`, `Switch` and `Checkbox` component.
 * Use this component if you want to display an extra label.
 * Demos:
 *
 * - [Checkboxes](https://material-ui.com/components/checkboxes/)
 * - [Radio Buttons](https://material-ui.com/components/radio-buttons/)
 * - [Switches](https://material-ui.com/components/switches/)
 *
 * API:
 *
 * - [FormControlLabel API](https://material-ui.com/api/form-control-label/)
 */
declare function FormControlLabel(props: FormControlLabelProps): JSX.Element;

interface FormGroupProps
  extends StandardProps<HTMLAttributes<HTMLDivElement>, FormGroupClassKey> {
  /**
   * The content of the component.
   */
  children?: ReactNode;
  /**
   * Display group of elements in a compact row.
   */
  row?: boolean;
}

type FormGroupClassKey = 'root' | 'row';

/**
 * `FormGroup` wraps controls such as `Checkbox` and `Switch`.
 * It provides compact row layout.
 * For the `Radio`, you should be using the `RadioGroup` component instead of this one.
 * Demos:
 *
 * - [Checkboxes](https://material-ui.com/components/checkboxes/)
 * - [Switches](https://material-ui.com/components/switches/)
 *
 * API:
 *
 * - [FormGroup API](https://material-ui.com/api/form-group/)
 */
declare function FormGroup(props: FormGroupProps): JSX.Element;

interface FormHelperTextTypeMap<P = {}, D extends ElementType = 'p'> {
  props: P & {
    /**
     * The content of the component.
     *
     * If `' '` is provided, the component reserves one line height for displaying a future message.
     */
    children?: ReactNode;
    /**
     * If `true`, the helper text should be displayed in a disabled state.
     */
    disabled?: boolean;
    /**
     * If `true`, helper text should be displayed in an error state.
     */
    error?: boolean;
    /**
     * If `true`, the helper text should use filled classes key.
     */
    filled?: boolean;
    /**
     * If `true`, the helper text should use focused classes key.
     */
    focused?: boolean;
    /**
     * If `dense`, will adjust vertical spacing. This is normally obtained via context from
     * FormControl.
     */
    margin?: 'dense';
    /**
     * If `true`, the helper text should use required classes key.
     */
    required?: boolean;
    /**
     * The variant to use.
     */
    variant?: 'standard' | 'outlined' | 'filled';
  };
  defaultComponent: D;
  classKey: FormHelperTextClassKey;
}
/**
 *
 * Demos:
 *
 * - [Text Fields](https://material-ui.com/components/text-fields/)
 *
 * API:
 *
 * - [FormHelperText API](https://material-ui.com/api/form-helper-text/)
 */
declare const FormHelperText: OverridableComponent<FormHelperTextTypeMap>;

type FormHelperTextClassKey =
  | 'root'
  | 'error'
  | 'disabled'
  | 'marginDense'
  | 'focused'
  | 'filled'
  | 'contained'
  | 'required';

type FormHelperTextProps<
  D extends ElementType = FormHelperTextTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<FormHelperTextTypeMap<P, D>, D>;

interface FormLabelTypeMap<P = {}, D extends ElementType = 'label'> {
  props: P &
    FormLabelBaseProps & {
      /**
       * The content of the component.
       */
      children?: ReactNode;
      /**
       * The color of the component. It supports those theme colors that make sense for this component.
       */
      color?: 'primary' | 'secondary';
      /**
       * If `true`, the label should be displayed in a disabled state.
       */
      disabled?: boolean;
      /**
       * If `true`, the label should be displayed in an error state.
       */
      error?: boolean;
      /**
       * If `true`, the label should use filled classes key.
       */
      filled?: boolean;
      /**
       * If `true`, the input of this label is focused (used by `FormGroup` components).
       */
      focused?: boolean;
      /**
       * If `true`, the label will indicate that the input is required.
       */
      required?: boolean;
    };
  defaultComponent: D;
  classKey: FormLabelClassKey;
}

/**
 *
 * Demos:
 *
 * - [Checkboxes](https://material-ui.com/components/checkboxes/)
 * - [Radio Buttons](https://material-ui.com/components/radio-buttons/)
 * - [Switches](https://material-ui.com/components/switches/)
 *
 * API:
 *
 * - [FormLabel API](https://material-ui.com/api/form-label/)
 */
declare const FormLabel: OverridableComponent<FormLabelTypeMap>;

type FormLabelClassKey =
  | 'root'
  | 'colorSecondary'
  | 'focused'
  | 'disabled'
  | 'error'
  | 'filled'
  | 'required'
  | 'asterisk';

type FormLabelBaseProps = LabelHTMLAttributes<HTMLLabelElement>;

type FormLabelProps<
  D extends ElementType = FormLabelTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<FormLabelTypeMap<P, D>, D>;

type GridItemsAlignment = 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';

type GridContentAlignment =
  | 'stretch'
  | 'center'
  | 'flex-start'
  | 'flex-end'
  | 'space-between'
  | 'space-around';

type GridDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';

type GridSpacing = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

type GridJustification =
  | 'flex-start'
  | 'center'
  | 'flex-end'
  | 'space-between'
  | 'space-around'
  | 'space-evenly';

type GridWrap = 'nowrap' | 'wrap' | 'wrap-reverse';

type GridSize = 'auto' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

type GridClassKey =
  | 'root'
  | 'container'
  | 'item'
  | 'zeroMinWidth'
  | 'direction-xs-column'
  | 'direction-xs-column-reverse'
  | 'direction-xs-row-reverse'
  | 'wrap-xs-nowrap'
  | 'wrap-xs-wrap-reverse'
  | 'align-items-xs-center'
  | 'align-items-xs-flex-start'
  | 'align-items-xs-flex-end'
  | 'align-items-xs-baseline'
  | 'align-content-xs-center'
  | 'align-content-xs-flex-start'
  | 'align-content-xs-flex-end'
  | 'align-content-xs-space-between'
  | 'align-content-xs-space-around'
  | 'justify-xs-center'
  | 'justify-xs-flex-end'
  | 'justify-xs-space-between'
  | 'justify-xs-space-around'
  | 'justify-xs-space-evenly'
  | 'spacing-xs-1'
  | 'spacing-xs-2'
  | 'spacing-xs-3'
  | 'spacing-xs-4'
  | 'spacing-xs-5'
  | 'spacing-xs-6'
  | 'spacing-xs-7'
  | 'spacing-xs-8'
  | 'spacing-xs-9'
  | 'spacing-xs-10'
  | 'grid-xs-auto'
  | 'grid-xs-true'
  | 'grid-xs-1'
  | 'grid-xs-2'
  | 'grid-xs-3'
  | 'grid-xs-4'
  | 'grid-xs-5'
  | 'grid-xs-6'
  | 'grid-xs-7'
  | 'grid-xs-8'
  | 'grid-xs-9'
  | 'grid-xs-10'
  | 'grid-xs-11'
  | 'grid-xs-12';

interface GridTypeMap<P = {}, D extends ElementType = 'div'> {
  props: P &
    Partial<Record<Breakpoint, boolean | GridSize>> & {
      alignContent?: GridContentAlignment;
      alignItems?: GridItemsAlignment;
      container?: boolean;
      direction?: GridDirection;
      item?: boolean;
      justify?: GridJustification;
      spacing?: GridSpacing;
      wrap?: GridWrap;
      zeroMinWidth?: boolean;
    };
  defaultComponent: D;
  classKey: GridClassKey;
}

/**
 *
 * Demos:
 *
 * - [Grid](https://material-ui.com/components/grid/)
 *
 * API:
 *
 * - [Grid API](https://material-ui.com/api/grid/)
 */
declare const Grid: OverridableComponent<GridTypeMap>;

type GridProps<
  D extends ElementType = GridTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<GridTypeMap<P, D>, D>;

interface GridListTypeMap<P = {}, D extends ElementType = 'ul'> {
  props: P & {
    cellHeight?: number | 'auto';
    cols?: number;
    spacing?: number;
  };
  defaultComponent: D;
  classKey: GridListClassKey;
}
/**
 *
 * Demos:
 *
 * - [Grid List](https://material-ui.com/components/grid-list/)
 *
 * API:
 *
 * - [GridList API](https://material-ui.com/api/grid-list/)
 */
declare const GridList: OverridableComponent<GridListTypeMap>;

type GridListClassKey = 'root';

type GridListProps<
  D extends ElementType = GridListTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<GridListTypeMap<P, D>, D>;

interface GridListTileBarProps extends StandardProps<{}, GridListTileBarClassKey> {
  /**
   * An IconButton element to be used as secondary action target
   * (primary action target is the tile itself).
   */
  actionIcon?: ReactNode;
  /**
   * Position of secondary action IconButton.
   */
  actionPosition?: 'left' | 'right';
  /**
   * String or element serving as subtitle (support text).
   */
  subtitle?: ReactNode;
  /**
   * Title to be displayed on tile.
   */
  title?: ReactNode;
  /**
   * Position of the title bar.
   */
  titlePosition?: 'top' | 'bottom';
}

type GridListTileBarClassKey =
  | 'root'
  | 'titlePositionBottom'
  | 'titlePositionTop'
  | 'rootSubtitle'
  | 'titleWrap'
  | 'titleWrapActionPosLeft'
  | 'titleWrapActionPosRight'
  | 'title'
  | 'subtitle'
  | 'actionIcon'
  | 'actionIconActionPosLeft';

/**
 *
 * Demos:
 *
 * - [Grid List](https://material-ui.com/components/grid-list/)
 *
 * API:
 *
 * - [GridListTileBar API](https://material-ui.com/api/grid-list-tile-bar/)
 */
declare function GridListTileBar(props: GridListTileBarProps): JSX.Element;

interface GridListTileTypeMap<P = {}, D extends ElementType = 'li'> {
  props: P & {
    cols?: number;
    rows?: number;
  };
  defaultComponent: D;
  classKey: GridListTileClassKey;
}
/**
 *
 * Demos:
 *
 * - [Grid List](https://material-ui.com/components/grid-list/)
 *
 * API:
 *
 * - [GridListTile API](https://material-ui.com/api/grid-list-tile/)
 */
declare const GridListTile: OverridableComponent<GridListTileTypeMap>;

type GridListTileClassKey = 'root' | 'tile' | 'imgFullHeight' | 'imgFullWidth';

type GridListTileProps<
  D extends ElementType = GridListTileTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<GridListTileTypeMap<P, D>, D>;

interface IconTypeMap<P = {}, D extends ElementType = 'span'> {
  props: P & {
    color?: PropTypes.Color | 'action' | 'disabled' | 'error';
    fontSize?: 'inherit' | 'default' | 'small' | 'large';
  };
  defaultComponent: D;
  classKey: IconClassKey;
}
/**
 *
 * Demos:
 *
 * - [Icons](https://material-ui.com/components/icons/)
 * - [Material Icons](https://material-ui.com/components/material-icons/)
 *
 * API:
 *
 * - [Icon API](https://material-ui.com/api/icon/)
 */
declare const Icon: OverridableComponent<IconTypeMap>;

type IconClassKey =
  | 'root'
  | 'colorSecondary'
  | 'colorAction'
  | 'colorDisabled'
  | 'colorError'
  | 'colorPrimary'
  | 'fontSizeInherit'
  | 'fontSizeSmall'
  | 'fontSizeLarge';

type IconProps<
  D extends ElementType = IconTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<IconTypeMap<P, D>, D>;

interface InputAdornmentTypeMap<P = {}, D extends ElementType = 'div'> {
  props: P & {
    disablePointerEvents?: boolean;
    disableTypography?: boolean;
    position: 'start' | 'end';
    variant?: 'standard' | 'outlined' | 'filled';
  };
  defaultComponent: D;
  classKey: InputAdornmentClassKey;
}
/**
 *
 * Demos:
 *
 * - [Text Fields](https://material-ui.com/components/text-fields/)
 *
 * API:
 *
 * - [InputAdornment API](https://material-ui.com/api/input-adornment/)
 */
declare const InputAdornment: OverridableComponent<InputAdornmentTypeMap>;

type InputAdornmentClassKey =
  | 'root'
  | 'filled'
  | 'positionStart'
  | 'positionEnd'
  | 'disablePointerEvents'
  | 'hiddenLabel'
  | 'marginDense';

type InputAdornmentProps<
  D extends ElementType = InputAdornmentTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<InputAdornmentTypeMap<P, D>, D>;

interface InputProps extends StandardProps<InputBaseProps, InputClassKey> {
  /**
   * If `true`, the input will not have an underline.
   */
  disableUnderline?: boolean;
}

type InputClassKey =
  | 'root'
  | 'formControl'
  | 'focused'
  | 'disabled'
  | 'colorSecondary'
  | 'underline'
  | 'error'
  | 'marginDense'
  | 'multiline'
  | 'fullWidth'
  | 'input'
  | 'inputMarginDense'
  | 'inputMultiline'
  | 'inputTypeSearch';

/**
 *
 * Demos:
 *
 * - [Text Fields](https://material-ui.com/components/text-fields/)
 *
 * API:
 *
 * - [Input API](https://material-ui.com/api/input/)
 * - inherits [InputBase API](https://material-ui.com/api/input-base/)
 */
declare function Input(props: InputProps): JSX.Element;

interface InputLabelProps extends StandardProps<FormLabelProps, InputLabelClassKey> {
  /**
   * The contents of the `InputLabel`.
   */
  children?: ReactNode;
  color?: FormLabelProps['color'];
  /**
   * If `true`, the transition animation is disabled.
   */
  disableAnimation?: boolean;
  /**
   * If `true`, apply disabled class.
   */
  disabled?: boolean;
  /**
   * If `true`, the label will be displayed in an error state.
   */
  error?: boolean;
  /**
   * If `true`, the input of this label is focused.
   */
  focused?: boolean;
  /**
   * If `dense`, will adjust vertical spacing. This is normally obtained via context from
   * FormControl.
   */
  margin?: 'dense';
  /**
   * if `true`, the label will indicate that the input is required.
   */
  required?: boolean;
  /**
   * If `true`, the label is shrunk.
   */
  shrink?: boolean;
  /**
   * The variant to use.
   */
  variant?: 'standard' | 'outlined' | 'filled';
}

type InputLabelClassKey =
  | 'root'
  | 'focused'
  | 'disabled'
  | 'error'
  | 'required'
  | 'asterisk'
  | 'formControl'
  | 'marginDense'
  | 'shrink'
  | 'animated'
  | 'filled'
  | 'outlined';

/**
 *
 * Demos:
 *
 * - [Text Fields](https://material-ui.com/components/text-fields/)
 *
 * API:
 *
 * - [InputLabel API](https://material-ui.com/api/input-label/)
 * - inherits [FormLabel API](https://material-ui.com/api/form-label/)
 */
declare function InputLabel(props: InputLabelProps): JSX.Element;

interface LinearProgressProps
  extends StandardProps<HTMLAttributes<HTMLDivElement>, LinearProgressClassKey, 'children'> {
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   */
  color?: 'primary' | 'secondary';
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value?: number;
  /**
   * The value for the buffer variant.
   * Value between 0 and 100.
   */
  valueBuffer?: number;
  /**
   * The variant to use.
   * Use indeterminate or query when there is no progress value.
   */
  variant?: 'determinate' | 'indeterminate' | 'buffer' | 'query';
}

type LinearProgressClassKey =
  | 'root'
  | 'colorPrimary'
  | 'colorSecondary'
  | 'determinate'
  | 'indeterminate'
  | 'buffer'
  | 'query'
  | 'dashed'
  | 'dashedColorPrimary'
  | 'dashedColorSecondary'
  | 'bar'
  | 'barColorPrimary'
  | 'barColorSecondary'
  | 'bar1Indeterminate'
  | 'bar2Indeterminate'
  | 'bar1Determinate'
  | 'bar1Buffer'
  | 'bar2Buffer';

/**
 * ## ARIA
 *
 * If the progress bar is describing the loading progress of a particular region of a page,
 * you should use `aria-describedby` to point to the progress bar, and set the `aria-busy`
 * attribute to `true` on that region until it has finished loading.
 * Demos:
 *
 * - [Progress](https://material-ui.com/components/progress/)
 *
 * API:
 *
 * - [LinearProgress API](https://material-ui.com/api/linear-progress/)
 */
declare function LinearProgress(props: LinearProgressProps): JSX.Element;

interface LinkTypeMap<P = {}, D extends ElementType = 'a'> {
  props: P &
    LinkBaseProps & {
      TypographyClasses?: TypographyProps['classes'];
      underline?: 'none' | 'hover' | 'always';
    };
  defaultComponent: D;
  classKey: LinkClassKey;
}

/**
 *
 * Demos:
 *
 * - [Breadcrumbs](https://material-ui.com/components/breadcrumbs/)
 * - [Links](https://material-ui.com/components/links/)
 *
 * API:
 *
 * - [Link API](https://material-ui.com/api/link/)
 * - inherits [Typography API](https://material-ui.com/api/typography/)
 */
declare const Link: OverridableComponent<LinkTypeMap>;

type LinkClassKey =
  | 'root'
  | 'underlineNone'
  | 'underlineHover'
  | 'underlineAlways'
  | 'button'
  | 'focusVisible';

type LinkBaseProps = AnchorHTMLAttributes<HTMLAnchorElement> &
  Omit<TypographyProps, 'component'>;

type LinkProps<
  D extends ElementType = LinkTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<LinkTypeMap<P, D>, D>;

interface ListTypeMap<P = {}, D extends ElementType = 'ul'> {
  props: P & {
    dense?: boolean;
    disablePadding?: boolean;
    subheader?: ReactElement;
  };
  defaultComponent: D;
  classKey: ListClassKey;
}

/**
 *
 * Demos:
 *
 * - [Lists](https://material-ui.com/components/lists/)
 * - [Transfer List](https://material-ui.com/components/transfer-list/)
 *
 * API:
 *
 * - [List API](https://material-ui.com/api/list/)
 */
declare const List: OverridableComponent<ListTypeMap>;

type ListClassKey = 'root' | 'padding' | 'dense' | 'subheader';

type ListProps<
  D extends ElementType = ListTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<ListTypeMap<P, D>, D>;

interface ListItemAvatarProps extends StandardProps<{}, ListItemAvatarClassKey> {
  /**
   * The content of the component – normally `Avatar`.
   */
  children: React.ReactElement;
}

type ListItemAvatarClassKey = 'root' | 'icon';

/**
 * A simple wrapper to apply `List` styles to an `Avatar`.
 * Demos:
 *
 * - [Lists](https://material-ui.com/components/lists/)
 *
 * API:
 *
 * - [ListItemAvatar API](https://material-ui.com/api/list-item-avatar/)
 */
declare function ListItemAvatar(props: ListItemAvatarProps): JSX.Element;

interface ListItemTypeMap<P, D extends ElementType> {
  props: P & {
    alignItems?: 'flex-start' | 'center';
    autoFocus?: boolean;
    button?: boolean;
    ContainerComponent?: ElementType<HTMLAttributes<HTMLDivElement>>;
    ContainerProps?: HTMLAttributes<HTMLDivElement>;
    dense?: boolean;
    disabled?: boolean;
    disableGutters?: boolean;
    divider?: boolean;
    focusVisibleClassName?: string;
    selected?: boolean;
  };
  defaultComponent: D;
  classKey: ListItemClassKey;
}

/**
 * Uses an additional container component if `ListItemSecondaryAction` is the last child.
 * Demos:
 *
 * - [Lists](https://material-ui.com/components/lists/)
 * - [Transfer List](https://material-ui.com/components/transfer-list/)
 *
 * API:
 *
 * - [ListItem API](https://material-ui.com/api/list-item/)
 */
declare const ListItem: OverridableComponent<ListItemTypeMap<{ button?: false }, 'li'>> &
  ExtendButtonBase<ListItemTypeMap<{ button: true }, 'div'>>;

type ListItemClassKey =
  | 'root'
  | 'container'
  | 'focusVisible'
  | 'default'
  | 'dense'
  | 'disabled'
  | 'divider'
  | 'gutters'
  | 'button'
  | 'secondaryAction'
  | 'selected';

type ListItemProps<D extends ElementType = 'li', P = {}> = OverrideProps<
  ListItemTypeMap<P, D>,
  D
>;

interface ListItemIconProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, ListItemIconClassKey> {
  /**
   * The content of the component, normally `Icon`, `SvgIcon`,
   * or a `@material-ui/icons` SVG icon element.
   */
  children?: React.ReactNode;
}

type ListItemIconClassKey = 'root' | 'alignItemsFlexStart';

/**
 * A simple wrapper to apply `List` styles to an `Icon` or `SvgIcon`.
 * Demos:
 *
 * - [Lists](https://material-ui.com/components/lists/)
 *
 * API:
 *
 * - [ListItemIcon API](https://material-ui.com/api/list-item-icon/)
 */
declare function ListItemIcon(props: ListItemIconProps): JSX.Element;

interface ListItemSecondaryActionProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, ListItemSecondaryActionClassKey> {
  /**
   * The content of the component, normally an `IconButton` or selection control.
   */
  children?: React.ReactNode;
}

type ListItemSecondaryActionClassKey = 'root';

/**
 * Must be used as the last child of ListItem to function properly.
 * Demos:
 *
 * - [Lists](https://material-ui.com/components/lists/)
 *
 * API:
 *
 * - [ListItemSecondaryAction API](https://material-ui.com/api/list-item-secondary-action/)
 */
declare function ListItemSecondaryAction(props: ListItemSecondaryActionProps): JSX.Element;

interface ListItemTextProps<
  PrimaryTypographyComponent extends ElementType = 'span',
  SecondaryTypographyComponent extends ElementType = 'p'
> extends StandardProps<HTMLAttributes<HTMLDivElement>, ListItemTextClassKey> {
  /**
   * Alias for the `primary` prop.
   */
  children?: ReactNode;
  /**
   * If `true`, the children won't be wrapped by a Typography component.
   * This can be useful to render an alternative Typography variant by wrapping
   * the `children` (or `primary`) text, and optional `secondary` text
   * with the Typography component.
   */
  disableTypography?: boolean;
  /**
   * If `true`, the children will be indented.
   * This should be used if there is no left avatar or left icon.
   */
  inset?: boolean;
  /**
   * The main content element.
   */
  primary?: ReactNode;
  /**
   * These props will be forwarded to the primary typography component
   * (as long as disableTypography is not `true`).
   */
  primaryTypographyProps?: TypographyProps<
    PrimaryTypographyComponent,
    { component?: PrimaryTypographyComponent }
  >;
  /**
   * The secondary content element.
   */
  secondary?: ReactNode;
  /**
   * These props will be forwarded to the secondary typography component
   * (as long as disableTypography is not `true`).
   */
  secondaryTypographyProps?: TypographyProps<
    SecondaryTypographyComponent,
    { component?: SecondaryTypographyComponent }
  >;
}

type ListItemTextClassKey =
  | 'root'
  | 'multiline'
  | 'dense'
  | 'inset'
  | 'primary'
  | 'secondary';
/**
 *
 * Demos:
 *
 * - [Lists](https://material-ui.com/components/lists/)
 *
 * API:
 *
 * - [ListItemText API](https://material-ui.com/api/list-item-text/)
 */
declare function ListItemText<
  PrimaryTypographyComponent extends ElementType = 'span',
  SecondaryTypographyComponent extends ElementType = 'p'
>(props: ListItemTextProps<PrimaryTypographyComponent, SecondaryTypographyComponent>): JSX.Element;

interface ListSubheaderTypeMap<P = {}, D extends ElementType = 'li'> {
  props: P & {
    color?: 'default' | 'primary' | 'inherit';
    disableGutters?: boolean;
    disableSticky?: boolean;
    inset?: boolean;
  };
  defaultComponent: D;
  classKey: ListSubheaderClassKey;
}

/**
 *
 * Demos:
 *
 * - [Lists](https://material-ui.com/components/lists/)
 *
 * API:
 *
 * - [ListSubheader API](https://material-ui.com/api/list-subheader/)
 */
declare const ListSubheader: OverridableComponent<ListSubheaderTypeMap>;

type ListSubheaderClassKey =
  | 'root'
  | 'colorPrimary'
  | 'colorInherit'
  | 'inset'
  | 'sticky'
  | 'gutters';

type ListSubheaderProps<
  D extends ElementType = ListSubheaderTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<ListSubheaderTypeMap<P, D>, D>;

interface PopoverOrigin {
  vertical: 'top' | 'center' | 'bottom' | number;
  horizontal: 'left' | 'center' | 'right' | number;
}

interface PopoverPosition {
  top: number;
  left: number;
}

type PopoverReference = 'anchorEl' | 'anchorPosition' | 'none';

interface PopoverProps
  extends StandardProps<ModalProps & Partial<TransitionHandlerProps>, PopoverClassKey, 'children'> {
  /**
   * A ref for imperative actions.
   * It currently only supports updatePosition() action.
   */
  action?: Ref<PopoverActions>;
  /**
   * A HTML element, or a function that returns it.
   * It's used to set the position of the popover.
   */
  anchorEl?: null | Element | ((element: Element) => Element);
  /**
   * This is the point on the anchor where the popover's
   * `anchorEl` will attach to. This is not used when the
   * anchorReference is 'anchorPosition'.
   *
   * Options:
   * vertical: [top, center, bottom];
   * horizontal: [left, center, right].
   */
  anchorOrigin?: PopoverOrigin;
  /**
   * This is the position that may be used
   * to set the position of the popover.
   * The coordinates are relative to
   * the application's client area.
   */
  anchorPosition?: PopoverPosition;
  /**
   * This determines which anchor prop to refer to to set
   * the position of the popover.
   */
  anchorReference?: PopoverReference;
  /**
   * The content of the component.
   */
  children?: ReactNode;
  /**
   * A HTML element, component instance, or function that returns either.
   * The `container` will passed to the Modal component.
   *
   * By default, it uses the body of the anchorEl's top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container?: ModalProps['container'];
  /**
   * The elevation of the popover.
   */
  elevation?: number;
  /**
   * This function is called in order to retrieve the content anchor element.
   * It's the opposite of the `anchorEl` prop.
   * The content anchor element should be an element inside the popover.
   * It's used to correctly scroll and set the position of the popover.
   * The positioning strategy tries to make the content anchor element just above the
   * anchor element.
   */
  getContentAnchorEl?: null | ((element: Element) => Element);
  /**
   * Specifies how close to the edge of the window the popover can appear.
   */
  marginThreshold?: number;
  onClose?: ModalProps['onClose'];
  /**
   * Callback fired before the component is entering.
   */
  onEnter?: TransitionHandlerProps['onEnter'];
  /**
   * Callback fired when the component has entered.
   */
  onEntered?: TransitionHandlerProps['onEntered'];
  /**
   * Callback fired when the component is entering.
   */
  onEntering?: TransitionHandlerProps['onEntering'];
  /**
   * Callback fired before the component is exiting.
   */
  onExit?: TransitionHandlerProps['onExit'];
  /**
   * Callback fired when the component has exited.
   */
  onExited?: TransitionHandlerProps['onExited'];
  /**
   * Callback fired when the component is exiting.
   */
  onExiting?: TransitionHandlerProps['onExiting'];
  /**
   * If `true`, the popover is visible.
   */
  open: boolean;
  /**
   * Props applied to the [`Paper`](/api/paper/) element.
   */
  PaperProps?: Partial<PaperProps>;
  /**
   * This is the point on the popover which
   * will attach to the anchor's origin.
   *
   * Options:
   * vertical: [top, center, bottom, x(px)];
   * horizontal: [left, center, right, x(px)].
   */
  transformOrigin?: PopoverOrigin;
  /**
   * The component used for the transition.
   * [Follow this guide](/components/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   */
  TransitionComponent?: ComponentType<
    TransitionProps$1 & { children?: ReactElement<any, any> }
  >;
  /**
   * Set to 'auto' to automatically calculate transition time based on height.
   */
  transitionDuration?: TransitionProps$1['timeout'] | 'auto';
  /**
   * Props applied to the [`Transition`](http://reactcommunity.org/react-transition-group/transition#Transition-props) element.
   */
  TransitionProps?: TransitionProps$1;
}

type PopoverClassKey = 'root' | 'paper';

interface PopoverActions {
  updatePosition(): void;
}

/**
 *
 * Demos:
 *
 * - [Menus](https://material-ui.com/components/menus/)
 * - [Popover](https://material-ui.com/components/popover/)
 *
 * API:
 *
 * - [Popover API](https://material-ui.com/api/popover/)
 * - inherits [Modal API](https://material-ui.com/api/modal/)
 */
declare function Popover(props: PopoverProps): JSX.Element;

interface MenuListProps extends StandardProps<ListProps, MenuListClassKey> {
  /**
   * If `true`, will focus the `[role="menu"]` container and move into tab order.
   */
  autoFocus?: boolean;
  /**
   * If `true`, will focus the first menuitem if `variant="menu"` or selected item
   * if `variant="selectedMenu"`.
   */
  autoFocusItem?: boolean;
  /**
   * MenuList contents, normally `MenuItem`s.
   */
  children?: ReactNode;
  /**
   * If `true`, will allow focus on disabled items.
   */
  disabledItemsFocusable?: boolean;
  /**
   * If `true`, the menu items will not wrap focus.
   */
  disableListWrap?: boolean;
  /**
   * The variant to use. Use `menu` to prevent selected items from impacting the initial focus
   * and the vertical alignment relative to the anchor element.
   */
  variant?: 'menu' | 'selectedMenu';
}

type MenuListClassKey = ListClassKey;

/**
 * A permanently displayed menu following <https://www.w3.org/TR/wai-aria-practices/#menubutton>.
 * It's exposed to help customization of the [`Menu`](https://material-ui.com/api/menu/) component. If you
 * use it separately you need to move focus into the component manually. Once
 * the focus is placed inside the component it is fully keyboard accessible.
 * Demos:
 *
 * - [Menus](https://material-ui.com/components/menus/)
 *
 * API:
 *
 * - [MenuList API](https://material-ui.com/api/menu-list/)
 * - inherits [List API](https://material-ui.com/api/list/)
 */
declare function MenuList(props: MenuListProps): JSX.Element;

interface MenuProps
  extends StandardProps<PopoverProps & Partial<TransitionHandlerProps>, MenuClassKey> {
  /**
   * A HTML element, or a function that returns it.
   * It's used to set the position of the menu.
   * @document
   */
  anchorEl?: PopoverProps['anchorEl'];
  /**
   * If `true` (Default) will focus the `[role="menu"]` if no focusable child is found. Disabled
   * children are not focusable. If you set this prop to `false` focus will be placed
   * on the parent modal container. This has severe accessibility implications
   * and should only be considered if you manage focus otherwise.
   */
  autoFocus?: boolean;
  /**
   * Menu contents, normally `MenuItem`s.
   */
  children?: ReactNode;
  /**
   * When opening the menu will not focus the active item but the `[role="menu"]`
   * unless `autoFocus` is also set to `false`. Not using the default means not
   * following WAI-ARIA authoring practices. Please be considerate about possible
   * accessibility implications.
   */
  disableAutoFocusItem?: boolean;
  /**
   * Props applied to the [`MenuList`](/api/menu-list/) element.
   */
  MenuListProps?: Partial<MenuListProps>;
  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {object} event The event source of the callback.
   * @param {string} reason Can be: `"escapeKeyDown"`, `"backdropClick"`, `"tabKeyDown"`.
   */
  onClose?: PopoverProps['onClose'];
  /**
   * Callback fired before the Menu enters.
   * @document
   */
  onEnter?: PopoverProps['onEnter'];
  /**
   * Callback fired when the Menu has entered.
   * @document
   */
  onEntered?: PopoverProps['onEntered'];
  /**
   * Callback fired when the Menu is entering.
   * @document
   */
  onEntering?: PopoverProps['onEntering'];
  /**
   * Callback fired before the Menu exits.
   * @document
   */
  onExit?: PopoverProps['onExit'];
  /**
   * Callback fired when the Menu has exited.
   * @document
   */
  onExited?: PopoverProps['onExited'];
  /**
   * Callback fired when the Menu is exiting.
   * @document
   */
  onExiting?: PopoverProps['onExiting'];
  /**
   * If `true`, the menu is visible.
   */
  open: boolean;
  /**
   * `classes` prop applied to the [`Popover`](/api/popover/) element.
   */
  PopoverClasses?: PopoverProps['classes'];
  /**
   * The length of the transition in `ms`, or 'auto'
   */
  transitionDuration?: TransitionProps$1['timeout'] | 'auto';
  /**
   * The variant to use. Use `menu` to prevent selected items from impacting the initial focus
   * and the vertical alignment relative to the anchor element.
   */
  variant?: 'menu' | 'selectedMenu';
}

type MenuClassKey = 'paper' | 'list';

/**
 *
 * Demos:
 *
 * - [App Bar](https://material-ui.com/components/app-bar/)
 * - [Menus](https://material-ui.com/components/menus/)
 *
 * API:
 *
 * - [Menu API](https://material-ui.com/api/menu/)
 * - inherits [Popover API](https://material-ui.com/api/popover/)
 */
declare function Menu(props: MenuProps): JSX.Element;

type MenuItemClassKey = 'root' | 'gutters' | 'selected' | 'dense';

type MenuItemTypeMap<P = {}, D extends React.ElementType = 'li'> = Omit<
  ListItemTypeMap<P, D>,
  'classKey'
> & {
  classKey: MenuItemClassKey;
  /**
   * `classes` prop applied to the [`ListItem`](/api/list-item/) element.
   */
  ListItemClasses: ListItemProps['classes'];
};

/**
 *
 * Demos:
 *
 * - [Menus](https://material-ui.com/components/menus/)
 *
 * API:
 *
 * - [MenuItem API](https://material-ui.com/api/menu-item/)
 * - inherits [ListItem API](https://material-ui.com/api/list-item/)
 */
declare const MenuItem: OverridableComponent<
  MenuItemTypeMap<{ button: false }, MenuItemTypeMap['defaultComponent']>
> &
  ExtendButtonBase<MenuItemTypeMap<{ button?: true }, MenuItemTypeMap['defaultComponent']>>;

type MenuItemProps<
  D extends React.ElementType = MenuItemTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<MenuItemTypeMap<P, D>, D>;

interface MobileStepperProps
  extends StandardProps<PaperProps, MobileStepperClassKey, 'children' | 'variant'> {
  /**
   * Set the active step (zero based index).
   * Defines which dot is highlighted when the variant is 'dots'.
   */
  activeStep?: number;
  /**
   * A back button element. For instance, it can be a `Button` or an `IconButton`.
   */
  backButton: ReactNode;
  /**
   * Props applied to the `LinearProgress` element.
   */
  LinearProgressProps?: Partial<LinearProgressProps>;
  /**
   * A next button element. For instance, it can be a `Button` or an `IconButton`.
   */
  nextButton: ReactNode;
  /**
   * Set the positioning type.
   */
  position?: 'bottom' | 'top' | 'static';
  /**
   * The total steps.
   */
  steps: number;
  /**
   * The variant to use.
   */
  variant?: 'text' | 'dots' | 'progress';
}

type MobileStepperClassKey =
  | 'root'
  | 'positionBottom'
  | 'positionTop'
  | 'positionStatic'
  | 'dots'
  | 'dot'
  | 'dotActive'
  | 'progress';

/**
 *
 * Demos:
 *
 * - [Steppers](https://material-ui.com/components/steppers/)
 *
 * API:
 *
 * - [MobileStepper API](https://material-ui.com/api/mobile-stepper/)
 * - inherits [Paper API](https://material-ui.com/api/paper/)
 */
declare function MobileStepper(props: MobileStepperProps): JSX.Element;

interface NativeSelectInputProps extends SelectHTMLAttributes<HTMLSelectElement> {
  disabled?: boolean;
  IconComponent?: ElementType;
  inputRef?: Ref<HTMLSelectElement>;
  variant?: 'standard' | 'outlined' | 'filled';
}

interface NativeSelectProps
  extends StandardProps<InputProps, NativeSelectClassKey, 'inputProps' | 'value' | 'onChange'> {
  /**
   * The option elements to populate the select with.
   * Can be some `<option>` elements.
   */
  children?: ReactNode;
  /**
   * The icon that displays the arrow.
   */
  IconComponent?: ElementType;
  /**
   * An `Input` element; does not have to be a material-ui specific `Input`.
   */
  input?: ReactElement<any, any>;
  /**
   * Attributes applied to the `select` element.
   */
  inputProps?: NativeSelectInputProps;
  /**
   * Callback function fired when a menu item is selected.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   * @document
   */
  onChange?: NativeSelectInputProps['onChange'];
  /**
   * The input value. The DOM API casts this to a string.
   * @document
   */
  value?: unknown;
  /**
   * The variant to use.
   */
  variant?: 'standard' | 'outlined' | 'filled';
}

type NativeSelectClassKey =
  | 'root'
  | 'select'
  | 'filled'
  | 'outlined'
  | 'selectMenu'
  | 'disabled'
  | 'icon'
  | 'iconFilled'
  | 'iconOutlined';

/**
 * An alternative to `<Select native />` with a much smaller bundle size footprint.
 * Demos:
 *
 * - [Selects](https://material-ui.com/components/selects/)
 *
 * API:
 *
 * - [NativeSelect API](https://material-ui.com/api/native-select/)
 * - inherits [Input API](https://material-ui.com/api/input/)
 */
declare function NativeSelect(props: NativeSelectProps): JSX.Element;

interface OutlinedInputProps extends StandardProps<InputBaseProps, OutlinedInputClassKey> {
  /**
   * The label of the input. It is only used for layout. The actual labelling
   * is handled by `InputLabel`. If specified `labelWidth` is ignored.
   */
  label?: ReactNode;
  /**
   * The width of the label. Is ignored if `label` is provided. Prefer `label`
   * if the input label appears with a strike through.
   */
  labelWidth?: number;
  /**
   * If `true`, the outline is notched to accommodate the label.
   */
  notched?: boolean;
}

type OutlinedInputClassKey =
  | 'root'
  | 'colorSecondary'
  | 'focused'
  | 'disabled'
  | 'adornedStart'
  | 'adornedEnd'
  | 'error'
  | 'marginDense'
  | 'multiline'
  | 'notchedOutline'
  | 'input'
  | 'inputMarginDense'
  | 'inputMultiline'
  | 'inputAdornedStart'
  | 'inputAdornedEnd';

/**
 *
 * Demos:
 *
 * - [Text Fields](https://material-ui.com/components/text-fields/)
 *
 * API:
 *
 * - [OutlinedInput API](https://material-ui.com/api/outlined-input/)
 * - inherits [InputBase API](https://material-ui.com/api/input-base/)
 */
declare function OutlinedInput(props: OutlinedInputProps): JSX.Element;

interface RadioProps
  extends StandardProps<SwitchBaseProps, RadioClassKey, 'checkedIcon' | 'color' | 'icon' | 'type'> {
  /**
   * The icon to display when the component is checked.
   */
  checkedIcon?: ReactNode;
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   */
  color?: 'primary' | 'secondary' | 'default';
  /**
   * If `true`, the radio will be disabled.
   */
  disabled?: boolean;
  /**
   * The icon to display when the component is unchecked.
   */
  icon?: ReactNode;
  /**
   * The size of the radio.
   * `small` is equivalent to the dense radio styling.
   */
  size?: 'small' | 'medium';
}

type RadioClassKey = SwitchBaseClassKey | 'colorPrimary' | 'colorSecondary';

/**
 *
 * Demos:
 *
 * - [Radio Buttons](https://material-ui.com/components/radio-buttons/)
 *
 * API:
 *
 * - [Radio API](https://material-ui.com/api/radio/)
 * - inherits [IconButton API](https://material-ui.com/api/icon-button/)
 */
declare function Radio(props: RadioProps): JSX.Element;

type ScopedCssBaselineClassKey = 'root';

interface SelectInputProps {
  autoFocus?: boolean;
  autoWidth: boolean;
  disabled?: boolean;
  IconComponent?: ElementType;
  inputRef?: (
    ref: HTMLSelectElement | { node: HTMLInputElement; value: SelectInputProps['value'] }
  ) => void;
  MenuProps?: Partial<MenuProps>;
  multiple: boolean;
  name?: string;
  native: boolean;
  onBlur?: FocusEventHandler<any>;
  onChange?: (
    event: ChangeEvent<{ name?: string; value: unknown }>,
    child: ReactNode
  ) => void;
  onClose?: (event: ChangeEvent<{}>) => void;
  onFocus?: FocusEventHandler<any>;
  onOpen?: (event: ChangeEvent<{}>) => void;
  open?: boolean;
  readOnly?: boolean;
  renderValue?: (value: SelectInputProps['value']) => ReactNode;
  SelectDisplayProps?: HTMLAttributes<HTMLDivElement>;
  tabIndex?: number;
  value?: unknown;
  variant?: 'standard' | 'outlined' | 'filled';
}

interface SelectProps
  extends StandardProps<InputProps, SelectClassKey, 'value' | 'onChange'>,
    Pick<SelectInputProps, 'onChange'> {
  /**
   * If `true`, the width of the popover will automatically be set according to the items inside the
   * menu, otherwise it will be at least the width of the select input.
   */
  autoWidth?: boolean;
  /**
   * The option elements to populate the select with.
   * Can be some `MenuItem` when `native` is false and `option` when `native` is true.
   *
   * ⚠️The `MenuItem` elements **must** be direct descendants when `native` is false.
   */
  children?: ReactNode;
  /**
   * The default element value. Use when the component is not controlled.
   * @document
   */
  defaultValue?: unknown;
  /**
   * If `true`, a value is displayed even if no items are selected.
   *
   * In order to display a meaningful value, a function should be passed to the `renderValue` prop which returns the value to be displayed when no items are selected.
   * You can only use it when the `native` prop is `false` (default).
   */
  displayEmpty?: boolean;
  /**
   * The icon that displays the arrow.
   */
  IconComponent?: ElementType;
  /**
   * The `id` of the wrapper element or the `select` element when `native`.
   */
  id?: string;
  /**
   * An `Input` element; does not have to be a material-ui specific `Input`.
   */
  input?: ReactElement<any, any>;
  /**
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element.
   * When `native` is `true`, the attributes are applied on the `select` element.
   */
  inputProps?: InputProps['inputProps'];
  /**
   * See [OutlinedInput#label](/api/outlined-input/#props)
   */
  label?: ReactNode;
  /**
   * The ID of an element that acts as an additional label. The Select will
   * be labelled by the additional label and the selected value.
   */
  labelId?: string;
  /**
   * See [OutlinedInput#label](/api/outlined-input/#props)
   */
  labelWidth?: number;
  /**
   * Props applied to the [`Menu`](/api/menu/) element.
   */
  MenuProps?: Partial<MenuProps>;
  /**
   * If `true`, `value` must be an array and the menu will support multiple selections.
   */
  multiple?: boolean;
  /**
   * If `true`, the component will be using a native `select` element.
   */
  native?: boolean;
  /**
   * Callback function fired when a menu item is selected.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (any).
   * @param {object} [child] The react element that was selected when `native` is `false` (default).
   * @document
   */
  onChange?: SelectInputProps['onChange'];
  /**
   * Callback fired when the component requests to be closed.
   * Use in controlled mode (see open).
   *
   * @param {object} event The event source of the callback.
   */
  onClose?: (event: ChangeEvent<{}>) => void;
  /**
   * Callback fired when the component requests to be opened.
   * Use in controlled mode (see open).
   *
   * @param {object} event The event source of the callback.
   */
  onOpen?: (event: ChangeEvent<{}>) => void;
  /**
   * Control `select` open state.
   * You can only use it when the `native` prop is `false` (default).
   */
  open?: boolean;
  /**
   * Render the selected value.
   * You can only use it when the `native` prop is `false` (default).
   *
   * @param {any} value The `value` provided to the component.
   * @returns {ReactNode}
   */
  renderValue?: (value: SelectProps['value']) => ReactNode;
  /**
   * Props applied to the clickable div element.
   */
  SelectDisplayProps?: HTMLAttributes<HTMLDivElement>;
  /**
   * The input value. Providing an empty string will select no options.
   * This prop is required when the `native` prop is `false` (default).
   * Set to an empty string `''` if you don't want any of the available options to be selected.
   *
   * If the value is an object it must have reference equality with the option in order to be selected.
   * If the value is not an object, the string representation must match with the string representation of the option in order to be selected.
   * @document
   */
  value?: unknown;
  /**
   * The variant to use.
   */
  variant?: 'standard' | 'outlined' | 'filled';
}

type SelectClassKey =
  | 'root'
  | 'select'
  | 'filled'
  | 'outlined'
  | 'selectMenu'
  | 'disabled'
  | 'icon'
  | 'iconOpen'
  | 'iconFilled'
  | 'iconOutlined';

/**
 *
 * Demos:
 *
 * - [Selects](https://material-ui.com/components/selects/)
 *
 * API:
 *
 * - [Select API](https://material-ui.com/api/select/)
 * - inherits [Input API](https://material-ui.com/api/input/)
 */
declare function Select(props: SelectProps): JSX.Element;

interface Mark {
  value: number;
  label?: ReactNode;
}

interface ValueLabelProps extends HTMLAttributes<HTMLSpanElement> {
  value: number;
  open: boolean;
  children: ReactElement;
}

interface SliderTypeMap<P = {}, D extends ElementType = 'span'> {
  props: P & {
    'aria-label'?: string;
    'aria-labelledby'?: string;
    'aria-valuetext'?: string;
    color?: 'primary' | 'secondary';
    defaultValue?: number | number[];
    disabled?: boolean;
    getAriaLabel?: (index: number) => string;
    getAriaValueText?: (value: number, index: number) => string;
    marks?: boolean | Mark[];
    max?: number;
    min?: number;
    name?: string;
    onChange?: (event: ChangeEvent<{}>, value: number | number[]) => void;
    onChangeCommitted?: (event: ChangeEvent<{}>, value: number | number[]) => void;
    orientation?: 'horizontal' | 'vertical';
    step?: number | null;
    scale?: (value: number) => number;
    ThumbComponent?: ElementType<HTMLAttributes<HTMLSpanElement>>;
    track?: 'normal' | false | 'inverted';
    value?: number | number[];
    ValueLabelComponent?: ElementType<ValueLabelProps>;
    valueLabelDisplay?: 'on' | 'auto' | 'off';
    valueLabelFormat?: string | ((value: number, index: number) => ReactNode);
  };
  defaultComponent: D;
  classKey: SliderClassKey;
}
/**
 *
 * Demos:
 *
 * - [Slider](https://material-ui.com/components/slider/)
 *
 * API:
 *
 * - [Slider API](https://material-ui.com/api/slider/)
 */
declare const Slider: OverridableComponent<SliderTypeMap>;

type SliderClassKey =
  | 'root'
  | 'colorPrimary'
  | 'colorSecondary'
  | 'marked'
  | 'vertical'
  | 'disabled'
  | 'rail'
  | 'track'
  | 'trackFalse'
  | 'trackInverted'
  | 'thumb'
  | 'thumbColorPrimary'
  | 'thumbColorSecondary'
  | 'active'
  | 'focusVisible'
  | 'valueLabel'
  | 'mark'
  | 'markActive'
  | 'markLabel'
  | 'markLabelActive';

type SliderProps<
  D extends ElementType = SliderTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<SliderTypeMap<P, D>, D>;

interface SnackbarContentProps
  extends StandardProps<PaperProps, SnackbarContentClassKey, 'children'> {
  /**
   * The action to display. It renders after the message, at the end of the snackbar.
   */
  action?: ReactNode;
  /**
   * The message to display.
   */
  message?: ReactNode;
  /**
   * The ARIA role attribute of the element.
   */
  role?: PaperProps['role'];
}

type SnackbarContentClassKey = 'root' | 'message' | 'action';

/**
 *
 * Demos:
 *
 * - [Snackbars](https://material-ui.com/components/snackbars/)
 *
 * API:
 *
 * - [SnackbarContent API](https://material-ui.com/api/snackbar-content/)
 * - inherits [Paper API](https://material-ui.com/api/paper/)
 */
declare function SnackbarContent(props: SnackbarContentProps): JSX.Element;

interface ClickAwayListenerProps {
  /**
   * The wrapped element.
   */
  children: ReactNode;
  /**
   * If `true`, the React tree is ignored and only the DOM tree is considered.
   * This prop changes how portaled elements are handled.
   */
  disableReactTree?: boolean;
  /**
   * The mouse event to listen to. You can disable the listener by providing `false`.
   */
  mouseEvent?: 'onClick' | 'onMouseDown' | 'onMouseUp' | false;
  /**
   * Callback fired when a "click away" event is detected.
   */
  onClickAway: (event: MouseEvent<Document>) => void;
  /**
   * The touch event to listen to. You can disable the listener by providing `false`.
   */
  touchEvent?: 'onTouchStart' | 'onTouchEnd' | false;
}

/**
 * Listen for click events that occur somewhere in the document, outside of the element itself.
 * For instance, if you need to hide a menu when people click anywhere else on your page.
 * Demos:
 *
 * - [Click Away Listener](https://material-ui.com/components/click-away-listener/)
 * - [Menus](https://material-ui.com/components/menus/)
 *
 * API:
 *
 * - [ClickAwayListener API](https://material-ui.com/api/click-away-listener/)
 */
declare function ClickAwayListener(props: ClickAwayListenerProps): JSX.Element;

interface SnackbarOrigin {
  vertical: 'top' | 'bottom';
  horizontal: 'left' | 'center' | 'right';
}

type SnackbarCloseReason = 'timeout' | 'clickaway';

interface SnackbarProps
  extends StandardProps<
    HTMLAttributes<HTMLDivElement> & Partial<TransitionHandlerProps>,
    SnackbarClassKey
  > {
  /**
   * The action to display. It renders after the message, at the end of the snackbar.
   */
  action?: SnackbarContentProps['action'];
  /**
   * The anchor of the `Snackbar`.
   */
  anchorOrigin?: SnackbarOrigin;
  /**
   * The number of milliseconds to wait before automatically calling the
   * `onClose` function. `onClose` should then set the state of the `open`
   * prop to hide the Snackbar. This behavior is disabled by default with
   * the `null` value.
   */
  autoHideDuration?: number | null;
  /**
   * Replace the `SnackbarContent` component.
   */
  children?: ReactElement<any, any>;
  /**
   * Props applied to the `ClickAwayListener` element.
   */
  ClickAwayListenerProps?: Partial<ClickAwayListenerProps>;
  /**
   * Props applied to the [`SnackbarContent`](/api/snackbar-content/) element.
   */
  ContentProps?: Partial<SnackbarContentProps>;
  /**
   * If `true`, the `autoHideDuration` timer will expire even if the window is not focused.
   */
  disableWindowBlurListener?: boolean;
  /**
   * When displaying multiple consecutive Snackbars from a parent rendering a single
   * <Snackbar/>, add the key prop to ensure independent treatment of each message.
   * e.g. <Snackbar key={message} />, otherwise, the message may update-in-place and
   * features such as autoHideDuration may be canceled.
   * @document
   */
  key?: any;
  /**
   * The message to display.
   */
  message?: SnackbarContentProps['message'];
  /**
   * Callback fired when the component requests to be closed.
   * Typically `onClose` is used to set state in the parent component,
   * which is used to control the `Snackbar` `open` prop.
   * The `reason` parameter can optionally be used to control the response to `onClose`,
   * for example ignoring `clickaway`.
   *
   * @param {object} event The event source of the callback.
   * @param {string} reason Can be: `"timeout"` (`autoHideDuration` expired), `"clickaway"`.
   */
  onClose?: (event: SyntheticEvent<any>, reason: SnackbarCloseReason) => void;
  /**
   * Callback fired before the transition is entering.
   */
  onEnter?: TransitionHandlerProps['onEnter'];
  /**
   * Callback fired when the transition has entered.
   */
  onEntered?: TransitionHandlerProps['onEntered'];
  /**
   * Callback fired when the transition is entering.
   */
  onEntering?: TransitionHandlerProps['onEntering'];
  /**
   * Callback fired before the transition is exiting.
   */
  onExit?: TransitionHandlerProps['onExit'];
  /**
   * Callback fired when the transition has exited.
   */
  onExited?: TransitionHandlerProps['onExited'];
  /**
   * Callback fired when the transition is exiting.
   */
  onExiting?: TransitionHandlerProps['onExiting'];
  onMouseEnter?: MouseEventHandler<any>;
  onMouseLeave?: MouseEventHandler<any>;
  /**
   * If `true`, `Snackbar` is open.
   */
  open?: boolean;
  /**
   * The number of milliseconds to wait before dismissing after user interaction.
   * If `autoHideDuration` prop isn't specified, it does nothing.
   * If `autoHideDuration` prop is specified but `resumeHideDuration` isn't,
   * we default to `autoHideDuration / 2` ms.
   */
  resumeHideDuration?: number;
  /**
   * The component used for the transition.
   * [Follow this guide](/components/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   */
  TransitionComponent?: ComponentType<
    TransitionProps$1 & { children?: ReactElement<any, any> }
  >;
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   */
  transitionDuration?: TransitionProps$1['timeout'];
  /**
   * Props applied to the [`Transition`](http://reactcommunity.org/react-transition-group/transition#Transition-props) element.
   */
  TransitionProps?: TransitionProps$1;
}

type SnackbarClassKey =
  | 'root'
  | 'anchorOriginTopCenter'
  | 'anchorOriginBottomCenter'
  | 'anchorOriginTopRight'
  | 'anchorOriginBottomRight'
  | 'anchorOriginTopLeft'
  | 'anchorOriginBottomLeft';

/**
 *
 * Demos:
 *
 * - [Snackbars](https://material-ui.com/components/snackbars/)
 *
 * API:
 *
 * - [Snackbar API](https://material-ui.com/api/snackbar/)
 */
declare function Snackbar(props: SnackbarProps): JSX.Element;

type Orientation = 'horizontal' | 'vertical';

interface StepperProps extends StandardProps<PaperProps, StepperClasskey> {
  /**
   * Set the active step (zero based index).
   * Set to -1 to disable all the steps.
   */
  activeStep?: number;
  /**
   * If set to 'true' and orientation is horizontal,
   * then the step label will be positioned under the icon.
   */
  alternativeLabel?: boolean;
  /**
   * Two or more `<Step />` components.
   */
  children: ReactNode;
  /**
   * An element to be placed between each step.
   */
  connector?: ReactElement<any, any>;
  /**
   * If set the `Stepper` will not assist in controlling steps for linear flow.
   */
  nonLinear?: boolean;
  /**
   * The stepper orientation (layout flow direction).
   */
  orientation?: Orientation;
}

type StepperClasskey = 'root' | 'horizontal' | 'vertical' | 'alternativeLabel';

/**
 *
 * Demos:
 *
 * - [Steppers](https://material-ui.com/components/steppers/)
 *
 * API:
 *
 * - [Stepper API](https://material-ui.com/api/stepper/)
 * - inherits [Paper API](https://material-ui.com/api/paper/)
 */
declare function Stepper(props: StepperProps): JSX.Element;

/**
 * @deprecated use `StepButtonProps['icon']` instead
 */
type StepButtonIcon = ReactNode;

type StepButtonTypeMap<P, D extends ElementType> = ExtendButtonBaseTypeMap<{
  props: P & {
    active?: boolean;
    alternativeLabel?: boolean;
    completed?: boolean;
    disabled?: boolean;
    icon?: ReactNode;
    last?: boolean;
    optional?: ReactNode;
    orientation?: Orientation;
  };
  defaultComponent: D;
  classKey: StepButtonClasskey;
}>;

/**
 *
 * Demos:
 *
 * - [Steppers](https://material-ui.com/components/steppers/)
 *
 * API:
 *
 * - [StepButton API](https://material-ui.com/api/step-button/)
 * - inherits [ButtonBase API](https://material-ui.com/api/button-base/)
 */
declare const StepButton: ExtendButtonBase<StepButtonTypeMap<
  {},
  ButtonBaseTypeMap['defaultComponent']
>>;

type StepButtonClasskey = 'root' | 'vertical' | 'touchRipple';

type StepButtonProps<
  D extends ElementType = ButtonBaseTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<StepButtonTypeMap<P, D>, D>;

interface StepProps
  extends StandardProps<HTMLAttributes<HTMLDivElement>, StepClasskey> {
  /**
   * Sets the step as active. Is passed to child components.
   */
  active?: boolean;
  /**
   * Should be `Step` sub-components such as `StepLabel`, `StepContent`.
   */
  children?: ReactNode;
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed?: boolean;
  /**
   * Mark the step as disabled, will also disable the button if
   * `StepButton` is a child of `Step`. Is passed to child components.
   */
  disabled?: boolean;
  /**
   * Expand the step.
   */
  expanded?: boolean;
}

type StepClasskey = 'root' | 'horizontal' | 'vertical' | 'alternativeLabel' | 'completed';

/**
 *
 * Demos:
 *
 * - [Steppers](https://material-ui.com/components/steppers/)
 *
 * API:
 *
 * - [Step API](https://material-ui.com/api/step/)
 */
declare function Step(props: StepProps): JSX.Element;

type StepConnectorIcon = ReactElement | string | number;

interface StepConnectorProps
  extends StandardProps<HTMLAttributes<HTMLDivElement>, StepConnectorClasskey, 'children'> {}

type StepConnectorClasskey =
  | 'root'
  | 'horizontal'
  | 'vertical'
  | 'alternativeLabel'
  | 'active'
  | 'completed'
  | 'disabled'
  | 'line'
  | 'lineHorizontal'
  | 'lineVertical';

/**
 *
 * Demos:
 *
 * - [Steppers](https://material-ui.com/components/steppers/)
 *
 * API:
 *
 * - [StepConnector API](https://material-ui.com/api/step-connector/)
 */
declare function StepConnector(props: StepConnectorProps): JSX.Element;

interface StepContentProps
  extends StandardProps<HTMLAttributes<HTMLDivElement>, StepContentClasskey> {
  /**
   * Step content.
   */
  children?: ReactNode;
  /**
   * The component used for the transition.
   * [Follow this guide](/components/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   */
  TransitionComponent?: ComponentType<TransitionProps$1>;
  /**
   * Adjust the duration of the content expand transition.
   * Passed as a prop to the transition component.
   *
   * Set to 'auto' to automatically calculate transition time based on height.
   */
  transitionDuration?: TransitionProps$1['timeout'] | 'auto';
  /**
   * Props applied to the [`Transition`](http://reactcommunity.org/react-transition-group/transition#Transition-props) element.
   */
  TransitionProps?: TransitionProps$1;
}

type StepContentClasskey = 'root' | 'last' | 'transition';

/**
 *
 * Demos:
 *
 * - [Steppers](https://material-ui.com/components/steppers/)
 *
 * API:
 *
 * - [StepContent API](https://material-ui.com/api/step-content/)
 */
declare function StepContent(props: StepContentProps): JSX.Element;

interface StepIconProps
  extends StandardProps<HTMLAttributes<HTMLDivElement>, StepIconClasskey, 'children'> {
  /**
   * Whether this step is active.
   */
  active?: boolean;
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed?: boolean;
  /**
   * Mark the step as failed.
   */
  error?: boolean;
  /**
   * The label displayed in the step icon.
   */
  icon: ReactNode;
}

type StepIconClasskey = 'root' | 'text' | 'active' | 'completed' | 'error';

/**
 *
 * Demos:
 *
 * - [Steppers](https://material-ui.com/components/steppers/)
 *
 * API:
 *
 * - [StepIcon API](https://material-ui.com/api/step-icon/)
 */
declare function StepIcon(props: StepIconProps): JSX.Element;

interface StepLabelProps
  extends StandardProps<HTMLAttributes<HTMLDivElement>, StepLabelClasskey> {
  /**
   * In most cases will simply be a string containing a title for the label.
   */
  children?: ReactNode;
  /**
   * Mark the step as disabled, will also disable the button if
   * `StepLabelButton` is a child of `StepLabel`. Is passed to child components.
   */
  disabled?: boolean;
  /**
   * Mark the step as failed.
   */
  error?: boolean;
  /**
   * Override the default label of the step icon.
   */
  icon?: ReactNode;
  /**
   * The optional node to display.
   */
  optional?: ReactNode;
  /**
   * The component to render in place of the [`StepIcon`](/api/step-icon/).
   */
  StepIconComponent?: ElementType;
  /**
   * Props applied to the [`StepIcon`](/api/step-icon/) element.
   */
  StepIconProps?: Partial<StepIconProps>;
}

type StepLabelClasskey =
  | 'root'
  | 'horizontal'
  | 'vertical'
  | 'active'
  | 'completed'
  | 'alternativeLabel'
  | 'error'
  | 'disabled'
  | 'label'
  | 'iconContainer'
  | 'labelContainer';

/**
 *
 * Demos:
 *
 * - [Steppers](https://material-ui.com/components/steppers/)
 *
 * API:
 *
 * - [StepLabel API](https://material-ui.com/api/step-label/)
 */
declare function StepLabel(props: StepLabelProps): JSX.Element;

interface SvgIconTypeMap<P = {}, D extends ElementType = 'svg'> {
  props: P & {
    /**
     * Node passed into the SVG element.
     */
    children?: ReactNode;
    /**
     * The color of the component. It supports those theme colors that make sense for this component.
     * You can use the `htmlColor` prop to apply a color attribute to the SVG element.
     */
    color?: 'inherit' | 'primary' | 'secondary' | 'action' | 'disabled' | 'error';
    /**
     * The fontSize applied to the icon. Defaults to 24px, but can be configure to inherit font size.
     */
    fontSize?: 'inherit' | 'default' | 'small' | 'large';
    /**
     * Applies a color attribute to the SVG element.
     */
    htmlColor?: string;
    /**
     * The shape-rendering attribute. The behavior of the different options is described on the
     * [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/shape-rendering).
     * If you are having issues with blurry icons you should investigate this prop.
     * @document
     */
    shapeRendering?: string;
    /**
     * Provides a human-readable title for the element that contains it.
     * https://www.w3.org/TR/SVG-access/#Equivalent
     */
    titleAccess?: string;
    /**
     * Allows you to redefine what the coordinates without units mean inside an SVG element.
     * For example, if the SVG element is 500 (width) by 200 (height), and you pass viewBox="0 0 50 20",
     * this means that the coordinates inside the SVG will go from the top left corner (0,0)
     * to bottom right (50,20) and each unit will be worth 10px.
     */
    viewBox?: string;
  };
  defaultComponent: D;
  classKey: SvgIconClassKey;
}
/**
 *
 * Demos:
 *
 * - [Icons](https://material-ui.com/components/icons/)
 * - [Material Icons](https://material-ui.com/components/material-icons/)
 *
 * API:
 *
 * - [SvgIcon API](https://material-ui.com/api/svg-icon/)
 */
declare const SvgIcon: OverridableComponent<SvgIconTypeMap>;

type SvgIconClassKey =
  | 'root'
  | 'colorSecondary'
  | 'colorAction'
  | 'colorDisabled'
  | 'colorError'
  | 'colorPrimary'
  | 'fontSizeInherit'
  | 'fontSizeSmall'
  | 'fontSizeLarge';

type SvgIconProps<
  D extends ElementType = SvgIconTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<SvgIconTypeMap<P, D>, D>;

interface SwitchProps
  extends StandardProps<SwitchBaseProps, SwitchClassKey, 'checkedIcon' | 'color' | 'icon'> {
  /**
   * The icon to display when the component is checked.
   */
  checkedIcon?: ReactNode;
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   */
  color?: 'primary' | 'secondary' | 'default';
  /**
   * If `true`, the switch will be disabled.
   */
  disabled?: boolean;
  /**
   * The icon to display when the component is unchecked.
   */
  icon?: ReactNode;
  /**
   * The size of the switch.
   * `small` is equivalent to the dense switch styling.
   */
  size?: 'small' | 'medium';
  /**
   * The value of the component. The DOM API casts this to a string.
   * The browser uses "on" as the default value.
   */
  value?: unknown;
}

type SwitchClassKey =
  | SwitchBaseClassKey
  | 'switchBase'
  | 'colorPrimary'
  | 'colorSecondary'
  | 'sizeSmall'
  | 'thumb'
  | 'track';

/**
 *
 * Demos:
 *
 * - [Switches](https://material-ui.com/components/switches/)
 * - [Transfer List](https://material-ui.com/components/transfer-list/)
 *
 * API:
 *
 * - [Switch API](https://material-ui.com/api/switch/)
 * - inherits [IconButton API](https://material-ui.com/api/icon-button/)
 */
declare function Switch(props: SwitchProps): JSX.Element;

type TabTypeMap<P = {}, D extends ElementType = 'div'> = ExtendButtonBaseTypeMap<{
  props: P & {
    disableFocusRipple?: boolean;
    fullWidth?: boolean;
    icon?: string | ReactElement;
    label?: ReactNode;
    onChange?: (event: ChangeEvent<{ checked: boolean }>, value: any) => void;
    onClick?: EventHandler<any>;
    selected?: boolean;
    style?: CSSProperties$1;
    textColor?: string | 'secondary' | 'primary' | 'inherit';
    value?: any;
    wrapped?: boolean;
  };
  defaultComponent: D;
  classKey: TabClassKey;
}>;

/**
 *
 * Demos:
 *
 * - [Tabs](https://material-ui.com/components/tabs/)
 *
 * API:
 *
 * - [Tab API](https://material-ui.com/api/tab/)
 * - inherits [ButtonBase API](https://material-ui.com/api/button-base/)
 */
declare const Tab: ExtendButtonBase<TabTypeMap>;

type TabClassKey =
  | 'root'
  | 'labelIcon'
  | 'textColorInherit'
  | 'textColorPrimary'
  | 'textColorSecondary'
  | 'selected'
  | 'disabled'
  | 'fullWidth'
  | 'wrapped'
  | 'wrapper';

type TabProps<
  D extends ElementType = TabTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<TabTypeMap<P, D>, D>;

interface TableBodyTypeMap<P = {}, D extends ElementType = 'tbody'> {
  props: P;
  defaultComponent: D;
  classKey: TableBodyClassKey;
}
/**
 *
 * Demos:
 *
 * - [Tables](https://material-ui.com/components/tables/)
 *
 * API:
 *
 * - [TableBody API](https://material-ui.com/api/table-body/)
 */
declare const TableBody: OverridableComponent<TableBodyTypeMap>;

type TableBodyClassKey = 'root';

type TableBodyProps<
  D extends ElementType = TableBodyTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<TableBodyTypeMap<P, D>, D>;

type Padding = 'default' | 'checkbox' | 'none';

type Size = 'small' | 'medium';

interface TableTypeMap<P = {}, D extends ElementType = 'table'> {
  props: P & {
    padding?: Padding;
    size?: Size;
    stickyHeader?: boolean;
  };
  defaultComponent: D;
  classKey: TableClassKey;
}
/**
 *
 * Demos:
 *
 * - [Tables](https://material-ui.com/components/tables/)
 *
 * API:
 *
 * - [Table API](https://material-ui.com/api/table/)
 */
declare const Table: OverridableComponent<TableTypeMap>;

type TableClassKey = 'root' | 'stickyHeader';

type TableProps<
  D extends ElementType = TableTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<TableTypeMap<P, D>, D>;

/**
 * `<TableCell>` will be rendered as an `<th>`or `<td>` depending
 * on the context it is used in. Where context literally is the
 * React `context`.
 *
 * Since it is not decided via prop, we have create loose typings
 * here.
 */
interface TableCellProps
  extends StandardProps<TableCellBaseProps, TableCellClassKey, 'align'> {
  /**
   * Set the text-align on the table cell content.
   *
   * Monetary or generally number fields **should be right aligned** as that allows
   * you to add them up quickly in your head without having to worry about decimals.
   */
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
  /**
   * The table cell contents.
   */
  children?: ReactNode;
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component?: ElementType<TableCellBaseProps>;
  /**
   * Sets the padding applied to the cell.
   * By default, the Table parent component set the value (`default`).
   */
  padding?: Padding;
  /**
   * Set scope attribute.
   */
  scope?: TableCellBaseProps['scope'];
  /**
   * Specify the size of the cell.
   * By default, the Table parent component set the value (`medium`).
   */
  size?: Size;
  /**
   * Set aria-sort direction.
   */
  sortDirection?: SortDirection;
  /**
   * Specify the cell type.
   * By default, the TableHead, TableBody or TableFooter parent component set the value.
   */
  variant?: 'head' | 'body' | 'footer';
}

type TableCellBaseProps = ThHTMLAttributes<HTMLTableHeaderCellElement> &
  TdHTMLAttributes<HTMLTableDataCellElement>;

type SortDirection = 'asc' | 'desc' | false;

type TableCellClassKey =
  | 'root'
  | 'head'
  | 'body'
  | 'footer'
  | 'alignLeft'
  | 'alignCenter'
  | 'alignRight'
  | 'alignJustify'
  | 'sizeSmall'
  | 'paddingCheckbox'
  | 'paddingNone'
  | 'stickyHeader';

/**
 * The component renders a `<th>` element when the parent context is a header
 * or otherwise a `<td>` element.
 * Demos:
 *
 * - [Tables](https://material-ui.com/components/tables/)
 *
 * API:
 *
 * - [TableCell API](https://material-ui.com/api/table-cell/)
 */
declare function TableCell(props: TableCellProps): JSX.Element;

interface TableContainerTypeMap<P = {}, D extends ElementType = 'div'> {
  props: P;
  defaultComponent: D;
  classKey: TableContainerClassKey;
}
/**
 *
 * Demos:
 *
 * - [Tables](https://material-ui.com/components/tables/)
 *
 * API:
 *
 * - [TableContainer API](https://material-ui.com/api/table-container/)
 */
declare const TableContainer: OverridableComponent<TableContainerTypeMap>;

type TableContainerClassKey = 'root';

type TableContainerProps<
  D extends ElementType = TableContainerTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<TableContainerTypeMap<P, D>, D>;

interface TableFooterTypeMap<P = {}, D extends ElementType = 'tfoot'> {
  props: P;
  defaultComponent: D;
  classKey: TableFooterClassKey;
}
/**
 *
 * Demos:
 *
 * - [Tables](https://material-ui.com/components/tables/)
 *
 * API:
 *
 * - [TableFooter API](https://material-ui.com/api/table-footer/)
 */
declare const TableFooter: OverridableComponent<TableFooterTypeMap>;

type TableFooterClassKey = 'root';

type TableFooterProps<
  D extends ElementType = TableFooterTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<TableFooterTypeMap<P, D>, D>;

interface TableHeadTypeMap<P = {}, D extends ElementType = 'thead'> {
  props: P;
  defaultComponent: D;
  classKey: TableHeadClassKey;
}
/**
 *
 * Demos:
 *
 * - [Tables](https://material-ui.com/components/tables/)
 *
 * API:
 *
 * - [TableHead API](https://material-ui.com/api/table-head/)
 */
declare const TableHead: OverridableComponent<TableHeadTypeMap>;

type TableHeadClassKey = 'root';

type TableHeadProps<
  D extends ElementType = TableHeadTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<TableHeadTypeMap<P, D>, D>;

interface TablePaginationActionsProps extends HTMLAttributes<HTMLDivElement> {
  backIconButtonProps?: Partial<IconButtonProps>;
  count: number;
  nextIconButtonProps?: Partial<IconButtonProps>;
  onChangePage: (event: MouseEvent<HTMLButtonElement> | null, page: number) => void;
  page: number;
  rowsPerPage: number;
}

interface LabelDisplayedRowsArgs {
  from: number;
  to: number;
  count: number;
  page: number;
}

interface TablePaginationTypeMap<P, D extends ElementType> {
  props: P &
    TablePaginationBaseProps & {
      ActionsComponent?: ElementType<TablePaginationActionsProps>;
      backIconButtonText?: string;
      backIconButtonProps?: Partial<IconButtonProps>;
      count: number;
      labelDisplayedRows?: (paginationInfo: LabelDisplayedRowsArgs) => ReactNode;
      labelRowsPerPage?: ReactNode;
      nextIconButtonProps?: Partial<IconButtonProps>;
      nextIconButtonText?: string;
      onChangePage: (event: MouseEvent<HTMLButtonElement> | null, page: number) => void;
      onChangeRowsPerPage?: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
      page: number;
      rowsPerPage: number;
      rowsPerPageOptions?: Array<number | { value: number; label: string }>;
      SelectProps?: Partial<SelectProps>;
    };
  defaultComponent: D;
  classKey: TablePaginationClassKey;
}

/**
 * A `TableCell` based component for placing inside `TableFooter` for pagination.
 * Demos:
 *
 * - [Tables](https://material-ui.com/components/tables/)
 *
 * API:
 *
 * - [TablePagination API](https://material-ui.com/api/table-pagination/)
 * - inherits [TableCell API](https://material-ui.com/api/table-cell/)
 */
declare const TablePagination: OverridableComponent<TablePaginationTypeMap<
  {},
  ComponentType<TablePaginationBaseProps>
>>;

type TablePaginationClassKey =
  | 'root'
  | 'toolbar'
  | 'spacer'
  | 'menuItem'
  | 'caption'
  | 'input'
  | 'selectRoot'
  | 'select'
  | 'selectIcon'
  | 'actions';

type TablePaginationBaseProps = Omit<TableCellProps, 'classes' | 'component'>;

type TablePaginationProps<
  D extends ElementType = ComponentType<TablePaginationBaseProps>,
  P = {}
> = OverrideProps<TablePaginationTypeMap<P, D>, D>;

interface TableRowTypeMap<P = {}, D extends ElementType = 'tr'> {
  props: P & {
    hover?: boolean;
    selected?: boolean;
  };
  defaultComponent: D;
  classKey: TableRowClassKey;
}
/**
 * Will automatically set dynamic row height
 * based on the material table element parent (head, body, etc).
 * Demos:
 *
 * - [Tables](https://material-ui.com/components/tables/)
 *
 * API:
 *
 * - [TableRow API](https://material-ui.com/api/table-row/)
 */
declare const TableRow: OverridableComponent<TableRowTypeMap>;

type TableRowClassKey = 'root' | 'selected' | 'hover' | 'head' | 'footer';

type TableRowProps<
  D extends ElementType = TableRowTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<TableRowTypeMap<P, D>, D>;

type TableSortLabelTypeMap<
  P = {},
  D extends ElementType = 'span'
> = ExtendButtonBaseTypeMap<{
  props: P & {
    active?: boolean;
    direction?: 'asc' | 'desc';
    hideSortIcon?: boolean;
    IconComponent?: ComponentType<{ className: string }>;
  };
  defaultComponent: D;
  classKey: TableSortLabelClassKey;
}>;

/**
 * A button based label for placing inside `TableCell` for column sorting.
 * Demos:
 *
 * - [Tables](https://material-ui.com/components/tables/)
 *
 * API:
 *
 * - [TableSortLabel API](https://material-ui.com/api/table-sort-label/)
 * - inherits [ButtonBase API](https://material-ui.com/api/button-base/)
 */
declare const TableSortLabel: ExtendButtonBase<TableSortLabelTypeMap>;

type TableSortLabelClassKey =
  | 'root'
  | 'active'
  | 'icon'
  | 'iconDirectionDesc'
  | 'iconDirectionAsc';

type TableSortLabelProps<
  D extends ElementType = TableSortLabelTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<TableSortLabelTypeMap<P, D>, D>;

interface TabScrollButtonProps
  extends StandardProps<HTMLAttributes<HTMLDivElement>, TabScrollButtonClassKey> {
  /**
   * The content of the component.
   */
  children?: ReactNode;
  /**
   * Which direction should the button indicate?
   */
  direction: 'left' | 'right';
  /**
   * If `true`, the element will be disabled.
   */
  disabled?: boolean;
  /**
   * The tabs orientation (layout flow direction).
   */
  orientation: 'horizontal' | 'vertical';
}

type TabScrollButtonClassKey = 'root' | 'vertical' | 'disabled';
/**
 *
 * Demos:
 *
 * - [Tabs](https://material-ui.com/components/tabs/)
 *
 * API:
 *
 * - [TabScrollButton API](https://material-ui.com/api/tab-scroll-button/)
 */
declare function TabScrollButton(props: TabScrollButtonProps): JSX.Element;

interface TabsTypeMap<P = {}, D extends ElementType = typeof ButtonBase> {
  props: P & {
    /**
     * Callback fired when the component mounts.
     * This is useful when you want to trigger an action programmatically.
     * It supports two actions: `updateIndicator()` and `updateScrollButtons()`
     *
     * @param {object} actions This object contains all possible actions
     * that can be triggered programmatically.
     */
    action?: Ref<TabsActions>;
    /**
     * The label for the Tabs as a string.
     */
    'aria-label'?: string;
    /**
     * An id or list of ids separated by a space that label the Tabs.
     */
    'aria-labelledby'?: string;
    /**
     * If `true`, the tabs will be centered.
     * This property is intended for large views.
     */
    centered?: boolean;
    /**
     * The content of the component.
     */
    children?: ReactNode;
    /**
     * Determines the color of the indicator.
     */
    indicatorColor?: 'secondary' | 'primary';
    /**
     * Callback fired when the value changes.
     *
     * @param {object} event The event source of the callback
     * @param {any} value We default to the index of the child (number)
     */
    onChange?: (event: ChangeEvent<{}>, value: any) => void;
    /**
     * The tabs orientation (layout flow direction).
     */
    orientation?: 'horizontal' | 'vertical';
    /**
     * The component used to render the scroll buttons.
     */
    ScrollButtonComponent?: ElementType;
    /**
     * Determine behavior of scroll buttons when tabs are set to scroll:
     *
     * - `auto` will only present them when not all the items are visible.
     * - `desktop` will only present them on medium and larger viewports.
     * - `on` will always present them.
     * - `off` will never present them.
     */
    scrollButtons?: 'auto' | 'desktop' | 'on' | 'off';
    /**
     * If `true` the selected tab changes on focus. Otherwise it only
     * changes on activation.
     */
    selectionFollowsFocus?: boolean;
    /**
     * Props applied to the tab indicator element.
     */
    TabIndicatorProps?: Partial<HTMLAttributes<HTMLDivElement>>;
    /**
     * Props applied to the [`TabScrollButton`](/api/tab-scroll-button/) element.
     */
    TabScrollButtonProps?: Partial<TabScrollButtonProps>;
    /**
     * Determines the color of the `Tab`.
     */
    textColor?: 'secondary' | 'primary' | 'inherit';
    /**
     * The value of the currently selected `Tab`.
     * If you don't want any selected `Tab`, you can set this property to `false`.
     */
    value?: any;
    /**
     *  Determines additional display behavior of the tabs:
     *
     *  - `scrollable` will invoke scrolling properties and allow for horizontally
     *  scrolling (or swiping) of the tab bar.
     *  -`fullWidth` will make the tabs grow to use all the available space,
     *  which should be used for small views, like on mobile.
     *  - `standard` will render the default state.
     */
    variant?: 'standard' | 'scrollable' | 'fullWidth';
  };
  defaultComponent: D;
  classKey: TabsClassKey;
}

/**
 *
 * Demos:
 *
 * - [Tabs](https://material-ui.com/components/tabs/)
 *
 * API:
 *
 * - [Tabs API](https://material-ui.com/api/tabs/)
 */
declare const Tabs: OverridableComponent<TabsTypeMap>;

type TabsClassKey =
  | 'root'
  | 'flexContainer'
  | 'scroller'
  | 'fixed'
  | 'scrollable'
  | 'centered'
  | 'scrollButtons'
  | 'scrollButtonsDesktop'
  | 'indicator';

interface TabsActions {
  updateIndicator(): void;
  updateScrollButtons(): void;
}

type TabsProps<
  D extends ElementType = TabsTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<TabsTypeMap<P, D>, D>;

interface BaseTextFieldProps
  extends StandardProps<
    FormControlProps,
    TextFieldClassKey,
    // event handlers are declared on derived interfaces
    'onChange' | 'onBlur' | 'onFocus' | 'defaultValue'
  > {
  /**
   * This prop helps users to fill forms faster, especially on mobile devices.
   * The name can be confusing, as it's more like an autofill.
   * You can learn more about it [following the specification](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill).
   */
  autoComplete?: string;
  /**
   * If `true`, the `input` element will be focused during the first mount.
   */
  autoFocus?: boolean;
  /**
   * @ignore
   */
  children?: ReactNode;
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   */
  color?: 'primary' | 'secondary';
  /**
   * The default value of the `input` element.
   */
  defaultValue?: unknown;
  /**
   * If `true`, the `input` element will be disabled.
   */
  disabled?: boolean;
  /**
   * If `true`, the label will be displayed in an error state.
   */
  error?: boolean;
  /**
   * Props applied to the [`FormHelperText`](/api/form-helper-text/) element.
   */
  FormHelperTextProps?: Partial<FormHelperTextProps>;
  /**
   * If `true`, the input will take up the full width of its container.
   */
  fullWidth?: boolean;
  /**
   * The helper text content.
   */
  helperText?: ReactNode;
  /**
   * The id of the `input` element.
   * Use this prop to make `label` and `helperText` accessible for screen readers.
   */
  id?: string;
  /**
   * Props applied to the [`InputLabel`](/api/input-label/) element.
   */
  InputLabelProps?: Partial<InputLabelProps>;
  /**
   * Pass a ref to the `input` element.
   */
  inputRef?: Ref<any>;
  /**
   * The label content.
   */
  label?: ReactNode;
  /**
   * If `dense` or `normal`, will adjust vertical spacing of this and contained components.
   */
  margin?: PropTypes.Margin;
  /**
   * If `true`, a textarea element will be rendered instead of an input.
   */
  multiline?: boolean;
  /**
   * Name attribute of the `input` element.
   */
  name?: string;
  /**
   * The short hint displayed in the input before the user enters a value.
   */
  placeholder?: string;
  /**
   * If `true`, the label is displayed as required and the `input` element` will be required.
   */
  required?: boolean;
  /**
   * Number of rows to display when multiline option is set to true.
   */
  rows?: string | number;
  /**
   * Maximum number of rows to display when multiline option is set to true.
   */
  rowsMax?: string | number;
  /**
   * Render a [`Select`](/api/select/) element while passing the Input element to `Select` as `input` parameter.
   * If this option is set you must pass the options of the select as children.
   */
  select?: boolean;
  /**
   * Props applied to the [`Select`](/api/select/) element.
   */
  SelectProps?: Partial<SelectProps>;
  /**
   * The size of the text field.
   */
  size?: 'small' | 'medium';
  /**
   * Type of the `input` element. It should be [a valid HTML5 input type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types).
   */
  type?: InputHTMLAttributes<unknown>['type'];
  /**
   * The value of the `input` element, required for a controlled component.
   */
  value?: unknown;
}

interface StandardTextFieldProps extends BaseTextFieldProps {
  onBlur?: InputProps['onBlur'];
  /**
   * Callback fired when the value is changed.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   */
  onChange?: InputProps['onChange'];
  onFocus?: InputProps['onFocus'];
  /**
   * The variant to use.
   */
  variant?: 'standard';
  /**
   * Props applied to the Input element.
   * It will be a [`FilledInput`](/api/filled-input/),
   * [`OutlinedInput`](/api/outlined-input/) or [`Input`](/api/input/)
   * component depending on the `variant` prop value.
   */
  InputProps?: Partial<InputProps>;
  /**
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element.
   */
  inputProps?: InputProps['inputProps'];
}

interface FilledTextFieldProps extends BaseTextFieldProps {
  onBlur?: FilledInputProps['onBlur'];
  /**
   * Callback fired when the value is changed.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   */
  onChange?: FilledInputProps['onChange'];
  onFocus?: FilledInputProps['onFocus'];
  /**
   * The variant to use.
   */
  variant: 'filled';
  /**
   * Props applied to the Input element.
   * It will be a [`FilledInput`](/api/filled-input/),
   * [`OutlinedInput`](/api/outlined-input/) or [`Input`](/api/input/)
   * component depending on the `variant` prop value.
   */
  InputProps?: Partial<FilledInputProps>;
  /**
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element.
   */
  inputProps?: FilledInputProps['inputProps'];
}

interface OutlinedTextFieldProps extends BaseTextFieldProps {
  onBlur?: OutlinedInputProps['onBlur'];
  /**
   * Callback fired when the value is changed.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   */
  onChange?: OutlinedInputProps['onChange'];
  onFocus?: OutlinedInputProps['onFocus'];
  /**
   * The variant to use.
   */
  variant: 'outlined';
  /**
   * Props applied to the Input element.
   * It will be a [`FilledInput`](/api/filled-input/),
   * [`OutlinedInput`](/api/outlined-input/) or [`Input`](/api/input/)
   * component depending on the `variant` prop value.
   */
  InputProps?: Partial<OutlinedInputProps>;
  /**
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element.
   */
  inputProps?: OutlinedInputProps['inputProps'];
}

type TextFieldProps = StandardTextFieldProps | FilledTextFieldProps | OutlinedTextFieldProps;

type TextFieldClassKey = 'root';

/**
 * The `TextField` is a convenience wrapper for the most common cases (80%).
 * It cannot be all things to all people, otherwise the API would grow out of control.
 *
 * ## Advanced Configuration
 *
 * It's important to understand that the text field is a simple abstraction
 * on top of the following components:
 *
 * -   [FormControl](https://material-ui.com/api/form-control/)
 * -   [InputLabel](https://material-ui.com/api/input-label/)
 * -   [FilledInput](https://material-ui.com/api/filled-input/)
 * -   [OutlinedInput](https://material-ui.com/api/outlined-input/)
 * -   [Input](https://material-ui.com/api/input/)
 * -   [FormHelperText](https://material-ui.com/api/form-helper-text/)
 *
 * If you wish to alter the props applied to the `input` element, you can do so as follows:
 *
 * ```jsx
 * const inputProps = {
 *   step: 300,
 * };
 *
 * return <TextField id="time" type="time" inputProps={inputProps} />;
 * ```
 *
 * For advanced cases, please look at the source of TextField by clicking on the
 * "Edit this page" button above. Consider either:
 *
 * -   using the upper case props for passing values directly to the components
 * -   using the underlying components directly as shown in the demos
 * Demos:
 *
 * - [Autocomplete](https://material-ui.com/components/autocomplete/)
 * - [Pickers](https://material-ui.com/components/pickers/)
 * - [Text Fields](https://material-ui.com/components/text-fields/)
 *
 * API:
 *
 * - [TextField API](https://material-ui.com/api/text-field/)
 * - inherits [FormControl API](https://material-ui.com/api/form-control/)
 */
declare function TextField(props: TextFieldProps): JSX.Element;

interface ToolbarTypeMap<P = {}, D extends ElementType = 'div'> {
  props: P & {
    disableGutters?: boolean;
    variant?: 'regular' | 'dense';
  };
  defaultComponent: D;
  classKey: ToolbarClassKey;
}
/**
 *
 * Demos:
 *
 * - [App Bar](https://material-ui.com/components/app-bar/)
 *
 * API:
 *
 * - [Toolbar API](https://material-ui.com/api/toolbar/)
 */
declare const Toolbar: OverridableComponent<ToolbarTypeMap>;

type ToolbarClassKey = 'root' | 'gutters' | 'regular' | 'dense';

type ToolbarProps<
  D extends ElementType = ToolbarTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<ToolbarTypeMap<P, D>, D>;

type Placement = Popper.Placement;
type BaseModifier = Popper.BaseModifier;
type PopperOptions = Popper.PopperOptions;
type ReferenceObject = Popper.ReferenceObject;
/**
 * @fileoverview This file only declares the public portions of the API.
 * It should not define internal pieces such as utils or modifier details.
 *
 * Original definitions by: edcarroll <https://github.com/edcarroll>, ggray <https://github.com/giladgray>, rhysd <https://rhysd.github.io>, joscha <https://github.com/joscha>, seckardt <https://github.com/seckardt>, marcfallows <https://github.com/marcfallows>
 */

/**
 * This kind of namespace declaration is not necessary, but is kept here for backwards-compatibility with
 * popper.js 1.x. It can be removed in 2.x so that the default export is simply the Popper class
 * and all the types / interfaces are top-level named exports.
 */
declare namespace Popper {
  export type Position = 'top' | 'right' | 'bottom' | 'left';

  export type Placement = 'auto-start'
    | 'auto'
    | 'auto-end'
    | 'top-start'
    | 'top'
    | 'top-end'
    | 'right-start'
    | 'right'
    | 'right-end'
    | 'bottom-end'
    | 'bottom'
    | 'bottom-start'
    | 'left-end'
    | 'left'
    | 'left-start';

  export type Boundary = 'scrollParent' | 'viewport' | 'window';

  export type Behavior = 'flip' | 'clockwise' | 'counterclockwise';

  export type ModifierFn = (data: Data, options: Object) => Data;

  export interface Attributes {
    'x-out-of-boundaries': '' | false;
    'x-placement': Placement;
  }

  export interface Padding {
    top?: number,
    bottom?: number,
    left?: number,
    right?: number,
  }

  export interface BaseModifier {
    order?: number;
    enabled?: boolean;
    fn?: ModifierFn;
  }

  export interface Modifiers {
    shift?: BaseModifier;
    offset?: BaseModifier & {
      offset?: number | string,
    };
    preventOverflow?: BaseModifier & {
      priority?: Position[],
      padding?: number | Padding,
      boundariesElement?: Boundary | Element,
      escapeWithReference?: boolean
    };
    keepTogether?: BaseModifier;
    arrow?: BaseModifier & {
      element?: string | Element,
    };
    flip?: BaseModifier & {
      behavior?: Behavior | Position[],
      padding?: number | Padding,
      boundariesElement?: Boundary | Element,
      flipVariations?: boolean,
      flipVariationsByContent?: boolean,
    };
    inner?: BaseModifier;
    hide?: BaseModifier;
    applyStyle?: BaseModifier & {
      onLoad?: Function,
      gpuAcceleration?: boolean,
    };
    computeStyle?: BaseModifier & {
      gpuAcceleration?: boolean;
      x?: 'bottom' | 'top',
      y?: 'left' | 'right'
    };

    [name: string]: (BaseModifier & Record<string, any>) | undefined;
  }

  export interface Offset {
    top: number;
    left: number;
    width: number;
    height: number;
  }

  export interface Data {
    instance: Popper;
    placement: Placement;
    originalPlacement: Placement;
    flipped: boolean;
    hide: boolean;
    arrowElement: Element;
    styles: CSSStyleDeclaration;
    arrowStyles: CSSStyleDeclaration;
    attributes: Attributes;
    boundaries: Object;
    offsets: {
      popper: Offset,
      reference: Offset,
      arrow: {
        top: number,
        left: number,
      },
    };
  }

  export interface PopperOptions {
    placement?: Placement;
    positionFixed?: boolean;
    eventsEnabled?: boolean;
    modifiers?: Modifiers;
    removeOnDestroy?: boolean;

    onCreate?(data: Data): void;

    onUpdate?(data: Data): void;
  }

  export interface ReferenceObject {
    clientHeight: number;
    clientWidth: number;
    referenceNode?: Node;

    getBoundingClientRect(): ClientRect;
  }
}

declare class Popper {
  static modifiers: (BaseModifier & { name: string })[];
  static placements: Placement[];
  static Defaults: PopperOptions;

  options: PopperOptions;
  popper: Element;
  reference: Element | ReferenceObject;

  constructor(reference: Element | ReferenceObject, popper: Element, options?: PopperOptions);

  destroy(): void;

  update(): void;

  scheduleUpdate(): void;

  enableEventListeners(): void;

  disableEventListeners(): void;
}

type PopperPlacementType =
  | 'bottom-end'
  | 'bottom-start'
  | 'bottom'
  | 'left-end'
  | 'left-start'
  | 'left'
  | 'right-end'
  | 'right-start'
  | 'right'
  | 'top-end'
  | 'top-start'
  | 'top';

interface PopperProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  ref?: Ref<HTMLDivElement>;
  /**
   * A HTML element, [referenceObject](https://popper.js.org/docs/v1/#referenceObject),
   * or a function that returns either.
   * It's used to set the position of the popper.
   * The return value will passed as the reference object of the Popper instance.
   */
  anchorEl?: null | ReferenceObject | (() => ReferenceObject);
  /**
   * Popper render function or node.
   */
  children:
    | ReactNode
    | ((props: {
        placement: PopperPlacementType;
        TransitionProps?: {
          in: boolean;
          onEnter: () => {};
          onExited: () => {};
        };
      }) => ReactNode);
  /**
   * A HTML element, component instance, or function that returns either.
   * The `container` will have the portal children appended to it.
   *
   * By default, it uses the body of the top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container?: PortalProps['container'];
  /**
   * Disable the portal behavior.
   * The children stay within it's parent DOM hierarchy.
   */
  disablePortal?: PortalProps['disablePortal'];
  /**
   * Always keep the children in the DOM.
   * This prop can be useful in SEO situation or
   * when you want to maximize the responsiveness of the Popper.
   */
  keepMounted?: boolean;
  /**
   * Popper.js is based on a "plugin-like" architecture,
   * most of its features are fully encapsulated "modifiers".
   *
   * A modifier is a function that is called each time Popper.js needs to
   * compute the position of the popper.
   * For this reason, modifiers should be very performant to avoid bottlenecks.
   * To learn how to create a modifier, [read the modifiers documentation](https://popper.js.org/docs/v1/#modifiers).
   */
  modifiers?: object;
  /**
   * If `true`, the popper is visible.
   */
  open: boolean;
  /**
   * Popper placement.
   */
  placement?: PopperPlacementType;
  /**
   * Options provided to the [`popper.js`](https://popper.js.org/docs/v1/) instance.
   */
  popperOptions?: object;
  /**
   * A ref that points to the used popper instance.
   */
  popperRef?: Ref<Popper>;
  /**
   * Help supporting a react-transition-group/Transition component.
   */
  transition?: boolean;
}

/**
 * Poppers rely on the 3rd party library [Popper.js](https://popper.js.org/docs/v1/) for positioning.
 * Demos:
 *
 * - [Autocomplete](https://material-ui.com/components/autocomplete/)
 * - [Menus](https://material-ui.com/components/menus/)
 * - [Popper](https://material-ui.com/components/popper/)
 *
 * API:
 *
 * - [Popper API](https://material-ui.com/api/popper/)
 */
declare function Popper$1(props: PopperProps): JSX.Element;

interface TooltipProps
  extends StandardProps<HTMLAttributes<HTMLDivElement>, TooltipClassKey, 'title'> {
  /**
   * If `true`, adds an arrow to the tooltip.
   */
  arrow?: boolean;
  /**
   * Tooltip reference element.
   */
  children: ReactElement<any, any>;
  /**
   * Do not respond to focus events.
   */
  disableFocusListener?: boolean;
  /**
   * Do not respond to hover events.
   */
  disableHoverListener?: boolean;
  /**
   * Do not respond to long press touch events.
   */
  disableTouchListener?: boolean;
  /**
   * The number of milliseconds to wait before showing the tooltip.
   * This prop won't impact the enter touch delay (`enterTouchDelay`).
   */
  enterDelay?: number;
  /**
   * The number of milliseconds to wait before showing the tooltip when one was already recently opened.
   */
  enterNextDelay?: number;
  /**
   * The number of milliseconds a user must touch the element before showing the tooltip.
   */
  enterTouchDelay?: number;
  /**
   * This prop is used to help implement the accessibility logic.
   * If you don't provide this prop. It falls back to a randomly generated id.
   */
  id?: string;
  /**
   * Makes a tooltip interactive, i.e. will not close when the user
   * hovers over the tooltip before the `leaveDelay` is expired.
   */
  interactive?: boolean;
  /**
   * The number of milliseconds to wait before hiding the tooltip.
   * This prop won't impact the leave touch delay (`leaveTouchDelay`).
   */
  leaveDelay?: number;
  /**
   * The number of milliseconds after the user stops touching an element before hiding the tooltip.
   */
  leaveTouchDelay?: number;
  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {object} event The event source of the callback.
   */
  onClose?: (event: ChangeEvent<{}>) => void;
  /**
   * Callback fired when the component requests to be open.
   *
   * @param {object} event The event source of the callback.
   */
  onOpen?: (event: ChangeEvent<{}>) => void;
  /**
   * If `true`, the tooltip is shown.
   */
  open?: boolean;
  /**
   * Tooltip placement.
   */
  placement?:
    | 'bottom-end'
    | 'bottom-start'
    | 'bottom'
    | 'left-end'
    | 'left-start'
    | 'left'
    | 'right-end'
    | 'right-start'
    | 'right'
    | 'top-end'
    | 'top-start'
    | 'top';
  /**
   * The component used for the popper.
   */
  PopperComponent?: ComponentType<PopperProps>;
  /**
   * Props applied to the [`Popper`](/api/popper/) element.
   */
  PopperProps?: Partial<PopperProps>;
  /**
   * Tooltip title. Zero-length titles string are never displayed.
   */
  title: NonNullable<ReactNode>;
  /**
   * The component used for the transition.
   * [Follow this guide](/components/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   */
  TransitionComponent?: ComponentType<
    TransitionProps$1 & { children?: ReactElement<any, any> }
  >;
  /**
   * Props applied to the [`Transition`](http://reactcommunity.org/react-transition-group/transition#Transition-props) element.
   */
  TransitionProps?: TransitionProps$1;
}

type TooltipClassKey =
  | 'popper'
  | 'popperInteractive'
  | 'popperArrow'
  | 'tooltip'
  | 'tooltipArrow'
  | 'arrow'
  | 'touch'
  | 'tooltipPlacementLeft'
  | 'tooltipPlacementRight'
  | 'tooltipPlacementTop'
  | 'tooltipPlacementBottom';

/**
 *
 * Demos:
 *
 * - [Tooltips](https://material-ui.com/components/tooltips/)
 *
 * API:
 *
 * - [Tooltip API](https://material-ui.com/api/tooltip/)
 */
declare function Tooltip(props: TooltipProps): JSX.Element;

type Overrides = {
  [Name in keyof ComponentNameToClassKey]?: Partial<StyleRules$1<ComponentNameToClassKey[Name]>>;
} & {
  MuiCssBaseline?: {
    '@global'?: {
      '@font-face'?: CSSProperties['@font-face'];
    } & Record<string, CSSProperties['@font-face'] | CSSProperties>; // allow arbitrary selectors
  };
};

interface ComponentNameToClassKey {
  MuiAppBar: AppBarClassKey;
  MuiAvatar: AvatarClassKey;
  MuiBackdrop: BackdropClassKey;
  MuiBadge: BadgeClassKey;
  MuiBottomNavigation: BottomNavigationClassKey;
  MuiBottomNavigationAction: BottomNavigationActionClassKey;
  MuiBreadcrumbs: BreadcrumbsClassKey;
  MuiButton: ButtonClassKey;
  MuiButtonBase: ButtonBaseClassKey;
  MuiButtonGroup: ButtonGroupClassKey;
  MuiCard: CardClassKey;
  MuiCardActionArea: CardActionAreaClassKey;
  MuiCardActions: CardActionsClassKey;
  MuiCardContent: CardContentClassKey;
  MuiCardHeader: CardHeaderClassKey;
  MuiCardMedia: CardMediaClassKey;
  MuiCheckbox: CheckboxClassKey;
  MuiChip: ChipClassKey;
  MuiCircularProgress: CircularProgressClassKey;
  MuiCollapse: CollapseClassKey;
  MuiContainer: ContainerClassKey;
  /**
   * @deprecated See CssBaseline.d.ts
   */
  MuiCssBaseline: '@global';
  MuiDialog: DialogClassKey;
  MuiDialogActions: DialogActionsClassKey;
  MuiDialogContent: DialogContentClassKey;
  MuiDialogContentText: DialogContentTextClassKey;
  MuiDialogTitle: DialogTitleClassKey;
  MuiDivider: DividerClassKey;
  MuiDrawer: DrawerClassKey;
  MuiAccordion: AccordionClassKey;
  MuiAccordionActions: AccordionActionsClassKey;
  MuiAccordionDetails: AccordionDetailsClassKey;
  MuiAccordionSummary: AccordionSummaryClassKey;
  MuiExpansionPanel: ExpansionPanelClassKey;
  MuiExpansionPanelActions: ExpansionPanelActionsClassKey;
  MuiExpansionPanelDetails: ExpansionPanelDetailsClassKey;
  MuiExpansionPanelSummary: ExpansionPanelSummaryClassKey;
  MuiFab: FabClassKey;
  MuiFilledInput: FilledInputClassKey;
  MuiFormControl: FormControlClassKey;
  MuiFormControlLabel: FormControlLabelClassKey;
  MuiFormGroup: FormGroupClassKey;
  MuiFormHelperText: FormHelperTextClassKey;
  MuiFormLabel: FormLabelClassKey;
  MuiGrid: GridClassKey;
  MuiGridList: GridListClassKey;
  MuiGridListTile: GridListTileClassKey;
  MuiGridListTileBar: GridListTileBarClassKey;
  MuiIcon: IconClassKey;
  MuiIconButton: IconButtonClassKey;
  MuiInput: InputClassKey;
  MuiInputAdornment: InputAdornmentClassKey;
  MuiInputBase: InputBaseClassKey;
  MuiInputLabel: InputLabelClassKey;
  MuiLinearProgress: LinearProgressClassKey;
  MuiLink: LinkClassKey;
  MuiList: ListClassKey;
  MuiListItem: ListItemClassKey;
  MuiListItemAvatar: ListItemAvatarClassKey;
  MuiListItemIcon: ListItemIconClassKey;
  MuiListItemSecondaryAction: ListItemSecondaryActionClassKey;
  MuiListItemText: ListItemTextClassKey;
  MuiListSubheader: ListSubheaderClassKey;
  MuiMenu: MenuClassKey;
  MuiMenuItem: MenuItemClassKey;
  MuiMobileStepper: MobileStepperClassKey;
  MuiNativeSelect: NativeSelectClassKey;
  MuiOutlinedInput: OutlinedInputClassKey;
  MuiPaper: PaperClassKey;
  MuiPopover: PopoverClassKey;
  MuiRadio: RadioClassKey;
  MuiScopedCssBaseline: ScopedCssBaselineClassKey;
  MuiSelect: SelectClassKey;
  MuiSlider: SliderClassKey;
  MuiSnackbar: SnackbarClassKey;
  MuiSnackbarContent: SnackbarContentClassKey;
  MuiStep: StepClasskey;
  MuiStepButton: StepButtonClasskey;
  MuiStepConnector: StepConnectorClasskey;
  MuiStepContent: StepContentClasskey;
  MuiStepIcon: StepIconClasskey;
  MuiStepLabel: StepLabelClasskey;
  MuiStepper: StepperClasskey;
  MuiSvgIcon: SvgIconClassKey;
  MuiSwitch: SwitchClassKey;
  MuiTab: TabClassKey;
  MuiTable: TableClassKey;
  MuiTableBody: TableBodyClassKey;
  MuiTableCell: TableCellClassKey;
  MuiTableContainer: TableContainerClassKey;
  MuiTableFooter: TableFooterClassKey;
  MuiTableHead: TableHeadClassKey;
  MuiTablePagination: TablePaginationClassKey;
  MuiTableRow: TableRowClassKey;
  MuiTableSortLabel: TableSortLabelClassKey;
  MuiTabs: TabsClassKey;
  MuiTextField: TextFieldClassKey;
  MuiToolbar: ToolbarClassKey;
  MuiTooltip: TooltipClassKey;
  MuiTouchRipple: TouchRippleClassKey;
  MuiTypography: TypographyClassKey;
}

interface CssBaselineProps extends StyledComponentProps<never> {
  /**
   * You can wrap a node.
   */
  children?: ReactNode;
}

/**
 * @deprecated The name of this type is misleading. `CssBaseline` implements no class at all.
 */
type CssBaselineClassKey = '@global';

/**
 * Kickstart an elegant, consistent, and simple baseline to build upon.
 * Demos:
 *
 * - [Css Baseline](https://material-ui.com/components/css-baseline/)
 *
 * API:
 *
 * - [CssBaseline API](https://material-ui.com/api/css-baseline/)
 */
declare function CssBaseline(props: CssBaselineProps): JSX.Element;

interface MuiMediaQueryListEvent {
  matches: boolean;
}

interface MuiMediaQueryList {
  matches: boolean;
  addListener: (listener: MuiMediaQueryListListener) => void;
  removeListener: (listener: MuiMediaQueryListListener) => void;
}

type MuiMediaQueryListListener = (event: MuiMediaQueryListEvent) => void;

interface Options {
  defaultMatches?: boolean;
  noSsr?: boolean;
  ssrMatchMedia?: (query: string) => { matches: boolean };
}

declare function useMediaQuery<Theme = unknown>(
  query: string | ((theme: Theme) => string),
  options?: Options
): boolean;

interface RadioGroupProps
  extends StandardProps<FormGroupProps, RadioGroupClassKey, 'onChange'> {
  /**
   * The default `input` element value. Use when the component is not controlled.
   */
  defaultValue?: FormGroupProps['defaultValue'];
  /**
   * The name used to reference the value of the control.
   * If you don't provide this prop, it falls back to a randomly generated name.
   */
  name?: string;
  /**
   * Callback fired when a radio button is selected.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   */
  onChange?: (event: ChangeEvent<HTMLInputElement>, value: string) => void;
  /**
   * Value of the selected radio button. The DOM API casts this to a string.
   */
  value?: any;
}

type RadioGroupClassKey = FormGroupClassKey;

/**
 *
 * Demos:
 *
 * - [Radio Buttons](https://material-ui.com/components/radio-buttons/)
 *
 * API:
 *
 * - [RadioGroup API](https://material-ui.com/api/radio-group/)
 * - inherits [FormGroup API](https://material-ui.com/api/form-group/)
 */
declare function RadioGroup(props: RadioGroupProps): JSX.Element;

interface RadioGroupState extends Pick<RadioGroupProps, 'name' | 'onChange' | 'value'> {}

declare function useRadioGroup(): RadioGroupState | undefined;

interface SwipeableDrawerProps extends Omit<DrawerProps, 'onClose' | 'open'> {
  disableBackdropTransition?: boolean;
  disableDiscovery?: boolean;
  disableSwipeToOpen?: boolean;
  hysteresis?: number;
  minFlingVelocity?: number;
  onClose: ReactEventHandler<{}>;
  onOpen: ReactEventHandler<{}>;
  open: boolean;
  SwipeAreaProps?: object;
  swipeAreaWidth?: number;
}

/**
 *
 * Demos:
 *
 * - [Drawers](https://material-ui.com/components/drawers/)
 *
 * API:
 *
 * - [SwipeableDrawer API](https://material-ui.com/api/swipeable-drawer/)
 * - inherits [Drawer API](https://material-ui.com/api/drawer/)
 */
declare const SwipeableDrawer: ComponentType<SwipeableDrawerProps>;

interface WithWidthOptions {
  withTheme?: boolean;
  noSSR?: boolean;
  initialWidth?: Breakpoint;
  resizeInterval?: number;
}

interface WithWidth {
  width: Breakpoint;
}

interface WithWidthProps extends Partial<WithWidth> {
  innerRef?: React.Ref<any>;
}

declare function isWidthDown(
  breakpoint: Breakpoint,
  screenWidth: Breakpoint,
  inclusive?: boolean
): boolean;

declare function isWidthUp(
  breakpoint: Breakpoint,
  screenWidth: Breakpoint,
  inclusive?: boolean
): boolean;

declare function withWidth(
  options?: WithWidthOptions
): PropInjector<WithWidth, WithWidthProps>;

type ComponentsProps = {
  [Name in keyof ComponentsPropsList]?: Partial<ComponentsPropsList[Name]>;
};

interface ComponentsPropsList {
  MuiAppBar: AppBarProps;
  MuiAvatar: AvatarProps;
  MuiBackdrop: BackdropProps;
  MuiBadge: BadgeProps;
  MuiBottomNavigation: BottomNavigationProps;
  MuiBottomNavigationAction: BottomNavigationActionProps;
  MuiBreadcrumbs: BreadcrumbsProps;
  MuiButton: ButtonProps;
  MuiButtonBase: ButtonBaseProps;
  MuiButtonGroup: ButtonGroupProps;
  MuiCard: CardProps;
  MuiCardActionArea: CardActionAreaProps;
  MuiCardActions: CardActionsProps;
  MuiCardContent: CardContentProps;
  MuiCardHeader: CardHeaderProps;
  MuiCardMedia: CardMediaProps;
  MuiCheckbox: CheckboxProps;
  MuiChip: ChipProps;
  MuiCircularProgress: CircularProgressProps;
  MuiCollapse: CollapseProps;
  MuiContainer: ContainerProps;
  MuiCssBaseline: CssBaselineProps;
  MuiDialog: DialogProps;
  MuiDialogActions: DialogActionsProps;
  MuiDialogContent: DialogContentProps;
  MuiDialogContentText: DialogContentTextProps;
  MuiDialogTitle: DialogTitleProps;
  MuiDivider: DividerProps;
  MuiDrawer: DrawerProps;
  MuiAccordion: AccordionProps;
  MuiAccordionActions: AccordionActionsProps;
  MuiAccordionDetails: AccordionDetailsProps;
  MuiAccordionSummary: AccordionSummaryProps;
  MuiExpansionPanel: ExpansionPanelProps;
  MuiExpansionPanelActions: ExpansionPanelActionsProps;
  MuiExpansionPanelDetails: ExpansionPanelDetailsProps;
  MuiExpansionPanelSummary: ExpansionPanelSummaryProps;
  MuiFab: FabProps;
  MuiFilledInput: FilledInputProps;
  MuiFormControl: FormControlProps;
  MuiFormControlLabel: FormControlLabelProps;
  MuiFormGroup: FormGroupProps;
  MuiFormHelperText: FormHelperTextProps;
  MuiFormLabel: FormLabelProps;
  MuiGrid: GridProps;
  MuiGridList: GridListProps;
  MuiGridListTile: GridListTileProps;
  MuiGridListTileBar: GridListTileBarProps;
  MuiIcon: IconProps;
  MuiIconButton: IconButtonProps;
  MuiInput: InputProps;
  MuiInputAdornment: InputAdornmentProps;
  MuiInputBase: InputBaseProps;
  MuiInputLabel: InputLabelProps;
  MuiLinearProgress: LinearProgressProps;
  MuiLink: LinkProps;
  MuiList: ListProps;
  MuiListItem: ListItemProps;
  MuiListItemAvatar: ListItemAvatarProps;
  MuiListItemIcon: ListItemIconProps;
  MuiListItemSecondaryAction: ListItemSecondaryActionProps;
  MuiListItemText: ListItemTextProps;
  MuiListSubheader: ListSubheaderProps;
  MuiMenu: MenuProps;
  MuiMenuItem: MenuItemProps;
  MuiMenuList: MenuListProps;
  MuiMobileStepper: MobileStepperProps;
  MuiModal: ModalProps;
  MuiNativeSelect: NativeSelectProps;
  MuiOutlinedInput: OutlinedInputProps;
  MuiPaper: PaperProps;
  MuiPopover: PopoverProps;
  MuiRadio: RadioProps;
  MuiRadioGroup: RadioGroupProps;
  MuiSelect: SelectProps;
  MuiSlider: SliderProps;
  MuiSnackbar: SnackbarProps;
  MuiSnackbarContent: SnackbarContentProps;
  MuiStep: StepProps;
  MuiStepButton: StepButtonProps;
  MuiStepConnector: StepConnectorProps;
  MuiStepContent: StepContentProps;
  MuiStepIcon: StepIconProps;
  MuiStepLabel: StepLabelProps;
  MuiStepper: StepperProps;
  MuiSvgIcon: SvgIconProps;
  MuiSwipeableDrawer: SwipeableDrawerProps;
  MuiSwitch: SwitchProps;
  MuiTab: TabProps;
  MuiTable: TableProps;
  MuiTableBody: TableBodyProps;
  MuiTableCell: TableCellProps;
  MuiTableContainer: TableContainerProps;
  MuiTableHead: TableHeadProps;
  MuiTablePagination: TablePaginationProps;
  MuiTableRow: TableRowProps;
  MuiTableSortLabel: TableSortLabelProps;
  MuiTabs: TabsProps;
  MuiTextField: TextFieldProps;
  MuiToolbar: ToolbarProps;
  MuiTooltip: TooltipProps;
  MuiTouchRipple: TouchRippleProps;
  MuiTypography: TypographyProps;
  MuiUseMediaQuery: Options;
  MuiWithWidth: WithWidthOptions;
}

type Direction = 'ltr' | 'rtl';

interface ThemeOptions {
  shape?: ShapeOptions;
  breakpoints?: BreakpointsOptions;
  direction?: Direction;
  mixins?: MixinsOptions;
  overrides?: Overrides;
  palette?: PaletteOptions;
  props?: ComponentsProps;
  shadows?: Shadows;
  spacing?: SpacingOptions;
  transitions?: TransitionsOptions;
  typography?: TypographyOptions | ((palette: Palette) => TypographyOptions);
  zIndex?: ZIndexOptions;
  unstable_strictMode?: boolean;
}

interface Theme {
  shape: Shape;
  breakpoints: Breakpoints;
  direction: Direction;
  mixins: Mixins;
  overrides?: Overrides;
  palette: Palette;
  props?: ComponentsProps;
  shadows: Shadows;
  spacing: Spacing;
  transitions: Transitions;
  typography: Typography;
  zIndex: ZIndex;
  unstable_strictMode?: boolean;
}

declare function createMuiTheme(options?: ThemeOptions, ...args: object[]): Theme;

/**
 * This function doesn't really "do anything" at runtime, it's just the identity
 * function. Its only purpose is to defeat TypeScript's type widening when providing
 * style rules to `withStyles` which are a function of the `Theme`.
 *
 * @param styles a set of style mappings
 * @returns the same styles that were passed in
 */
// For TypeScript v3.5 Props has to extend {} instead of object
// See https://github.com/mui-org/material-ui/issues/15942
// and https://github.com/microsoft/TypeScript/issues/31735
declare function createStyles<ClassKey extends string, Props extends {}>(
  styles: StyleRules<Props, ClassKey>
): StyleRules<Props, ClassKey>;

declare function makeStyles<
  Theme = Theme,
  Props extends object = {},
  ClassKey extends string = string
>(
  styles: Styles$1<Theme, Props, ClassKey>,
  options?: Omit<WithStylesOptions<Theme>, 'withTheme'>
): keyof Props extends never // `makeStyles` where the passed `styles` do not depend on props
  ? (props?: any) => ClassNameMap<ClassKey> // `makeStyles` where the passed `styles` do depend on props
  : (props: Props) => ClassNameMap<ClassKey>;

interface ResponsiveFontSizesOptions {
  breakpoints?: Breakpoint[];
  disableAlign?: boolean;
  factor?: number;
  variants?: Variant[];
}

declare function responsiveFontSizes(
  theme: Theme,
  options?: ResponsiveFontSizesOptions
): Theme;

declare function useTheme<T = Theme>(): T;

interface WithTheme {
  theme: Theme;
}

interface ThemedComponentProps extends Partial<WithTheme> {
  /**
   * Deprecated. Will be removed in v5. Refs are now automatically forwarded to
   * the inner component.
   * @deprecated since version 4.0
   */
  innerRef?: React.Ref<any>;
  ref?: React.Ref<unknown>;
}

declare const withTheme: PropInjector<WithTheme, ThemedComponentProps>;

// These definitions are almost identical to the ones in @material-ui/styles/styled
// Only difference is that ComponentCreator has a default theme type
// If you need to change these types, update the ones in @material-ui/styles as well

/**
 * @internal
 */
type ComponentCreator<Component extends ElementType> = <
  Theme = Theme,
  Props extends {} = {}
>(
  styles:
    | CreateCSSProperties<Props>
    | ((props: { theme: Theme } & Props) => CreateCSSProperties<Props>),
  options?: WithStylesOptions<Theme>
) => ComponentType<
  Omit<
    JSX.LibraryManagedAttributes<Component, ComponentProps<Component>>,
    'classes' | 'className'
  > &
    StyledComponentProps<'root'> & { className?: string } & (Props extends { theme: Theme }
      ? Omit<Props, 'theme'> & { theme?: Theme }
      : Props)
>;

interface StyledProps {
  className: string;
}

declare function styled<Component extends ElementType>(
  Component: Component
): ComponentCreator<Component>;

interface GenerateClassNameOptions {
  disableGlobal?: boolean;
  productionPrefix?: string;
  seed?: string;
}

declare function createGenerateClassName(options?: GenerateClassNameOptions): GenerateId;

declare function jssPreset(): JssOptions;

interface StylesOptions {
  disableGeneration?: boolean;
  generateClassName?: GenerateId;
  injectFirst?: boolean;
  jss?: Jss;
  // TODO need info @oliviertassinari
  sheetsCache?: {};
  // TODO need info @oliviertassinari
  sheetsManager?: {};
  // TODO need info @oliviertassinari
  sheetsRegistry?: {};
}

interface StylesProviderProps extends StylesOptions {
  children: React.ReactNode;
}

declare const StylesProvider: React.ComponentType<StylesProviderProps>;

declare class ServerStyleSheets {
  constructor(options?: object);
  collect(children: ReactNode, options?: object): ReactElement<StylesProviderProps>;
  toString(): string;
  getStyleElement(props?: object): ReactElement;
}

interface ThemeProviderProps<Theme = DefaultTheme> {
  children: React.ReactNode;
  theme: Partial<Theme> | ((outerTheme: Theme) => Theme);
}
declare function ThemeProvider<T = DefaultTheme>(
  props: ThemeProviderProps<T>
): React.ReactElement<ThemeProviderProps<T>>;

/* tslint:disable max-line-length */
/**
 * ![amber 50](https://material-ui.com/static/colors-preview/amber-50-24x24.svg) ![amber 100](https://material-ui.com/static/colors-preview/amber-100-24x24.svg) ![amber 200](https://material-ui.com/static/colors-preview/amber-200-24x24.svg) ![amber 300](https://material-ui.com/static/colors-preview/amber-300-24x24.svg) ![amber 400](https://material-ui.com/static/colors-preview/amber-400-24x24.svg) ![amber 500](https://material-ui.com/static/colors-preview/amber-500-24x24.svg) ![amber 600](https://material-ui.com/static/colors-preview/amber-600-24x24.svg) ![amber 700](https://material-ui.com/static/colors-preview/amber-700-24x24.svg) ![amber 800](https://material-ui.com/static/colors-preview/amber-800-24x24.svg) ![amber 900](https://material-ui.com/static/colors-preview/amber-900-24x24.svg) ![amber A100](https://material-ui.com/static/colors-preview/amber-A100-24x24.svg) ![amber A200](https://material-ui.com/static/colors-preview/amber-A200-24x24.svg) ![amber A400](https://material-ui.com/static/colors-preview/amber-A400-24x24.svg) ![amber A700](https://material-ui.com/static/colors-preview/amber-A700-24x24.svg)
 */
declare const amber: {
  /**
   * Preview: ![amber 50](https://material-ui.com/static/colors-preview/amber-50-24x24.svg)
   */
  50: '#fff8e1';
  /**
   * Preview: ![amber 100](https://material-ui.com/static/colors-preview/amber-100-24x24.svg)
   */
  100: '#ffecb3';
  /**
   * Preview: ![amber 200](https://material-ui.com/static/colors-preview/amber-200-24x24.svg)
   */
  200: '#ffe082';
  /**
   * Preview: ![amber 300](https://material-ui.com/static/colors-preview/amber-300-24x24.svg)
   */
  300: '#ffd54f';
  /**
   * Preview: ![amber 400](https://material-ui.com/static/colors-preview/amber-400-24x24.svg)
   */
  400: '#ffca28';
  /**
   * Preview: ![amber 500](https://material-ui.com/static/colors-preview/amber-500-24x24.svg)
   */
  500: '#ffc107';
  /**
   * Preview: ![amber 600](https://material-ui.com/static/colors-preview/amber-600-24x24.svg)
   */
  600: '#ffb300';
  /**
   * Preview: ![amber 700](https://material-ui.com/static/colors-preview/amber-700-24x24.svg)
   */
  700: '#ffa000';
  /**
   * Preview: ![amber 800](https://material-ui.com/static/colors-preview/amber-800-24x24.svg)
   */
  800: '#ff8f00';
  /**
   * Preview: ![amber 900](https://material-ui.com/static/colors-preview/amber-900-24x24.svg)
   */
  900: '#ff6f00';
  /**
   * Preview: ![amber A100](https://material-ui.com/static/colors-preview/amber-A100-24x24.svg)
   */
  A100: '#ffe57f';
  /**
   * Preview: ![amber A200](https://material-ui.com/static/colors-preview/amber-A200-24x24.svg)
   */
  A200: '#ffd740';
  /**
   * Preview: ![amber A400](https://material-ui.com/static/colors-preview/amber-A400-24x24.svg)
   */
  A400: '#ffc400';
  /**
   * Preview: ![amber A700](https://material-ui.com/static/colors-preview/amber-A700-24x24.svg)
   */
  A700: '#ffab00';
};

/* tslint:disable max-line-length */
/**
 * ![blue 50](https://material-ui.com/static/colors-preview/blue-50-24x24.svg) ![blue 100](https://material-ui.com/static/colors-preview/blue-100-24x24.svg) ![blue 200](https://material-ui.com/static/colors-preview/blue-200-24x24.svg) ![blue 300](https://material-ui.com/static/colors-preview/blue-300-24x24.svg) ![blue 400](https://material-ui.com/static/colors-preview/blue-400-24x24.svg) ![blue 500](https://material-ui.com/static/colors-preview/blue-500-24x24.svg) ![blue 600](https://material-ui.com/static/colors-preview/blue-600-24x24.svg) ![blue 700](https://material-ui.com/static/colors-preview/blue-700-24x24.svg) ![blue 800](https://material-ui.com/static/colors-preview/blue-800-24x24.svg) ![blue 900](https://material-ui.com/static/colors-preview/blue-900-24x24.svg) ![blue A100](https://material-ui.com/static/colors-preview/blue-A100-24x24.svg) ![blue A200](https://material-ui.com/static/colors-preview/blue-A200-24x24.svg) ![blue A400](https://material-ui.com/static/colors-preview/blue-A400-24x24.svg) ![blue A700](https://material-ui.com/static/colors-preview/blue-A700-24x24.svg)
 */
declare const blue: {
  /**
   * Preview: ![blue 50](https://material-ui.com/static/colors-preview/blue-50-24x24.svg)
   */
  50: '#e3f2fd';
  /**
   * Preview: ![blue 100](https://material-ui.com/static/colors-preview/blue-100-24x24.svg)
   */
  100: '#bbdefb';
  /**
   * Preview: ![blue 200](https://material-ui.com/static/colors-preview/blue-200-24x24.svg)
   */
  200: '#90caf9';
  /**
   * Preview: ![blue 300](https://material-ui.com/static/colors-preview/blue-300-24x24.svg)
   */
  300: '#64b5f6';
  /**
   * Preview: ![blue 400](https://material-ui.com/static/colors-preview/blue-400-24x24.svg)
   */
  400: '#42a5f5';
  /**
   * Preview: ![blue 500](https://material-ui.com/static/colors-preview/blue-500-24x24.svg)
   */
  500: '#2196f3';
  /**
   * Preview: ![blue 600](https://material-ui.com/static/colors-preview/blue-600-24x24.svg)
   */
  600: '#1e88e5';
  /**
   * Preview: ![blue 700](https://material-ui.com/static/colors-preview/blue-700-24x24.svg)
   */
  700: '#1976d2';
  /**
   * Preview: ![blue 800](https://material-ui.com/static/colors-preview/blue-800-24x24.svg)
   */
  800: '#1565c0';
  /**
   * Preview: ![blue 900](https://material-ui.com/static/colors-preview/blue-900-24x24.svg)
   */
  900: '#0d47a1';
  /**
   * Preview: ![blue A100](https://material-ui.com/static/colors-preview/blue-A100-24x24.svg)
   */
  A100: '#82b1ff';
  /**
   * Preview: ![blue A200](https://material-ui.com/static/colors-preview/blue-A200-24x24.svg)
   */
  A200: '#448aff';
  /**
   * Preview: ![blue A400](https://material-ui.com/static/colors-preview/blue-A400-24x24.svg)
   */
  A400: '#2979ff';
  /**
   * Preview: ![blue A700](https://material-ui.com/static/colors-preview/blue-A700-24x24.svg)
   */
  A700: '#2962ff';
};

/* tslint:disable max-line-length */
/**
 * ![blueGrey 50](https://material-ui.com/static/colors-preview/blueGrey-50-24x24.svg) ![blueGrey 100](https://material-ui.com/static/colors-preview/blueGrey-100-24x24.svg) ![blueGrey 200](https://material-ui.com/static/colors-preview/blueGrey-200-24x24.svg) ![blueGrey 300](https://material-ui.com/static/colors-preview/blueGrey-300-24x24.svg) ![blueGrey 400](https://material-ui.com/static/colors-preview/blueGrey-400-24x24.svg) ![blueGrey 500](https://material-ui.com/static/colors-preview/blueGrey-500-24x24.svg) ![blueGrey 600](https://material-ui.com/static/colors-preview/blueGrey-600-24x24.svg) ![blueGrey 700](https://material-ui.com/static/colors-preview/blueGrey-700-24x24.svg) ![blueGrey 800](https://material-ui.com/static/colors-preview/blueGrey-800-24x24.svg) ![blueGrey 900](https://material-ui.com/static/colors-preview/blueGrey-900-24x24.svg) ![blueGrey A100](https://material-ui.com/static/colors-preview/blueGrey-A100-24x24.svg) ![blueGrey A200](https://material-ui.com/static/colors-preview/blueGrey-A200-24x24.svg) ![blueGrey A400](https://material-ui.com/static/colors-preview/blueGrey-A400-24x24.svg) ![blueGrey A700](https://material-ui.com/static/colors-preview/blueGrey-A700-24x24.svg)
 */
declare const blueGrey: {
  /**
   * Preview: ![blueGrey 50](https://material-ui.com/static/colors-preview/blueGrey-50-24x24.svg)
   */
  50: '#eceff1';
  /**
   * Preview: ![blueGrey 100](https://material-ui.com/static/colors-preview/blueGrey-100-24x24.svg)
   */
  100: '#cfd8dc';
  /**
   * Preview: ![blueGrey 200](https://material-ui.com/static/colors-preview/blueGrey-200-24x24.svg)
   */
  200: '#b0bec5';
  /**
   * Preview: ![blueGrey 300](https://material-ui.com/static/colors-preview/blueGrey-300-24x24.svg)
   */
  300: '#90a4ae';
  /**
   * Preview: ![blueGrey 400](https://material-ui.com/static/colors-preview/blueGrey-400-24x24.svg)
   */
  400: '#78909c';
  /**
   * Preview: ![blueGrey 500](https://material-ui.com/static/colors-preview/blueGrey-500-24x24.svg)
   */
  500: '#607d8b';
  /**
   * Preview: ![blueGrey 600](https://material-ui.com/static/colors-preview/blueGrey-600-24x24.svg)
   */
  600: '#546e7a';
  /**
   * Preview: ![blueGrey 700](https://material-ui.com/static/colors-preview/blueGrey-700-24x24.svg)
   */
  700: '#455a64';
  /**
   * Preview: ![blueGrey 800](https://material-ui.com/static/colors-preview/blueGrey-800-24x24.svg)
   */
  800: '#37474f';
  /**
   * Preview: ![blueGrey 900](https://material-ui.com/static/colors-preview/blueGrey-900-24x24.svg)
   */
  900: '#263238';
  /**
   * Preview: ![blueGrey A100](https://material-ui.com/static/colors-preview/blueGrey-A100-24x24.svg)
   */
  A100: '#cfd8dc';
  /**
   * Preview: ![blueGrey A200](https://material-ui.com/static/colors-preview/blueGrey-A200-24x24.svg)
   */
  A200: '#b0bec5';
  /**
   * Preview: ![blueGrey A400](https://material-ui.com/static/colors-preview/blueGrey-A400-24x24.svg)
   */
  A400: '#78909c';
  /**
   * Preview: ![blueGrey A700](https://material-ui.com/static/colors-preview/blueGrey-A700-24x24.svg)
   */
  A700: '#455a64';
};

/* tslint:disable max-line-length */
/**
 * ![brown 50](https://material-ui.com/static/colors-preview/brown-50-24x24.svg) ![brown 100](https://material-ui.com/static/colors-preview/brown-100-24x24.svg) ![brown 200](https://material-ui.com/static/colors-preview/brown-200-24x24.svg) ![brown 300](https://material-ui.com/static/colors-preview/brown-300-24x24.svg) ![brown 400](https://material-ui.com/static/colors-preview/brown-400-24x24.svg) ![brown 500](https://material-ui.com/static/colors-preview/brown-500-24x24.svg) ![brown 600](https://material-ui.com/static/colors-preview/brown-600-24x24.svg) ![brown 700](https://material-ui.com/static/colors-preview/brown-700-24x24.svg) ![brown 800](https://material-ui.com/static/colors-preview/brown-800-24x24.svg) ![brown 900](https://material-ui.com/static/colors-preview/brown-900-24x24.svg) ![brown A100](https://material-ui.com/static/colors-preview/brown-A100-24x24.svg) ![brown A200](https://material-ui.com/static/colors-preview/brown-A200-24x24.svg) ![brown A400](https://material-ui.com/static/colors-preview/brown-A400-24x24.svg) ![brown A700](https://material-ui.com/static/colors-preview/brown-A700-24x24.svg)
 */
declare const brown: {
  /**
   * Preview: ![brown 50](https://material-ui.com/static/colors-preview/brown-50-24x24.svg)
   */
  50: '#efebe9';
  /**
   * Preview: ![brown 100](https://material-ui.com/static/colors-preview/brown-100-24x24.svg)
   */
  100: '#d7ccc8';
  /**
   * Preview: ![brown 200](https://material-ui.com/static/colors-preview/brown-200-24x24.svg)
   */
  200: '#bcaaa4';
  /**
   * Preview: ![brown 300](https://material-ui.com/static/colors-preview/brown-300-24x24.svg)
   */
  300: '#a1887f';
  /**
   * Preview: ![brown 400](https://material-ui.com/static/colors-preview/brown-400-24x24.svg)
   */
  400: '#8d6e63';
  /**
   * Preview: ![brown 500](https://material-ui.com/static/colors-preview/brown-500-24x24.svg)
   */
  500: '#795548';
  /**
   * Preview: ![brown 600](https://material-ui.com/static/colors-preview/brown-600-24x24.svg)
   */
  600: '#6d4c41';
  /**
   * Preview: ![brown 700](https://material-ui.com/static/colors-preview/brown-700-24x24.svg)
   */
  700: '#5d4037';
  /**
   * Preview: ![brown 800](https://material-ui.com/static/colors-preview/brown-800-24x24.svg)
   */
  800: '#4e342e';
  /**
   * Preview: ![brown 900](https://material-ui.com/static/colors-preview/brown-900-24x24.svg)
   */
  900: '#3e2723';
  /**
   * Preview: ![brown A100](https://material-ui.com/static/colors-preview/brown-A100-24x24.svg)
   */
  A100: '#d7ccc8';
  /**
   * Preview: ![brown A200](https://material-ui.com/static/colors-preview/brown-A200-24x24.svg)
   */
  A200: '#bcaaa4';
  /**
   * Preview: ![brown A400](https://material-ui.com/static/colors-preview/brown-A400-24x24.svg)
   */
  A400: '#8d6e63';
  /**
   * Preview: ![brown A700](https://material-ui.com/static/colors-preview/brown-A700-24x24.svg)
   */
  A700: '#5d4037';
};

/* tslint:disable max-line-length */
/**
 * ![common black](https://material-ui.com/static/colors-preview/common-black-24x24.svg) ![common white](https://material-ui.com/static/colors-preview/common-white-24x24.svg)
 */
declare const common: {
  /**
   * Preview: ![common black](https://material-ui.com/static/colors-preview/common-black-24x24.svg)
   */
  black: '#000';
  /**
   * Preview: ![common white](https://material-ui.com/static/colors-preview/common-white-24x24.svg)
   */
  white: '#fff';
};

/* tslint:disable max-line-length */
/**
 * ![cyan 50](https://material-ui.com/static/colors-preview/cyan-50-24x24.svg) ![cyan 100](https://material-ui.com/static/colors-preview/cyan-100-24x24.svg) ![cyan 200](https://material-ui.com/static/colors-preview/cyan-200-24x24.svg) ![cyan 300](https://material-ui.com/static/colors-preview/cyan-300-24x24.svg) ![cyan 400](https://material-ui.com/static/colors-preview/cyan-400-24x24.svg) ![cyan 500](https://material-ui.com/static/colors-preview/cyan-500-24x24.svg) ![cyan 600](https://material-ui.com/static/colors-preview/cyan-600-24x24.svg) ![cyan 700](https://material-ui.com/static/colors-preview/cyan-700-24x24.svg) ![cyan 800](https://material-ui.com/static/colors-preview/cyan-800-24x24.svg) ![cyan 900](https://material-ui.com/static/colors-preview/cyan-900-24x24.svg) ![cyan A100](https://material-ui.com/static/colors-preview/cyan-A100-24x24.svg) ![cyan A200](https://material-ui.com/static/colors-preview/cyan-A200-24x24.svg) ![cyan A400](https://material-ui.com/static/colors-preview/cyan-A400-24x24.svg) ![cyan A700](https://material-ui.com/static/colors-preview/cyan-A700-24x24.svg)
 */
declare const cyan: {
  /**
   * Preview: ![cyan 50](https://material-ui.com/static/colors-preview/cyan-50-24x24.svg)
   */
  50: '#e0f7fa';
  /**
   * Preview: ![cyan 100](https://material-ui.com/static/colors-preview/cyan-100-24x24.svg)
   */
  100: '#b2ebf2';
  /**
   * Preview: ![cyan 200](https://material-ui.com/static/colors-preview/cyan-200-24x24.svg)
   */
  200: '#80deea';
  /**
   * Preview: ![cyan 300](https://material-ui.com/static/colors-preview/cyan-300-24x24.svg)
   */
  300: '#4dd0e1';
  /**
   * Preview: ![cyan 400](https://material-ui.com/static/colors-preview/cyan-400-24x24.svg)
   */
  400: '#26c6da';
  /**
   * Preview: ![cyan 500](https://material-ui.com/static/colors-preview/cyan-500-24x24.svg)
   */
  500: '#00bcd4';
  /**
   * Preview: ![cyan 600](https://material-ui.com/static/colors-preview/cyan-600-24x24.svg)
   */
  600: '#00acc1';
  /**
   * Preview: ![cyan 700](https://material-ui.com/static/colors-preview/cyan-700-24x24.svg)
   */
  700: '#0097a7';
  /**
   * Preview: ![cyan 800](https://material-ui.com/static/colors-preview/cyan-800-24x24.svg)
   */
  800: '#00838f';
  /**
   * Preview: ![cyan 900](https://material-ui.com/static/colors-preview/cyan-900-24x24.svg)
   */
  900: '#006064';
  /**
   * Preview: ![cyan A100](https://material-ui.com/static/colors-preview/cyan-A100-24x24.svg)
   */
  A100: '#84ffff';
  /**
   * Preview: ![cyan A200](https://material-ui.com/static/colors-preview/cyan-A200-24x24.svg)
   */
  A200: '#18ffff';
  /**
   * Preview: ![cyan A400](https://material-ui.com/static/colors-preview/cyan-A400-24x24.svg)
   */
  A400: '#00e5ff';
  /**
   * Preview: ![cyan A700](https://material-ui.com/static/colors-preview/cyan-A700-24x24.svg)
   */
  A700: '#00b8d4';
};

/* tslint:disable max-line-length */
/**
 * ![deepOrange 50](https://material-ui.com/static/colors-preview/deepOrange-50-24x24.svg) ![deepOrange 100](https://material-ui.com/static/colors-preview/deepOrange-100-24x24.svg) ![deepOrange 200](https://material-ui.com/static/colors-preview/deepOrange-200-24x24.svg) ![deepOrange 300](https://material-ui.com/static/colors-preview/deepOrange-300-24x24.svg) ![deepOrange 400](https://material-ui.com/static/colors-preview/deepOrange-400-24x24.svg) ![deepOrange 500](https://material-ui.com/static/colors-preview/deepOrange-500-24x24.svg) ![deepOrange 600](https://material-ui.com/static/colors-preview/deepOrange-600-24x24.svg) ![deepOrange 700](https://material-ui.com/static/colors-preview/deepOrange-700-24x24.svg) ![deepOrange 800](https://material-ui.com/static/colors-preview/deepOrange-800-24x24.svg) ![deepOrange 900](https://material-ui.com/static/colors-preview/deepOrange-900-24x24.svg) ![deepOrange A100](https://material-ui.com/static/colors-preview/deepOrange-A100-24x24.svg) ![deepOrange A200](https://material-ui.com/static/colors-preview/deepOrange-A200-24x24.svg) ![deepOrange A400](https://material-ui.com/static/colors-preview/deepOrange-A400-24x24.svg) ![deepOrange A700](https://material-ui.com/static/colors-preview/deepOrange-A700-24x24.svg)
 */
declare const deepOrange: {
  /**
   * Preview: ![deepOrange 50](https://material-ui.com/static/colors-preview/deepOrange-50-24x24.svg)
   */
  50: '#fbe9e7';
  /**
   * Preview: ![deepOrange 100](https://material-ui.com/static/colors-preview/deepOrange-100-24x24.svg)
   */
  100: '#ffccbc';
  /**
   * Preview: ![deepOrange 200](https://material-ui.com/static/colors-preview/deepOrange-200-24x24.svg)
   */
  200: '#ffab91';
  /**
   * Preview: ![deepOrange 300](https://material-ui.com/static/colors-preview/deepOrange-300-24x24.svg)
   */
  300: '#ff8a65';
  /**
   * Preview: ![deepOrange 400](https://material-ui.com/static/colors-preview/deepOrange-400-24x24.svg)
   */
  400: '#ff7043';
  /**
   * Preview: ![deepOrange 500](https://material-ui.com/static/colors-preview/deepOrange-500-24x24.svg)
   */
  500: '#ff5722';
  /**
   * Preview: ![deepOrange 600](https://material-ui.com/static/colors-preview/deepOrange-600-24x24.svg)
   */
  600: '#f4511e';
  /**
   * Preview: ![deepOrange 700](https://material-ui.com/static/colors-preview/deepOrange-700-24x24.svg)
   */
  700: '#e64a19';
  /**
   * Preview: ![deepOrange 800](https://material-ui.com/static/colors-preview/deepOrange-800-24x24.svg)
   */
  800: '#d84315';
  /**
   * Preview: ![deepOrange 900](https://material-ui.com/static/colors-preview/deepOrange-900-24x24.svg)
   */
  900: '#bf360c';
  /**
   * Preview: ![deepOrange A100](https://material-ui.com/static/colors-preview/deepOrange-A100-24x24.svg)
   */
  A100: '#ff9e80';
  /**
   * Preview: ![deepOrange A200](https://material-ui.com/static/colors-preview/deepOrange-A200-24x24.svg)
   */
  A200: '#ff6e40';
  /**
   * Preview: ![deepOrange A400](https://material-ui.com/static/colors-preview/deepOrange-A400-24x24.svg)
   */
  A400: '#ff3d00';
  /**
   * Preview: ![deepOrange A700](https://material-ui.com/static/colors-preview/deepOrange-A700-24x24.svg)
   */
  A700: '#dd2c00';
};

/* tslint:disable max-line-length */
/**
 * ![deepPurple 50](https://material-ui.com/static/colors-preview/deepPurple-50-24x24.svg) ![deepPurple 100](https://material-ui.com/static/colors-preview/deepPurple-100-24x24.svg) ![deepPurple 200](https://material-ui.com/static/colors-preview/deepPurple-200-24x24.svg) ![deepPurple 300](https://material-ui.com/static/colors-preview/deepPurple-300-24x24.svg) ![deepPurple 400](https://material-ui.com/static/colors-preview/deepPurple-400-24x24.svg) ![deepPurple 500](https://material-ui.com/static/colors-preview/deepPurple-500-24x24.svg) ![deepPurple 600](https://material-ui.com/static/colors-preview/deepPurple-600-24x24.svg) ![deepPurple 700](https://material-ui.com/static/colors-preview/deepPurple-700-24x24.svg) ![deepPurple 800](https://material-ui.com/static/colors-preview/deepPurple-800-24x24.svg) ![deepPurple 900](https://material-ui.com/static/colors-preview/deepPurple-900-24x24.svg) ![deepPurple A100](https://material-ui.com/static/colors-preview/deepPurple-A100-24x24.svg) ![deepPurple A200](https://material-ui.com/static/colors-preview/deepPurple-A200-24x24.svg) ![deepPurple A400](https://material-ui.com/static/colors-preview/deepPurple-A400-24x24.svg) ![deepPurple A700](https://material-ui.com/static/colors-preview/deepPurple-A700-24x24.svg)
 */
declare const deepPurple: {
  /**
   * Preview: ![deepPurple 50](https://material-ui.com/static/colors-preview/deepPurple-50-24x24.svg)
   */
  50: '#ede7f6';
  /**
   * Preview: ![deepPurple 100](https://material-ui.com/static/colors-preview/deepPurple-100-24x24.svg)
   */
  100: '#d1c4e9';
  /**
   * Preview: ![deepPurple 200](https://material-ui.com/static/colors-preview/deepPurple-200-24x24.svg)
   */
  200: '#b39ddb';
  /**
   * Preview: ![deepPurple 300](https://material-ui.com/static/colors-preview/deepPurple-300-24x24.svg)
   */
  300: '#9575cd';
  /**
   * Preview: ![deepPurple 400](https://material-ui.com/static/colors-preview/deepPurple-400-24x24.svg)
   */
  400: '#7e57c2';
  /**
   * Preview: ![deepPurple 500](https://material-ui.com/static/colors-preview/deepPurple-500-24x24.svg)
   */
  500: '#673ab7';
  /**
   * Preview: ![deepPurple 600](https://material-ui.com/static/colors-preview/deepPurple-600-24x24.svg)
   */
  600: '#5e35b1';
  /**
   * Preview: ![deepPurple 700](https://material-ui.com/static/colors-preview/deepPurple-700-24x24.svg)
   */
  700: '#512da8';
  /**
   * Preview: ![deepPurple 800](https://material-ui.com/static/colors-preview/deepPurple-800-24x24.svg)
   */
  800: '#4527a0';
  /**
   * Preview: ![deepPurple 900](https://material-ui.com/static/colors-preview/deepPurple-900-24x24.svg)
   */
  900: '#311b92';
  /**
   * Preview: ![deepPurple A100](https://material-ui.com/static/colors-preview/deepPurple-A100-24x24.svg)
   */
  A100: '#b388ff';
  /**
   * Preview: ![deepPurple A200](https://material-ui.com/static/colors-preview/deepPurple-A200-24x24.svg)
   */
  A200: '#7c4dff';
  /**
   * Preview: ![deepPurple A400](https://material-ui.com/static/colors-preview/deepPurple-A400-24x24.svg)
   */
  A400: '#651fff';
  /**
   * Preview: ![deepPurple A700](https://material-ui.com/static/colors-preview/deepPurple-A700-24x24.svg)
   */
  A700: '#6200ea';
};

/* tslint:disable max-line-length */
/**
 * ![green 50](https://material-ui.com/static/colors-preview/green-50-24x24.svg) ![green 100](https://material-ui.com/static/colors-preview/green-100-24x24.svg) ![green 200](https://material-ui.com/static/colors-preview/green-200-24x24.svg) ![green 300](https://material-ui.com/static/colors-preview/green-300-24x24.svg) ![green 400](https://material-ui.com/static/colors-preview/green-400-24x24.svg) ![green 500](https://material-ui.com/static/colors-preview/green-500-24x24.svg) ![green 600](https://material-ui.com/static/colors-preview/green-600-24x24.svg) ![green 700](https://material-ui.com/static/colors-preview/green-700-24x24.svg) ![green 800](https://material-ui.com/static/colors-preview/green-800-24x24.svg) ![green 900](https://material-ui.com/static/colors-preview/green-900-24x24.svg) ![green A100](https://material-ui.com/static/colors-preview/green-A100-24x24.svg) ![green A200](https://material-ui.com/static/colors-preview/green-A200-24x24.svg) ![green A400](https://material-ui.com/static/colors-preview/green-A400-24x24.svg) ![green A700](https://material-ui.com/static/colors-preview/green-A700-24x24.svg)
 */
declare const green: {
  /**
   * Preview: ![green 50](https://material-ui.com/static/colors-preview/green-50-24x24.svg)
   */
  50: '#e8f5e9';
  /**
   * Preview: ![green 100](https://material-ui.com/static/colors-preview/green-100-24x24.svg)
   */
  100: '#c8e6c9';
  /**
   * Preview: ![green 200](https://material-ui.com/static/colors-preview/green-200-24x24.svg)
   */
  200: '#a5d6a7';
  /**
   * Preview: ![green 300](https://material-ui.com/static/colors-preview/green-300-24x24.svg)
   */
  300: '#81c784';
  /**
   * Preview: ![green 400](https://material-ui.com/static/colors-preview/green-400-24x24.svg)
   */
  400: '#66bb6a';
  /**
   * Preview: ![green 500](https://material-ui.com/static/colors-preview/green-500-24x24.svg)
   */
  500: '#4caf50';
  /**
   * Preview: ![green 600](https://material-ui.com/static/colors-preview/green-600-24x24.svg)
   */
  600: '#43a047';
  /**
   * Preview: ![green 700](https://material-ui.com/static/colors-preview/green-700-24x24.svg)
   */
  700: '#388e3c';
  /**
   * Preview: ![green 800](https://material-ui.com/static/colors-preview/green-800-24x24.svg)
   */
  800: '#2e7d32';
  /**
   * Preview: ![green 900](https://material-ui.com/static/colors-preview/green-900-24x24.svg)
   */
  900: '#1b5e20';
  /**
   * Preview: ![green A100](https://material-ui.com/static/colors-preview/green-A100-24x24.svg)
   */
  A100: '#b9f6ca';
  /**
   * Preview: ![green A200](https://material-ui.com/static/colors-preview/green-A200-24x24.svg)
   */
  A200: '#69f0ae';
  /**
   * Preview: ![green A400](https://material-ui.com/static/colors-preview/green-A400-24x24.svg)
   */
  A400: '#00e676';
  /**
   * Preview: ![green A700](https://material-ui.com/static/colors-preview/green-A700-24x24.svg)
   */
  A700: '#00c853';
};

/* tslint:disable max-line-length */
/**
 * ![grey 50](https://material-ui.com/static/colors-preview/grey-50-24x24.svg) ![grey 100](https://material-ui.com/static/colors-preview/grey-100-24x24.svg) ![grey 200](https://material-ui.com/static/colors-preview/grey-200-24x24.svg) ![grey 300](https://material-ui.com/static/colors-preview/grey-300-24x24.svg) ![grey 400](https://material-ui.com/static/colors-preview/grey-400-24x24.svg) ![grey 500](https://material-ui.com/static/colors-preview/grey-500-24x24.svg) ![grey 600](https://material-ui.com/static/colors-preview/grey-600-24x24.svg) ![grey 700](https://material-ui.com/static/colors-preview/grey-700-24x24.svg) ![grey 800](https://material-ui.com/static/colors-preview/grey-800-24x24.svg) ![grey 900](https://material-ui.com/static/colors-preview/grey-900-24x24.svg) ![grey A100](https://material-ui.com/static/colors-preview/grey-A100-24x24.svg) ![grey A200](https://material-ui.com/static/colors-preview/grey-A200-24x24.svg) ![grey A400](https://material-ui.com/static/colors-preview/grey-A400-24x24.svg) ![grey A700](https://material-ui.com/static/colors-preview/grey-A700-24x24.svg)
 */
declare const grey: {
  /**
   * Preview: ![grey 50](https://material-ui.com/static/colors-preview/grey-50-24x24.svg)
   */
  50: '#fafafa';
  /**
   * Preview: ![grey 100](https://material-ui.com/static/colors-preview/grey-100-24x24.svg)
   */
  100: '#f5f5f5';
  /**
   * Preview: ![grey 200](https://material-ui.com/static/colors-preview/grey-200-24x24.svg)
   */
  200: '#eeeeee';
  /**
   * Preview: ![grey 300](https://material-ui.com/static/colors-preview/grey-300-24x24.svg)
   */
  300: '#e0e0e0';
  /**
   * Preview: ![grey 400](https://material-ui.com/static/colors-preview/grey-400-24x24.svg)
   */
  400: '#bdbdbd';
  /**
   * Preview: ![grey 500](https://material-ui.com/static/colors-preview/grey-500-24x24.svg)
   */
  500: '#9e9e9e';
  /**
   * Preview: ![grey 600](https://material-ui.com/static/colors-preview/grey-600-24x24.svg)
   */
  600: '#757575';
  /**
   * Preview: ![grey 700](https://material-ui.com/static/colors-preview/grey-700-24x24.svg)
   */
  700: '#616161';
  /**
   * Preview: ![grey 800](https://material-ui.com/static/colors-preview/grey-800-24x24.svg)
   */
  800: '#424242';
  /**
   * Preview: ![grey 900](https://material-ui.com/static/colors-preview/grey-900-24x24.svg)
   */
  900: '#212121';
  /**
   * Preview: ![grey A100](https://material-ui.com/static/colors-preview/grey-A100-24x24.svg)
   */
  A100: '#d5d5d5';
  /**
   * Preview: ![grey A200](https://material-ui.com/static/colors-preview/grey-A200-24x24.svg)
   */
  A200: '#aaaaaa';
  /**
   * Preview: ![grey A400](https://material-ui.com/static/colors-preview/grey-A400-24x24.svg)
   */
  A400: '#303030';
  /**
   * Preview: ![grey A700](https://material-ui.com/static/colors-preview/grey-A700-24x24.svg)
   */
  A700: '#616161';
};

/* tslint:disable max-line-length */
/**
 * ![indigo 50](https://material-ui.com/static/colors-preview/indigo-50-24x24.svg) ![indigo 100](https://material-ui.com/static/colors-preview/indigo-100-24x24.svg) ![indigo 200](https://material-ui.com/static/colors-preview/indigo-200-24x24.svg) ![indigo 300](https://material-ui.com/static/colors-preview/indigo-300-24x24.svg) ![indigo 400](https://material-ui.com/static/colors-preview/indigo-400-24x24.svg) ![indigo 500](https://material-ui.com/static/colors-preview/indigo-500-24x24.svg) ![indigo 600](https://material-ui.com/static/colors-preview/indigo-600-24x24.svg) ![indigo 700](https://material-ui.com/static/colors-preview/indigo-700-24x24.svg) ![indigo 800](https://material-ui.com/static/colors-preview/indigo-800-24x24.svg) ![indigo 900](https://material-ui.com/static/colors-preview/indigo-900-24x24.svg) ![indigo A100](https://material-ui.com/static/colors-preview/indigo-A100-24x24.svg) ![indigo A200](https://material-ui.com/static/colors-preview/indigo-A200-24x24.svg) ![indigo A400](https://material-ui.com/static/colors-preview/indigo-A400-24x24.svg) ![indigo A700](https://material-ui.com/static/colors-preview/indigo-A700-24x24.svg)
 */
declare const indigo: {
  /**
   * Preview: ![indigo 50](https://material-ui.com/static/colors-preview/indigo-50-24x24.svg)
   */
  50: '#e8eaf6';
  /**
   * Preview: ![indigo 100](https://material-ui.com/static/colors-preview/indigo-100-24x24.svg)
   */
  100: '#c5cae9';
  /**
   * Preview: ![indigo 200](https://material-ui.com/static/colors-preview/indigo-200-24x24.svg)
   */
  200: '#9fa8da';
  /**
   * Preview: ![indigo 300](https://material-ui.com/static/colors-preview/indigo-300-24x24.svg)
   */
  300: '#7986cb';
  /**
   * Preview: ![indigo 400](https://material-ui.com/static/colors-preview/indigo-400-24x24.svg)
   */
  400: '#5c6bc0';
  /**
   * Preview: ![indigo 500](https://material-ui.com/static/colors-preview/indigo-500-24x24.svg)
   */
  500: '#3f51b5';
  /**
   * Preview: ![indigo 600](https://material-ui.com/static/colors-preview/indigo-600-24x24.svg)
   */
  600: '#3949ab';
  /**
   * Preview: ![indigo 700](https://material-ui.com/static/colors-preview/indigo-700-24x24.svg)
   */
  700: '#303f9f';
  /**
   * Preview: ![indigo 800](https://material-ui.com/static/colors-preview/indigo-800-24x24.svg)
   */
  800: '#283593';
  /**
   * Preview: ![indigo 900](https://material-ui.com/static/colors-preview/indigo-900-24x24.svg)
   */
  900: '#1a237e';
  /**
   * Preview: ![indigo A100](https://material-ui.com/static/colors-preview/indigo-A100-24x24.svg)
   */
  A100: '#8c9eff';
  /**
   * Preview: ![indigo A200](https://material-ui.com/static/colors-preview/indigo-A200-24x24.svg)
   */
  A200: '#536dfe';
  /**
   * Preview: ![indigo A400](https://material-ui.com/static/colors-preview/indigo-A400-24x24.svg)
   */
  A400: '#3d5afe';
  /**
   * Preview: ![indigo A700](https://material-ui.com/static/colors-preview/indigo-A700-24x24.svg)
   */
  A700: '#304ffe';
};

/* tslint:disable max-line-length */
/**
 * ![lightBlue 50](https://material-ui.com/static/colors-preview/lightBlue-50-24x24.svg) ![lightBlue 100](https://material-ui.com/static/colors-preview/lightBlue-100-24x24.svg) ![lightBlue 200](https://material-ui.com/static/colors-preview/lightBlue-200-24x24.svg) ![lightBlue 300](https://material-ui.com/static/colors-preview/lightBlue-300-24x24.svg) ![lightBlue 400](https://material-ui.com/static/colors-preview/lightBlue-400-24x24.svg) ![lightBlue 500](https://material-ui.com/static/colors-preview/lightBlue-500-24x24.svg) ![lightBlue 600](https://material-ui.com/static/colors-preview/lightBlue-600-24x24.svg) ![lightBlue 700](https://material-ui.com/static/colors-preview/lightBlue-700-24x24.svg) ![lightBlue 800](https://material-ui.com/static/colors-preview/lightBlue-800-24x24.svg) ![lightBlue 900](https://material-ui.com/static/colors-preview/lightBlue-900-24x24.svg) ![lightBlue A100](https://material-ui.com/static/colors-preview/lightBlue-A100-24x24.svg) ![lightBlue A200](https://material-ui.com/static/colors-preview/lightBlue-A200-24x24.svg) ![lightBlue A400](https://material-ui.com/static/colors-preview/lightBlue-A400-24x24.svg) ![lightBlue A700](https://material-ui.com/static/colors-preview/lightBlue-A700-24x24.svg)
 */
declare const lightBlue: {
  /**
   * Preview: ![lightBlue 50](https://material-ui.com/static/colors-preview/lightBlue-50-24x24.svg)
   */
  50: '#e1f5fe';
  /**
   * Preview: ![lightBlue 100](https://material-ui.com/static/colors-preview/lightBlue-100-24x24.svg)
   */
  100: '#b3e5fc';
  /**
   * Preview: ![lightBlue 200](https://material-ui.com/static/colors-preview/lightBlue-200-24x24.svg)
   */
  200: '#81d4fa';
  /**
   * Preview: ![lightBlue 300](https://material-ui.com/static/colors-preview/lightBlue-300-24x24.svg)
   */
  300: '#4fc3f7';
  /**
   * Preview: ![lightBlue 400](https://material-ui.com/static/colors-preview/lightBlue-400-24x24.svg)
   */
  400: '#29b6f6';
  /**
   * Preview: ![lightBlue 500](https://material-ui.com/static/colors-preview/lightBlue-500-24x24.svg)
   */
  500: '#03a9f4';
  /**
   * Preview: ![lightBlue 600](https://material-ui.com/static/colors-preview/lightBlue-600-24x24.svg)
   */
  600: '#039be5';
  /**
   * Preview: ![lightBlue 700](https://material-ui.com/static/colors-preview/lightBlue-700-24x24.svg)
   */
  700: '#0288d1';
  /**
   * Preview: ![lightBlue 800](https://material-ui.com/static/colors-preview/lightBlue-800-24x24.svg)
   */
  800: '#0277bd';
  /**
   * Preview: ![lightBlue 900](https://material-ui.com/static/colors-preview/lightBlue-900-24x24.svg)
   */
  900: '#01579b';
  /**
   * Preview: ![lightBlue A100](https://material-ui.com/static/colors-preview/lightBlue-A100-24x24.svg)
   */
  A100: '#80d8ff';
  /**
   * Preview: ![lightBlue A200](https://material-ui.com/static/colors-preview/lightBlue-A200-24x24.svg)
   */
  A200: '#40c4ff';
  /**
   * Preview: ![lightBlue A400](https://material-ui.com/static/colors-preview/lightBlue-A400-24x24.svg)
   */
  A400: '#00b0ff';
  /**
   * Preview: ![lightBlue A700](https://material-ui.com/static/colors-preview/lightBlue-A700-24x24.svg)
   */
  A700: '#0091ea';
};

/* tslint:disable max-line-length */
/**
 * ![lightGreen 50](https://material-ui.com/static/colors-preview/lightGreen-50-24x24.svg) ![lightGreen 100](https://material-ui.com/static/colors-preview/lightGreen-100-24x24.svg) ![lightGreen 200](https://material-ui.com/static/colors-preview/lightGreen-200-24x24.svg) ![lightGreen 300](https://material-ui.com/static/colors-preview/lightGreen-300-24x24.svg) ![lightGreen 400](https://material-ui.com/static/colors-preview/lightGreen-400-24x24.svg) ![lightGreen 500](https://material-ui.com/static/colors-preview/lightGreen-500-24x24.svg) ![lightGreen 600](https://material-ui.com/static/colors-preview/lightGreen-600-24x24.svg) ![lightGreen 700](https://material-ui.com/static/colors-preview/lightGreen-700-24x24.svg) ![lightGreen 800](https://material-ui.com/static/colors-preview/lightGreen-800-24x24.svg) ![lightGreen 900](https://material-ui.com/static/colors-preview/lightGreen-900-24x24.svg) ![lightGreen A100](https://material-ui.com/static/colors-preview/lightGreen-A100-24x24.svg) ![lightGreen A200](https://material-ui.com/static/colors-preview/lightGreen-A200-24x24.svg) ![lightGreen A400](https://material-ui.com/static/colors-preview/lightGreen-A400-24x24.svg) ![lightGreen A700](https://material-ui.com/static/colors-preview/lightGreen-A700-24x24.svg)
 */
declare const lightGreen: {
  /**
   * Preview: ![lightGreen 50](https://material-ui.com/static/colors-preview/lightGreen-50-24x24.svg)
   */
  50: '#f1f8e9';
  /**
   * Preview: ![lightGreen 100](https://material-ui.com/static/colors-preview/lightGreen-100-24x24.svg)
   */
  100: '#dcedc8';
  /**
   * Preview: ![lightGreen 200](https://material-ui.com/static/colors-preview/lightGreen-200-24x24.svg)
   */
  200: '#c5e1a5';
  /**
   * Preview: ![lightGreen 300](https://material-ui.com/static/colors-preview/lightGreen-300-24x24.svg)
   */
  300: '#aed581';
  /**
   * Preview: ![lightGreen 400](https://material-ui.com/static/colors-preview/lightGreen-400-24x24.svg)
   */
  400: '#9ccc65';
  /**
   * Preview: ![lightGreen 500](https://material-ui.com/static/colors-preview/lightGreen-500-24x24.svg)
   */
  500: '#8bc34a';
  /**
   * Preview: ![lightGreen 600](https://material-ui.com/static/colors-preview/lightGreen-600-24x24.svg)
   */
  600: '#7cb342';
  /**
   * Preview: ![lightGreen 700](https://material-ui.com/static/colors-preview/lightGreen-700-24x24.svg)
   */
  700: '#689f38';
  /**
   * Preview: ![lightGreen 800](https://material-ui.com/static/colors-preview/lightGreen-800-24x24.svg)
   */
  800: '#558b2f';
  /**
   * Preview: ![lightGreen 900](https://material-ui.com/static/colors-preview/lightGreen-900-24x24.svg)
   */
  900: '#33691e';
  /**
   * Preview: ![lightGreen A100](https://material-ui.com/static/colors-preview/lightGreen-A100-24x24.svg)
   */
  A100: '#ccff90';
  /**
   * Preview: ![lightGreen A200](https://material-ui.com/static/colors-preview/lightGreen-A200-24x24.svg)
   */
  A200: '#b2ff59';
  /**
   * Preview: ![lightGreen A400](https://material-ui.com/static/colors-preview/lightGreen-A400-24x24.svg)
   */
  A400: '#76ff03';
  /**
   * Preview: ![lightGreen A700](https://material-ui.com/static/colors-preview/lightGreen-A700-24x24.svg)
   */
  A700: '#64dd17';
};

/* tslint:disable max-line-length */
/**
 * ![lime 50](https://material-ui.com/static/colors-preview/lime-50-24x24.svg) ![lime 100](https://material-ui.com/static/colors-preview/lime-100-24x24.svg) ![lime 200](https://material-ui.com/static/colors-preview/lime-200-24x24.svg) ![lime 300](https://material-ui.com/static/colors-preview/lime-300-24x24.svg) ![lime 400](https://material-ui.com/static/colors-preview/lime-400-24x24.svg) ![lime 500](https://material-ui.com/static/colors-preview/lime-500-24x24.svg) ![lime 600](https://material-ui.com/static/colors-preview/lime-600-24x24.svg) ![lime 700](https://material-ui.com/static/colors-preview/lime-700-24x24.svg) ![lime 800](https://material-ui.com/static/colors-preview/lime-800-24x24.svg) ![lime 900](https://material-ui.com/static/colors-preview/lime-900-24x24.svg) ![lime A100](https://material-ui.com/static/colors-preview/lime-A100-24x24.svg) ![lime A200](https://material-ui.com/static/colors-preview/lime-A200-24x24.svg) ![lime A400](https://material-ui.com/static/colors-preview/lime-A400-24x24.svg) ![lime A700](https://material-ui.com/static/colors-preview/lime-A700-24x24.svg)
 */
declare const lime: {
  /**
   * Preview: ![lime 50](https://material-ui.com/static/colors-preview/lime-50-24x24.svg)
   */
  50: '#f9fbe7';
  /**
   * Preview: ![lime 100](https://material-ui.com/static/colors-preview/lime-100-24x24.svg)
   */
  100: '#f0f4c3';
  /**
   * Preview: ![lime 200](https://material-ui.com/static/colors-preview/lime-200-24x24.svg)
   */
  200: '#e6ee9c';
  /**
   * Preview: ![lime 300](https://material-ui.com/static/colors-preview/lime-300-24x24.svg)
   */
  300: '#dce775';
  /**
   * Preview: ![lime 400](https://material-ui.com/static/colors-preview/lime-400-24x24.svg)
   */
  400: '#d4e157';
  /**
   * Preview: ![lime 500](https://material-ui.com/static/colors-preview/lime-500-24x24.svg)
   */
  500: '#cddc39';
  /**
   * Preview: ![lime 600](https://material-ui.com/static/colors-preview/lime-600-24x24.svg)
   */
  600: '#c0ca33';
  /**
   * Preview: ![lime 700](https://material-ui.com/static/colors-preview/lime-700-24x24.svg)
   */
  700: '#afb42b';
  /**
   * Preview: ![lime 800](https://material-ui.com/static/colors-preview/lime-800-24x24.svg)
   */
  800: '#9e9d24';
  /**
   * Preview: ![lime 900](https://material-ui.com/static/colors-preview/lime-900-24x24.svg)
   */
  900: '#827717';
  /**
   * Preview: ![lime A100](https://material-ui.com/static/colors-preview/lime-A100-24x24.svg)
   */
  A100: '#f4ff81';
  /**
   * Preview: ![lime A200](https://material-ui.com/static/colors-preview/lime-A200-24x24.svg)
   */
  A200: '#eeff41';
  /**
   * Preview: ![lime A400](https://material-ui.com/static/colors-preview/lime-A400-24x24.svg)
   */
  A400: '#c6ff00';
  /**
   * Preview: ![lime A700](https://material-ui.com/static/colors-preview/lime-A700-24x24.svg)
   */
  A700: '#aeea00';
};

/* tslint:disable max-line-length */
/**
 * ![orange 50](https://material-ui.com/static/colors-preview/orange-50-24x24.svg) ![orange 100](https://material-ui.com/static/colors-preview/orange-100-24x24.svg) ![orange 200](https://material-ui.com/static/colors-preview/orange-200-24x24.svg) ![orange 300](https://material-ui.com/static/colors-preview/orange-300-24x24.svg) ![orange 400](https://material-ui.com/static/colors-preview/orange-400-24x24.svg) ![orange 500](https://material-ui.com/static/colors-preview/orange-500-24x24.svg) ![orange 600](https://material-ui.com/static/colors-preview/orange-600-24x24.svg) ![orange 700](https://material-ui.com/static/colors-preview/orange-700-24x24.svg) ![orange 800](https://material-ui.com/static/colors-preview/orange-800-24x24.svg) ![orange 900](https://material-ui.com/static/colors-preview/orange-900-24x24.svg) ![orange A100](https://material-ui.com/static/colors-preview/orange-A100-24x24.svg) ![orange A200](https://material-ui.com/static/colors-preview/orange-A200-24x24.svg) ![orange A400](https://material-ui.com/static/colors-preview/orange-A400-24x24.svg) ![orange A700](https://material-ui.com/static/colors-preview/orange-A700-24x24.svg)
 */
declare const orange: {
  /**
   * Preview: ![orange 50](https://material-ui.com/static/colors-preview/orange-50-24x24.svg)
   */
  50: '#fff3e0';
  /**
   * Preview: ![orange 100](https://material-ui.com/static/colors-preview/orange-100-24x24.svg)
   */
  100: '#ffe0b2';
  /**
   * Preview: ![orange 200](https://material-ui.com/static/colors-preview/orange-200-24x24.svg)
   */
  200: '#ffcc80';
  /**
   * Preview: ![orange 300](https://material-ui.com/static/colors-preview/orange-300-24x24.svg)
   */
  300: '#ffb74d';
  /**
   * Preview: ![orange 400](https://material-ui.com/static/colors-preview/orange-400-24x24.svg)
   */
  400: '#ffa726';
  /**
   * Preview: ![orange 500](https://material-ui.com/static/colors-preview/orange-500-24x24.svg)
   */
  500: '#ff9800';
  /**
   * Preview: ![orange 600](https://material-ui.com/static/colors-preview/orange-600-24x24.svg)
   */
  600: '#fb8c00';
  /**
   * Preview: ![orange 700](https://material-ui.com/static/colors-preview/orange-700-24x24.svg)
   */
  700: '#f57c00';
  /**
   * Preview: ![orange 800](https://material-ui.com/static/colors-preview/orange-800-24x24.svg)
   */
  800: '#ef6c00';
  /**
   * Preview: ![orange 900](https://material-ui.com/static/colors-preview/orange-900-24x24.svg)
   */
  900: '#e65100';
  /**
   * Preview: ![orange A100](https://material-ui.com/static/colors-preview/orange-A100-24x24.svg)
   */
  A100: '#ffd180';
  /**
   * Preview: ![orange A200](https://material-ui.com/static/colors-preview/orange-A200-24x24.svg)
   */
  A200: '#ffab40';
  /**
   * Preview: ![orange A400](https://material-ui.com/static/colors-preview/orange-A400-24x24.svg)
   */
  A400: '#ff9100';
  /**
   * Preview: ![orange A700](https://material-ui.com/static/colors-preview/orange-A700-24x24.svg)
   */
  A700: '#ff6d00';
};

/* tslint:disable max-line-length */
/**
 * ![pink 50](https://material-ui.com/static/colors-preview/pink-50-24x24.svg) ![pink 100](https://material-ui.com/static/colors-preview/pink-100-24x24.svg) ![pink 200](https://material-ui.com/static/colors-preview/pink-200-24x24.svg) ![pink 300](https://material-ui.com/static/colors-preview/pink-300-24x24.svg) ![pink 400](https://material-ui.com/static/colors-preview/pink-400-24x24.svg) ![pink 500](https://material-ui.com/static/colors-preview/pink-500-24x24.svg) ![pink 600](https://material-ui.com/static/colors-preview/pink-600-24x24.svg) ![pink 700](https://material-ui.com/static/colors-preview/pink-700-24x24.svg) ![pink 800](https://material-ui.com/static/colors-preview/pink-800-24x24.svg) ![pink 900](https://material-ui.com/static/colors-preview/pink-900-24x24.svg) ![pink A100](https://material-ui.com/static/colors-preview/pink-A100-24x24.svg) ![pink A200](https://material-ui.com/static/colors-preview/pink-A200-24x24.svg) ![pink A400](https://material-ui.com/static/colors-preview/pink-A400-24x24.svg) ![pink A700](https://material-ui.com/static/colors-preview/pink-A700-24x24.svg)
 */
declare const pink: {
  /**
   * Preview: ![pink 50](https://material-ui.com/static/colors-preview/pink-50-24x24.svg)
   */
  50: '#fce4ec';
  /**
   * Preview: ![pink 100](https://material-ui.com/static/colors-preview/pink-100-24x24.svg)
   */
  100: '#f8bbd0';
  /**
   * Preview: ![pink 200](https://material-ui.com/static/colors-preview/pink-200-24x24.svg)
   */
  200: '#f48fb1';
  /**
   * Preview: ![pink 300](https://material-ui.com/static/colors-preview/pink-300-24x24.svg)
   */
  300: '#f06292';
  /**
   * Preview: ![pink 400](https://material-ui.com/static/colors-preview/pink-400-24x24.svg)
   */
  400: '#ec407a';
  /**
   * Preview: ![pink 500](https://material-ui.com/static/colors-preview/pink-500-24x24.svg)
   */
  500: '#e91e63';
  /**
   * Preview: ![pink 600](https://material-ui.com/static/colors-preview/pink-600-24x24.svg)
   */
  600: '#d81b60';
  /**
   * Preview: ![pink 700](https://material-ui.com/static/colors-preview/pink-700-24x24.svg)
   */
  700: '#c2185b';
  /**
   * Preview: ![pink 800](https://material-ui.com/static/colors-preview/pink-800-24x24.svg)
   */
  800: '#ad1457';
  /**
   * Preview: ![pink 900](https://material-ui.com/static/colors-preview/pink-900-24x24.svg)
   */
  900: '#880e4f';
  /**
   * Preview: ![pink A100](https://material-ui.com/static/colors-preview/pink-A100-24x24.svg)
   */
  A100: '#ff80ab';
  /**
   * Preview: ![pink A200](https://material-ui.com/static/colors-preview/pink-A200-24x24.svg)
   */
  A200: '#ff4081';
  /**
   * Preview: ![pink A400](https://material-ui.com/static/colors-preview/pink-A400-24x24.svg)
   */
  A400: '#f50057';
  /**
   * Preview: ![pink A700](https://material-ui.com/static/colors-preview/pink-A700-24x24.svg)
   */
  A700: '#c51162';
};

/* tslint:disable max-line-length */
/**
 * ![purple 50](https://material-ui.com/static/colors-preview/purple-50-24x24.svg) ![purple 100](https://material-ui.com/static/colors-preview/purple-100-24x24.svg) ![purple 200](https://material-ui.com/static/colors-preview/purple-200-24x24.svg) ![purple 300](https://material-ui.com/static/colors-preview/purple-300-24x24.svg) ![purple 400](https://material-ui.com/static/colors-preview/purple-400-24x24.svg) ![purple 500](https://material-ui.com/static/colors-preview/purple-500-24x24.svg) ![purple 600](https://material-ui.com/static/colors-preview/purple-600-24x24.svg) ![purple 700](https://material-ui.com/static/colors-preview/purple-700-24x24.svg) ![purple 800](https://material-ui.com/static/colors-preview/purple-800-24x24.svg) ![purple 900](https://material-ui.com/static/colors-preview/purple-900-24x24.svg) ![purple A100](https://material-ui.com/static/colors-preview/purple-A100-24x24.svg) ![purple A200](https://material-ui.com/static/colors-preview/purple-A200-24x24.svg) ![purple A400](https://material-ui.com/static/colors-preview/purple-A400-24x24.svg) ![purple A700](https://material-ui.com/static/colors-preview/purple-A700-24x24.svg)
 */
declare const purple: {
  /**
   * Preview: ![purple 50](https://material-ui.com/static/colors-preview/purple-50-24x24.svg)
   */
  50: '#f3e5f5';
  /**
   * Preview: ![purple 100](https://material-ui.com/static/colors-preview/purple-100-24x24.svg)
   */
  100: '#e1bee7';
  /**
   * Preview: ![purple 200](https://material-ui.com/static/colors-preview/purple-200-24x24.svg)
   */
  200: '#ce93d8';
  /**
   * Preview: ![purple 300](https://material-ui.com/static/colors-preview/purple-300-24x24.svg)
   */
  300: '#ba68c8';
  /**
   * Preview: ![purple 400](https://material-ui.com/static/colors-preview/purple-400-24x24.svg)
   */
  400: '#ab47bc';
  /**
   * Preview: ![purple 500](https://material-ui.com/static/colors-preview/purple-500-24x24.svg)
   */
  500: '#9c27b0';
  /**
   * Preview: ![purple 600](https://material-ui.com/static/colors-preview/purple-600-24x24.svg)
   */
  600: '#8e24aa';
  /**
   * Preview: ![purple 700](https://material-ui.com/static/colors-preview/purple-700-24x24.svg)
   */
  700: '#7b1fa2';
  /**
   * Preview: ![purple 800](https://material-ui.com/static/colors-preview/purple-800-24x24.svg)
   */
  800: '#6a1b9a';
  /**
   * Preview: ![purple 900](https://material-ui.com/static/colors-preview/purple-900-24x24.svg)
   */
  900: '#4a148c';
  /**
   * Preview: ![purple A100](https://material-ui.com/static/colors-preview/purple-A100-24x24.svg)
   */
  A100: '#ea80fc';
  /**
   * Preview: ![purple A200](https://material-ui.com/static/colors-preview/purple-A200-24x24.svg)
   */
  A200: '#e040fb';
  /**
   * Preview: ![purple A400](https://material-ui.com/static/colors-preview/purple-A400-24x24.svg)
   */
  A400: '#d500f9';
  /**
   * Preview: ![purple A700](https://material-ui.com/static/colors-preview/purple-A700-24x24.svg)
   */
  A700: '#aa00ff';
};

/* tslint:disable max-line-length */
/**
 * ![red 50](https://material-ui.com/static/colors-preview/red-50-24x24.svg) ![red 100](https://material-ui.com/static/colors-preview/red-100-24x24.svg) ![red 200](https://material-ui.com/static/colors-preview/red-200-24x24.svg) ![red 300](https://material-ui.com/static/colors-preview/red-300-24x24.svg) ![red 400](https://material-ui.com/static/colors-preview/red-400-24x24.svg) ![red 500](https://material-ui.com/static/colors-preview/red-500-24x24.svg) ![red 600](https://material-ui.com/static/colors-preview/red-600-24x24.svg) ![red 700](https://material-ui.com/static/colors-preview/red-700-24x24.svg) ![red 800](https://material-ui.com/static/colors-preview/red-800-24x24.svg) ![red 900](https://material-ui.com/static/colors-preview/red-900-24x24.svg) ![red A100](https://material-ui.com/static/colors-preview/red-A100-24x24.svg) ![red A200](https://material-ui.com/static/colors-preview/red-A200-24x24.svg) ![red A400](https://material-ui.com/static/colors-preview/red-A400-24x24.svg) ![red A700](https://material-ui.com/static/colors-preview/red-A700-24x24.svg)
 */
declare const red: {
  /**
   * Preview: ![red 50](https://material-ui.com/static/colors-preview/red-50-24x24.svg)
   */
  50: '#ffebee';
  /**
   * Preview: ![red 100](https://material-ui.com/static/colors-preview/red-100-24x24.svg)
   */
  100: '#ffcdd2';
  /**
   * Preview: ![red 200](https://material-ui.com/static/colors-preview/red-200-24x24.svg)
   */
  200: '#ef9a9a';
  /**
   * Preview: ![red 300](https://material-ui.com/static/colors-preview/red-300-24x24.svg)
   */
  300: '#e57373';
  /**
   * Preview: ![red 400](https://material-ui.com/static/colors-preview/red-400-24x24.svg)
   */
  400: '#ef5350';
  /**
   * Preview: ![red 500](https://material-ui.com/static/colors-preview/red-500-24x24.svg)
   */
  500: '#f44336';
  /**
   * Preview: ![red 600](https://material-ui.com/static/colors-preview/red-600-24x24.svg)
   */
  600: '#e53935';
  /**
   * Preview: ![red 700](https://material-ui.com/static/colors-preview/red-700-24x24.svg)
   */
  700: '#d32f2f';
  /**
   * Preview: ![red 800](https://material-ui.com/static/colors-preview/red-800-24x24.svg)
   */
  800: '#c62828';
  /**
   * Preview: ![red 900](https://material-ui.com/static/colors-preview/red-900-24x24.svg)
   */
  900: '#b71c1c';
  /**
   * Preview: ![red A100](https://material-ui.com/static/colors-preview/red-A100-24x24.svg)
   */
  A100: '#ff8a80';
  /**
   * Preview: ![red A200](https://material-ui.com/static/colors-preview/red-A200-24x24.svg)
   */
  A200: '#ff5252';
  /**
   * Preview: ![red A400](https://material-ui.com/static/colors-preview/red-A400-24x24.svg)
   */
  A400: '#ff1744';
  /**
   * Preview: ![red A700](https://material-ui.com/static/colors-preview/red-A700-24x24.svg)
   */
  A700: '#d50000';
};

/* tslint:disable max-line-length */
/**
 * ![teal 50](https://material-ui.com/static/colors-preview/teal-50-24x24.svg) ![teal 100](https://material-ui.com/static/colors-preview/teal-100-24x24.svg) ![teal 200](https://material-ui.com/static/colors-preview/teal-200-24x24.svg) ![teal 300](https://material-ui.com/static/colors-preview/teal-300-24x24.svg) ![teal 400](https://material-ui.com/static/colors-preview/teal-400-24x24.svg) ![teal 500](https://material-ui.com/static/colors-preview/teal-500-24x24.svg) ![teal 600](https://material-ui.com/static/colors-preview/teal-600-24x24.svg) ![teal 700](https://material-ui.com/static/colors-preview/teal-700-24x24.svg) ![teal 800](https://material-ui.com/static/colors-preview/teal-800-24x24.svg) ![teal 900](https://material-ui.com/static/colors-preview/teal-900-24x24.svg) ![teal A100](https://material-ui.com/static/colors-preview/teal-A100-24x24.svg) ![teal A200](https://material-ui.com/static/colors-preview/teal-A200-24x24.svg) ![teal A400](https://material-ui.com/static/colors-preview/teal-A400-24x24.svg) ![teal A700](https://material-ui.com/static/colors-preview/teal-A700-24x24.svg)
 */
declare const teal: {
  /**
   * Preview: ![teal 50](https://material-ui.com/static/colors-preview/teal-50-24x24.svg)
   */
  50: '#e0f2f1';
  /**
   * Preview: ![teal 100](https://material-ui.com/static/colors-preview/teal-100-24x24.svg)
   */
  100: '#b2dfdb';
  /**
   * Preview: ![teal 200](https://material-ui.com/static/colors-preview/teal-200-24x24.svg)
   */
  200: '#80cbc4';
  /**
   * Preview: ![teal 300](https://material-ui.com/static/colors-preview/teal-300-24x24.svg)
   */
  300: '#4db6ac';
  /**
   * Preview: ![teal 400](https://material-ui.com/static/colors-preview/teal-400-24x24.svg)
   */
  400: '#26a69a';
  /**
   * Preview: ![teal 500](https://material-ui.com/static/colors-preview/teal-500-24x24.svg)
   */
  500: '#009688';
  /**
   * Preview: ![teal 600](https://material-ui.com/static/colors-preview/teal-600-24x24.svg)
   */
  600: '#00897b';
  /**
   * Preview: ![teal 700](https://material-ui.com/static/colors-preview/teal-700-24x24.svg)
   */
  700: '#00796b';
  /**
   * Preview: ![teal 800](https://material-ui.com/static/colors-preview/teal-800-24x24.svg)
   */
  800: '#00695c';
  /**
   * Preview: ![teal 900](https://material-ui.com/static/colors-preview/teal-900-24x24.svg)
   */
  900: '#004d40';
  /**
   * Preview: ![teal A100](https://material-ui.com/static/colors-preview/teal-A100-24x24.svg)
   */
  A100: '#a7ffeb';
  /**
   * Preview: ![teal A200](https://material-ui.com/static/colors-preview/teal-A200-24x24.svg)
   */
  A200: '#64ffda';
  /**
   * Preview: ![teal A400](https://material-ui.com/static/colors-preview/teal-A400-24x24.svg)
   */
  A400: '#1de9b6';
  /**
   * Preview: ![teal A700](https://material-ui.com/static/colors-preview/teal-A700-24x24.svg)
   */
  A700: '#00bfa5';
};

/* tslint:disable max-line-length */
/**
 * ![yellow 50](https://material-ui.com/static/colors-preview/yellow-50-24x24.svg) ![yellow 100](https://material-ui.com/static/colors-preview/yellow-100-24x24.svg) ![yellow 200](https://material-ui.com/static/colors-preview/yellow-200-24x24.svg) ![yellow 300](https://material-ui.com/static/colors-preview/yellow-300-24x24.svg) ![yellow 400](https://material-ui.com/static/colors-preview/yellow-400-24x24.svg) ![yellow 500](https://material-ui.com/static/colors-preview/yellow-500-24x24.svg) ![yellow 600](https://material-ui.com/static/colors-preview/yellow-600-24x24.svg) ![yellow 700](https://material-ui.com/static/colors-preview/yellow-700-24x24.svg) ![yellow 800](https://material-ui.com/static/colors-preview/yellow-800-24x24.svg) ![yellow 900](https://material-ui.com/static/colors-preview/yellow-900-24x24.svg) ![yellow A100](https://material-ui.com/static/colors-preview/yellow-A100-24x24.svg) ![yellow A200](https://material-ui.com/static/colors-preview/yellow-A200-24x24.svg) ![yellow A400](https://material-ui.com/static/colors-preview/yellow-A400-24x24.svg) ![yellow A700](https://material-ui.com/static/colors-preview/yellow-A700-24x24.svg)
 */
declare const yellow: {
  /**
   * Preview: ![yellow 50](https://material-ui.com/static/colors-preview/yellow-50-24x24.svg)
   */
  50: '#fffde7';
  /**
   * Preview: ![yellow 100](https://material-ui.com/static/colors-preview/yellow-100-24x24.svg)
   */
  100: '#fff9c4';
  /**
   * Preview: ![yellow 200](https://material-ui.com/static/colors-preview/yellow-200-24x24.svg)
   */
  200: '#fff59d';
  /**
   * Preview: ![yellow 300](https://material-ui.com/static/colors-preview/yellow-300-24x24.svg)
   */
  300: '#fff176';
  /**
   * Preview: ![yellow 400](https://material-ui.com/static/colors-preview/yellow-400-24x24.svg)
   */
  400: '#ffee58';
  /**
   * Preview: ![yellow 500](https://material-ui.com/static/colors-preview/yellow-500-24x24.svg)
   */
  500: '#ffeb3b';
  /**
   * Preview: ![yellow 600](https://material-ui.com/static/colors-preview/yellow-600-24x24.svg)
   */
  600: '#fdd835';
  /**
   * Preview: ![yellow 700](https://material-ui.com/static/colors-preview/yellow-700-24x24.svg)
   */
  700: '#fbc02d';
  /**
   * Preview: ![yellow 800](https://material-ui.com/static/colors-preview/yellow-800-24x24.svg)
   */
  800: '#f9a825';
  /**
   * Preview: ![yellow 900](https://material-ui.com/static/colors-preview/yellow-900-24x24.svg)
   */
  900: '#f57f17';
  /**
   * Preview: ![yellow A100](https://material-ui.com/static/colors-preview/yellow-A100-24x24.svg)
   */
  A100: '#ffff8d';
  /**
   * Preview: ![yellow A200](https://material-ui.com/static/colors-preview/yellow-A200-24x24.svg)
   */
  A200: '#ffff00';
  /**
   * Preview: ![yellow A400](https://material-ui.com/static/colors-preview/yellow-A400-24x24.svg)
   */
  A400: '#ffea00';
  /**
   * Preview: ![yellow A700](https://material-ui.com/static/colors-preview/yellow-A700-24x24.svg)
   */
  A700: '#ffd600';
};

declare const index_d_amber: typeof amber;
declare const index_d_blue: typeof blue;
declare const index_d_blueGrey: typeof blueGrey;
declare const index_d_brown: typeof brown;
declare const index_d_common: typeof common;
declare const index_d_cyan: typeof cyan;
declare const index_d_deepOrange: typeof deepOrange;
declare const index_d_deepPurple: typeof deepPurple;
declare const index_d_green: typeof green;
declare const index_d_grey: typeof grey;
declare const index_d_indigo: typeof indigo;
declare const index_d_lightBlue: typeof lightBlue;
declare const index_d_lightGreen: typeof lightGreen;
declare const index_d_lime: typeof lime;
declare const index_d_orange: typeof orange;
declare const index_d_pink: typeof pink;
declare const index_d_purple: typeof purple;
declare const index_d_red: typeof red;
declare const index_d_teal: typeof teal;
declare const index_d_yellow: typeof yellow;
declare namespace index_d {
  export {
    index_d_amber as amber,
    index_d_blue as blue,
    index_d_blueGrey as blueGrey,
    index_d_brown as brown,
    index_d_common as common,
    index_d_cyan as cyan,
    index_d_deepOrange as deepOrange,
    index_d_deepPurple as deepPurple,
    index_d_green as green,
    index_d_grey as grey,
    index_d_indigo as indigo,
    index_d_lightBlue as lightBlue,
    index_d_lightGreen as lightGreen,
    index_d_lime as lime,
    index_d_orange as orange,
    index_d_pink as pink,
    index_d_purple as purple,
    index_d_red as red,
    index_d_teal as teal,
    index_d_yellow as yellow,
  };
}

declare function capitalize(string: string): string;

type ChainedFunction = ((...args: any[]) => void) | undefined | null;

declare function createChainedFunction(
  ...funcs: ChainedFunction[]
): (...args: any[]) => never;

declare function createSvgIcon(path: React.ReactNode, displayName: string): typeof SvgIcon;

interface Cancelable {
  clear(): void;
}

declare function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait?: number
): T & Cancelable;

declare function deprecatedPropType<T>(validator: T, reason: string): T;

type NamedMuiComponent = ComponentType & { muiName: string };

interface NamedMuiElement {
  type: NamedMuiComponent;
  props: StandardProps<{}, never>;
  key: string | number | null;
}

declare function isMuiElement(element: any, muiNames: string[]): element is NamedMuiElement;

declare function ownerDocument(node?: Node): Document;

declare function ownerWindow(node?: Node): Window;

declare function requirePropFactory(componentNameInError: string): any;

/**
 * passes {value} to {ref}
 *
 * WARNING: Be sure to only call this inside a callback that is passed as a ref.
 * Otherwise make sure to cleanup previous {ref} if it changes. See
 * https://github.com/mui-org/material-ui/issues/13539
 *
 * useful if you want to expose the ref of an inner component to the public api
 * while still using it inside the component
 *
 * @param ref a ref callback or ref object if anything falsy this is a no-op
 */
declare function setRef<T>(
  ref: React.RefObject<T> | ((instance: T | null) => void) | null | undefined,
  value: T | null
): void;

declare function unsupportedProp(
  props: { [key: string]: any },
  propName: string,
  componentName: string,
  location: string,
  propFullName: string
): Error | null;

interface UseControlledProps<T = unknown> {
  /**
   * This prop contains the component value when it's controlled.
   */
  controlled: T | undefined;
  /**
   * The default value when uncontrolled.
   */
  default: T | undefined;
  /**
   * The component name displayed in warnings.
   */
  name: string;
  /**
   * The name of the state variable displayed in warnings.
   */
  state?: string;
}

declare function useControlled<T = unknown>(
  props: UseControlledProps<T>
): [T, (newValue: T) => void];

declare function useEventCallback(...args: any[]): void;

declare function useForkRef<T>(refA: React.Ref<T>, refB: React.Ref<T>): React.Ref<T>;

declare function useIsFocusVisible(): {
  isFocusVisible: (event: React.ChangeEvent) => boolean;
  onBlurVisible: () => void;
  ref: React.Ref<unknown>;
};

type PropsFor<SomeStyleFunction> = SomeStyleFunction extends StyleFunction<infer Props>
  ? Props
  : never;
type StyleFunction<Props> = (props: Props) => any;
type SimpleStyleFunction<PropKey extends keyof any> = StyleFunction<Partial<Record<PropKey, any>>>;
declare const borders: SimpleStyleFunction<
  | 'border'
  | 'borderTop'
  | 'borderRight'
  | 'borderBottom'
  | 'borderLeft'
  | 'borderColor'
  | 'borderRadius'
>;

// compose.js
/**
 * given a list of StyleFunction return the intersection of the props each individual
 * StyleFunction requires.
 *
 * If `firstFn` requires { color: string } and `secondFn` requires { spacing: number }
 * their composed function requires { color: string, spacing: number }
 */
type ComposedArg<T> = T extends Array<(arg: infer P) => any> ? P : never;
type ComposedStyleProps<T> = ComposedArg<T>;
type ComposedStyleFunction<T extends Array<StyleFunction<any>>> = StyleFunction<
  ComposedStyleProps<T>
>;

declare const display: SimpleStyleFunction<
  'display' | 'displayPrint' | 'overflow' | 'textOverflow' | 'visibility' | 'whiteSpace'
>;

// flexbox.js
declare const flexbox: SimpleStyleFunction<
  | 'flexBasis'
  | 'flexDirection'
  | 'flexWrap'
  | 'justifyContent'
  | 'alignItems'
  | 'alignContent'
  | 'order'
  | 'flex'
  | 'flexGrow'
  | 'flexShrink'
  | 'alignSelf'
  | 'justifyItems'
  | 'justifySelf'
>;

// grid.js
declare const grid: SimpleStyleFunction<
  | 'gridGap'
  | 'gridColumnGap'
  | 'gridRowGap'
  | 'gridColumn'
  | 'gridRow'
  | 'gridAutoFlow'
  | 'gridAutoColumns'
  | 'gridAutoRows'
  | 'gridTemplateColumns'
  | 'gridTemplateRows'
  | 'gridTemplateAreas'
  | 'gridArea'
>;
declare const palette: SimpleStyleFunction<'bgcolor' | 'color'>;

declare const positions: SimpleStyleFunction<
  'zIndex' | 'position' | 'top' | 'right' | 'bottom' | 'left'
>;

declare const shadows: SimpleStyleFunction<'boxShadow'>;
declare const sizing: SimpleStyleFunction<
  | 'width'
  | 'maxWidth'
  | 'minWidth'
  | 'height'
  | 'maxHeight'
  | 'minHeight'
  | 'sizeWidth'
  | 'sizeHeight'
  | 'boxSizing'
>;

// spacing.js
declare const spacing: SimpleStyleFunction<
  | 'm'
  | 'mt'
  | 'mr'
  | 'mb'
  | 'ml'
  | 'mx'
  | 'my'
  | 'p'
  | 'pt'
  | 'pr'
  | 'pb'
  | 'pl'
  | 'px'
  | 'py'
  | 'margin'
  | 'marginTop'
  | 'marginRight'
  | 'marginBottom'
  | 'marginLeft'
  | 'marginX'
  | 'marginY'
  | 'padding'
  | 'paddingTop'
  | 'paddingRight'
  | 'paddingBottom'
  | 'paddingLeft'
  | 'paddingX'
  | 'paddingY'
>;
declare const typography: SimpleStyleFunction<
  | 'fontFamily'
  | 'fontSize'
  | 'fontStyle'
  | 'fontWeight'
  | 'letterSpacing'
  | 'lineHeight'
  | 'textAlign'
>;

type BoxStyleFunction = ComposedStyleFunction<
  [
    typeof borders,
    typeof display,
    typeof flexbox,
    typeof grid,
    typeof palette,
    typeof positions,
    typeof shadows,
    typeof sizing,
    typeof spacing,
    typeof typography
  ]
>;

type SystemProps = PropsFor<BoxStyleFunction>;
type ElementProps = Omit<HTMLAttributes<HTMLElement>, keyof SystemProps>;

interface BoxProps extends ElementProps, SystemProps {
  // styled API
  component?: ElementType;
  clone?: boolean;
  // workaround for https://github.com/mui-org/material-ui/pull/15611
  css?: SystemProps;
}

declare const Box$1: ComponentType<BoxProps>;

interface GrowProps extends Omit<TransitionProps$1, 'timeout'> {
  /**
   * A single child content element.
   */
  children?: ReactElement<any, any>;
  /**
   * Enable this prop if you encounter 'Function components cannot be given refs',
   * use `unstable_createStrictModeTheme`,
   * and can't forward the ref in the child component.
   */
  disableStrictModeCompat?: boolean;
  /**
   * If `true`, show the component; triggers the enter or exit animation.
   */
  in?: boolean;
  ref?: Ref<unknown>;
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   *
   * Set to 'auto' to automatically calculate transition time based on height.
   */
  timeout?: TransitionProps$1['timeout'] | 'auto';
}

/**
 * The Grow transition is used by the [Tooltip](https://material-ui.com/components/tooltips/) and
 * [Popover](https://material-ui.com/components/popover/) components.
 * It uses [react-transition-group](https://github.com/reactjs/react-transition-group) internally.
 * Demos:
 *
 * - [Popover](https://material-ui.com/components/popover/)
 * - [Transitions](https://material-ui.com/components/transitions/)
 *
 * API:
 *
 * - [Grow API](https://material-ui.com/api/grow/)
 * - inherits [Transition API](https://reactcommunity.org/react-transition-group/transition#Transition-props)
 */
declare function Grow(props: GrowProps): JSX.Element;

interface HiddenProps {
  /**
   * Specify which implementation to use.  'js' is the default, 'css' works better for
   * server-side rendering.
   */
  implementation?: 'js' | 'css';
  /**
   * You can use this prop when choosing the `js` implementation with server-side rendering.
   *
   * As `window.innerWidth` is unavailable on the server,
   * we default to rendering an empty component during the first mount.
   * You might want to use an heuristic to approximate
   * the screen width of the client browser screen width.
   *
   * For instance, you could be using the user-agent or the client-hints.
   * https://caniuse.com/#search=client%20hint
   */
  initialWidth?: Breakpoint;
  /**
   * If `true`, screens this size and down will be hidden.
   */
  lgDown?: boolean;
  /**
   * If `true`, screens this size and up will be hidden.
   */
  lgUp?: boolean;
  /**
   * If `true`, screens this size and down will be hidden.
   */
  mdDown?: boolean;
  /**
   * If `true`, screens this size and up will be hidden.
   */
  mdUp?: boolean;
  /**
   * Hide the given breakpoint(s).
   */
  only?: Breakpoint | Breakpoint[];
  /**
   * If `true`, screens this size and down will be hidden.
   */
  smDown?: boolean;
  /**
   * If `true`, screens this size and up will be hidden.
   */
  smUp?: boolean;
  /**
   * If `true`, screens this size and down will be hidden.
   */
  xlDown?: boolean;
  /**
   * If `true`, screens this size and up will be hidden.
   */
  xlUp?: boolean;
  /**
   * If `true`, screens this size and down will be hidden.
   */
  xsDown?: boolean;
  /**
   * If `true`, screens this size and up will be hidden.
   */
  xsUp?: boolean;
}

/**
 * Responsively hides children based on the selected implementation.
 * Demos:
 *
 * - [Hidden](https://material-ui.com/components/hidden/)
 *
 * API:
 *
 * - [Hidden API](https://material-ui.com/api/hidden/)
 */
declare const Hidden: ComponentType<HiddenProps>;

interface NoSsrProps {
  /**
   * You can wrap a node.
   */
  children?: ReactNode;
  /**
   * If `true`, the component will not only prevent server-side rendering.
   * It will also defer the rendering of the children into a different screen frame.
   */
  defer?: boolean;
  /**
   * The fallback content to display.
   */
  fallback?: ReactNode;
}

/**
 * NoSsr purposely removes components from the subject of Server Side Rendering (SSR).
 *
 * This component can be useful in a variety of situations:
 *
 * -   Escape hatch for broken dependencies not supporting SSR.
 * -   Improve the time-to-first paint on the client by only rendering above the fold.
 * -   Reduce the rendering time on the server.
 * -   Under too heavy server load, you can turn on service degradation.
 * Demos:
 *
 * - [No Ssr](https://material-ui.com/components/no-ssr/)
 *
 * API:
 *
 * - [NoSsr API](https://material-ui.com/api/no-ssr/)
 */
declare function NoSsr(props: NoSsrProps): JSX.Element;

interface RootRefProps<T = any> {
  rootRef?: ((instance: T | null) => void) | RefObject<T>;
}

/**
 * ⚠️⚠️⚠️
 * If you want the DOM element of a Material-UI component check out
 * [FAQ: How can I access the DOM element?](https://material-ui.com/getting-started/faq/#how-can-i-access-the-dom-element)
 * first.
 *
 * This component uses `findDOMNode` which is deprecated in React.StrictMode.
 *
 * Helper component to allow attaching a ref to a
 * wrapped element to access the underlying DOM element.
 *
 * It's highly inspired by <https://github.com/facebook/react/issues/11401#issuecomment-340543801>.
 * For example:
 *
 * ```jsx
 * import React from 'react';
 * import RootRef from '@material-ui/core/RootRef';
 *
 * function MyComponent() {
 *   const domRef = React.useRef();
 *
 *   React.useEffect(() => {
 *     console.log(domRef.current); // DOM node
 *   }, []);
 *
 *   return (
 *     <RootRef rootRef={domRef}>
 *       <SomeChildComponent />
 *     </RootRef>
 *   );
 * }
 * ```
 * API:
 *
 * - [RootRef API](https://material-ui.com/api/root-ref/)
 */
declare const RootRef: ComponentType<RootRefProps>;

interface TextareaAutosizeProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'children' | 'rows'> {
  ref?: Ref<HTMLTextAreaElement>;
  /**
   * Use `rowsMin` instead. The prop will be removed in v5.
   *
   * @deprecated
   */
  rows?: string | number;
  /**
   * Maximum number of rows to display.
   */
  rowsMax?: string | number;
  /**
   * Minimum number of rows to display.
   */
  rowsMin?: string | number;
}

/**
 *
 * Demos:
 *
 * - [Textarea Autosize](https://material-ui.com/components/textarea-autosize/)
 *
 * API:
 *
 * - [TextareaAutosize API](https://material-ui.com/api/textarea-autosize/)
 */
declare function TextareaAutosize(props: TextareaAutosizeProps): JSX.Element;

interface TrapFocusProps {
  /**
   * If `true`, focus will be locked.
   */
  open: boolean;
  /**
   * Return the document to consider.
   * We use it to implement the restore focus between different browser documents.
   */
  getDoc: () => Document;
  /**
   * Do we still want to enforce the focus?
   * This prop helps nesting TrapFocus elements.
   */
  isEnabled: () => boolean;
  /**
   * A single child content element.
   */
  children: ReactNode;
  /**
   * If `true`, the trap focus will not automatically shift focus to itself when it opens, and
   * replace it to the last focused element when it closes.
   * This also works correctly with any trap focus children that have the `disableAutoFocus` prop.
   *
   * Generally this should never be set to `true` as it makes the trap focus less
   * accessible to assistive technologies, like screen readers.
   */
  disableAutoFocus?: boolean;
  /**
   * If `true`, the trap focus will not prevent focus from leaving the trap focus while open.
   *
   * Generally this should never be set to `true` as it makes the trap focus less
   * accessible to assistive technologies, like screen readers.
   */
  disableEnforceFocus?: boolean;
  /**
   * If `true`, the trap focus will not restore focus to previously focused element once
   * trap focus is hidden.
   */
  disableRestoreFocus?: boolean;
}

/**
 * Utility component that locks focus inside the component.
 * API:
 *
 * - [Unstable_TrapFocus API](https://material-ui.com/api/unstable-trap-focus/)
 */
declare function Unstable_TrapFocus(props: TrapFocusProps): JSX.Element;

interface UseScrollTriggerOptions {
  disableHysteresis?: boolean;
  target?: Node | Window;
  threshold?: number;
}

declare function useScrollTrigger(options?: UseScrollTriggerOptions): boolean;

interface WithMobileDialogOptions {
  breakpoint: Breakpoint;
}

interface WithMobileDialog extends WithWidth {
  fullScreen: boolean;
}

/**
 * @deprecated
 */
interface InjectedProps extends WithMobileDialog {}

declare function withMobileDialog<P = {}>(
  options?: WithMobileDialogOptions
): PropInjector<WithMobileDialog, Partial<WithMobileDialog>>;

interface ZoomProps extends TransitionProps$1 {
  /**
   * A single child content element.
   */
  children?: ReactElement<any, any>;
  /**
   * Enable this prop if you encounter 'Function components cannot be given refs',
   * use `unstable_createStrictModeTheme`,
   * and can't forward the ref in the child component.
   */
  disableStrictModeCompat?: boolean;
  /**
   * If `true`, the component will transition in.
   */
  in?: boolean;
  ref?: Ref<unknown>;
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   */
  timeout?: TransitionProps$1['timeout'];
}

/**
 * The Zoom transition can be used for the floating variant of the
 * [Button](https://material-ui.com/components/buttons/#floating-action-buttons) component.
 * It uses [react-transition-group](https://github.com/reactjs/react-transition-group) internally.
 * Demos:
 *
 * - [Transitions](https://material-ui.com/components/transitions/)
 *
 * API:
 *
 * - [Zoom API](https://material-ui.com/api/zoom/)
 * - inherits [Transition API](https://reactcommunity.org/react-transition-group/transition#Transition-props)
 */
declare function Zoom(props: ZoomProps): JSX.Element;

/**
 * All standard components exposed by `material-ui` are `StyledComponents` with
 * certain `classes`, on which one can also set a top-level `className` and inline
 * `style`.
 */
type StandardProps<C, ClassKey extends string, Removals extends keyof C = never> = Omit<
  C,
  'classes' | Removals
> &
  StyledComponentProps<ClassKey> & {
    className?: string;
    ref?: C extends { ref?: infer RefType } ? RefType : Ref<unknown>;
    style?: CSSProperties$1;
  };

type PaletteType = 'light' | 'dark';
interface Color$1 {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  A100: string;
  A200: string;
  A400: string;
  A700: string;
}

declare namespace PropTypes {
  type Alignment = 'inherit' | 'left' | 'center' | 'right' | 'justify';
  type Color = 'inherit' | 'primary' | 'secondary' | 'default';
  type Margin = 'none' | 'dense' | 'normal';
}

export { Accordion, AccordionActions, AccordionActionsClassKey, AccordionActionsProps, AccordionClassKey, AccordionDetails, AccordionDetailsClassKey, AccordionDetailsProps, AccordionProps, AccordionSummary, AccordionSummaryClassKey, AccordionSummaryProps, AccordionSummaryTypeMap, AppBar, AppBarClassKey, AppBarProps, Avatar, AvatarClassKey, AvatarProps, AvatarTypeMap, Backdrop, BackdropClassKey, BackdropProps, Badge, BadgeClassKey, BadgeOrigin, BadgeProps, BadgeTypeMap, BaseTextFieldProps, BottomNavigation, BottomNavigationAction, BottomNavigationActionClassKey, BottomNavigationActionProps, BottomNavigationActionTypeMap, BottomNavigationClassKey, BottomNavigationProps, BottomNavigationTypeMap, Box$1 as Box, BoxProps, Breadcrumbs, BreadcrumbsClassKey, BreadcrumbsProps, BreadcrumbsTypeMap, Button, ButtonBase, ButtonBaseActions, ButtonBaseClassKey, ButtonBaseProps, ButtonBaseTypeMap, ButtonClassKey, ButtonGroup, ButtonGroupClassKey, ButtonGroupProps, ButtonGroupTypeMap, ButtonProps, ButtonTypeMap, Card, CardActionArea, CardActionAreaClassKey, CardActionAreaProps, CardActionAreaTypeMap, CardActions, CardActionsClassKey, CardActionsProps, CardClassKey, CardContent, CardContentClassKey, CardContentProps, CardContentTypeMap, CardHeader, CardHeaderClassKey, CardHeaderProps, CardHeaderPropsWithComponent, CardHeaderTypeMap, CardMedia, CardMediaClassKey, CardMediaProps, CardMediaTypeMap, CardProps, Checkbox, CheckboxClassKey, CheckboxProps, Chip, ChipClassKey, ChipProps, ChipTypeMap, CircularProgress, CircularProgressClassKey, CircularProgressProps, ClickAwayListener, ClickAwayListenerProps, Collapse, CollapseClassKey, CollapseProps, Color$1 as Color, ColorFormat, ColorObject, ComponentCreator, ComponentsPropsList, Container, ContainerClassKey, ContainerProps, ContainerTypeMap, CssBaseline, CssBaselineClassKey, CssBaselineProps, Dialog, DialogActions, DialogActionsClassKey, DialogActionsProps, DialogClassKey, DialogContent, DialogContentClassKey, DialogContentProps, DialogContentText, DialogContentTextClassKey, DialogContentTextProps, DialogContentTextTypeMap, DialogProps, DialogTitle, DialogTitleClassKey, DialogTitleProps, Direction, Divider, DividerClassKey, DividerProps, DividerTypeMap, Drawer, DrawerClassKey, DrawerProps, Duration, Easing, ExpansionPanel, ExpansionPanelActions, ExpansionPanelActionsClassKey, ExpansionPanelActionsProps, ExpansionPanelClassKey, ExpansionPanelDetails, ExpansionPanelDetailsClassKey, ExpansionPanelDetailsProps, ExpansionPanelProps, ExpansionPanelSummary, ExpansionPanelSummaryClassKey, ExpansionPanelSummaryProps, ExpansionPanelSummaryTypeMap, ExtendButtonBase, ExtendButtonBaseTypeMap, Fab, FabClassKey, FabProps, FabTypeMap, Fade, FadeProps, FilledInput, FilledInputClassKey, FilledInputProps, FilledTextFieldProps, FormControl, FormControlClassKey, FormControlLabel, FormControlLabelClassKey, FormControlLabelProps, FormControlProps, FormControlState, FormControlTypeMap, FormGroup, FormGroupClassKey, FormGroupProps, FormHelperText, FormHelperTextClassKey, FormHelperTextProps, FormHelperTextTypeMap, FormLabel, FormLabelBaseProps, FormLabelClassKey, FormLabelProps, FormLabelTypeMap, Grid, GridClassKey, GridContentAlignment, GridDirection, GridItemsAlignment, GridJustification, GridList, GridListClassKey, GridListProps, GridListTile, GridListTileBar, GridListTileBarClassKey, GridListTileBarProps, GridListTileClassKey, GridListTileProps, GridListTileTypeMap, GridListTypeMap, GridProps, GridSize, GridSpacing, GridTypeMap, GridWrap, Grow, GrowProps, Hidden, HiddenProps, Icon, IconButton, IconButtonClassKey, IconButtonProps, IconButtonTypeMap, IconClassKey, IconProps, IconTypeMap, InjectedProps, Input, InputAdornment, InputAdornmentClassKey, InputAdornmentProps, InputAdornmentTypeMap, InputBase, InputBaseClassKey, InputBaseComponentProps, InputBaseProps, InputClassKey, InputLabel, InputLabelClassKey, InputLabelProps, InputProps, LabelDisplayedRowsArgs, LinearProgress, LinearProgressClassKey, LinearProgressProps, Link, LinkBaseProps, LinkClassKey, LinkProps, LinkTypeMap, List, ListClassKey, ListItem, ListItemAvatar, ListItemAvatarClassKey, ListItemAvatarProps, ListItemClassKey, ListItemIcon, ListItemIconClassKey, ListItemIconProps, ListItemProps, ListItemSecondaryAction, ListItemSecondaryActionClassKey, ListItemSecondaryActionProps, ListItemText, ListItemTextClassKey, ListItemTextProps, ListItemTypeMap, ListProps, ListSubheader, ListSubheaderClassKey, ListSubheaderProps, ListSubheaderTypeMap, ListTypeMap, Mark, Menu, MenuClassKey, MenuItem, MenuItemClassKey, MenuItemProps, MenuItemTypeMap, MenuList, MenuListClassKey, MenuListProps, MenuProps, MobileStepper, MobileStepperClassKey, MobileStepperProps, Modal, ModalManager, ModalProps, MuiMediaQueryList, MuiMediaQueryListEvent, MuiMediaQueryListListener, ThemeProvider as MuiThemeProvider, NativeSelect, NativeSelectClassKey, NativeSelectProps, NoSsr, NoSsrProps, Omit, Options, Orientation, OutlinedInput, OutlinedInputClassKey, OutlinedInputProps, OutlinedTextFieldProps, OverridableCardHeader, Padding, PaletteColorOptions, PaletteType, Paper, PaperClassKey, PaperProps, Popover, PopoverActions, PopoverClassKey, PopoverOrigin, PopoverPosition, PopoverProps, PopoverReference, Popper$1 as Popper, PopperPlacementType, PopperProps, Portal, PortalProps, PropTypes, Radio, RadioClassKey, RadioGroup, RadioGroupClassKey, RadioGroupProps, RadioGroupState, RadioProps, RootRef, RootRefProps, Select, SelectClassKey, SelectProps, ServerStyleSheets, SimplePaletteColorOptions, Size, Slide, SlideProps, Slider, SliderClassKey, SliderProps, SliderTypeMap, Snackbar, SnackbarClassKey, SnackbarCloseReason, SnackbarContent, SnackbarContentClassKey, SnackbarContentProps, SnackbarOrigin, SnackbarProps, SortDirection, StandardProps, StandardTextFieldProps, Step, StepButton, StepButtonClasskey, StepButtonIcon, StepButtonProps, StepButtonTypeMap, StepClasskey, StepConnector, StepConnectorClasskey, StepConnectorIcon, StepConnectorProps, StepContent, StepContentClasskey, StepContentProps, StepIcon, StepIconClasskey, StepIconProps, StepLabel, StepLabelClasskey, StepLabelProps, StepProps, Stepper, StepperClasskey, StepperProps, StyleRules$1 as StyleRules, StyleRulesCallback, StyledComponentProps, StyledProps, StylesProvider, SvgIcon, SvgIconClassKey, SvgIconProps, SvgIconTypeMap, SwipeableDrawer, SwipeableDrawerProps, Switch, SwitchClassKey, SwitchProps, Tab, TabClassKey, TabProps, TabScrollButton, TabScrollButtonClassKey, TabScrollButtonProps, TabTypeMap, Table, TableBody, TableBodyClassKey, TableBodyProps, TableBodyTypeMap, TableCell, TableCellBaseProps, TableCellClassKey, TableCellProps, TableClassKey, TableContainer, TableContainerClassKey, TableContainerProps, TableContainerTypeMap, TableFooter, TableFooterClassKey, TableFooterProps, TableFooterTypeMap, TableHead, TableHeadClassKey, TableHeadProps, TableHeadTypeMap, TablePagination, TablePaginationBaseProps, TablePaginationClassKey, TablePaginationProps, TablePaginationTypeMap, TableProps, TableRow, TableRowClassKey, TableRowProps, TableRowTypeMap, TableSortLabel, TableSortLabelClassKey, TableSortLabelProps, TableSortLabelTypeMap, TableTypeMap, Tabs, TabsActions, TabsClassKey, TabsProps, TabsTypeMap, TextField, TextFieldClassKey, TextFieldProps, TextareaAutosize, TextareaAutosizeProps, Theme, ThemeOptions, ThemeProvider, ThemeProviderProps, Toolbar, ToolbarClassKey, ToolbarProps, ToolbarTypeMap, Tooltip, TooltipClassKey, TooltipProps, Transitions, TransitionsOptions, TrapFocusProps, Typography$1 as Typography, TypographyClassKey, TypographyProps, TypographyStyle, TypographyTypeMap, Variant as TypographyVariant, Unstable_TrapFocus, ValueLabelProps, WithMobileDialog, WithMobileDialogOptions, WithStyles, WithTheme, WithWidth, WithWidthOptions, WithWidthProps, Zoom, ZoomProps, capitalize, index_d as colors, createChainedFunction, createGenerateClassName, createMuiTheme, createStyles, createSvgIcon, darken, debounce, decomposeColor, deprecatedPropType, duration, easing, emphasize, fade, formatMs, getContrastRatio, getLuminance, hexToRgb, hslToRgb, isMuiElement, isWidthDown, isWidthUp, jssPreset, lighten, makeStyles, ownerDocument, ownerWindow, recomposeColor, requirePropFactory, responsiveFontSizes, rgbToHex, setRef, styled, createMuiTheme as unstable_createMuiStrictModeTheme, unsupportedProp, useControlled, useEventCallback, useForkRef, useFormControl, useIsFocusVisible, useMediaQuery, useRadioGroup, useScrollTrigger, useTheme, withMobileDialog, withStyles, withTheme, withWidth };
