import React, {useRef} from 'react';
import {createPortal} from 'react-dom';
import {ViewStyle} from 'react-native';
import {ModalProps} from 'react-native-modal';
import Modal from '@components/Modal';
import {PopoverContext} from '@components/PopoverProvider';
import PopoverWithoutOverlay from '@components/PopoverWithoutOverlay';
import withWindowDimensions from '@components/withWindowDimensions';
import CONST from '@src/CONST';
import {defaultProps, propTypes} from './popoverPropTypes';

/*
 * This is a convenience wrapper around the Modal component for a responsive Popover.
 * On small screen widths, it uses BottomDocked modal type, and a Popover type on wide screen widths.
 */

type PopoverProps = {
    isVisible: boolean;
    anchorPosition: {
        top: number;
        left: number;
        bottom: number;
        right: number;
    };
    anchorAlignment: {horizontal: string; vertical: string};
    anchorRef: React.RefObject<HTMLElement>;
    disableAnimation: boolean;
    withoutOverlay: boolean;
    fullscreen?: boolean;
    shouldCloseOnOutsideClick?: boolean;
    shouldSetModalVisibility?: boolean;
    onClose: () => void;
    children: React.ReactNode;
    onSubmit?: () => void;
    onModalHide?: () => void;
    onModalShow?: () => void;
    animationIn?: ModalProps['animationIn'];
    animationInTiming?: number;
    animationOut?: ModalProps['animationOut'];
    animationOutTiming?: number;
    innerContainerStyle?: ViewStyle;
    statusBarTranslucent?: boolean;
    avoidKeyboard?: boolean;
    hideModalContentWhileAnimating?: boolean;
    isExtraSmallScreenWidth?: boolean;
    isSmallScreenWidth?: boolean;
    isMediumScreenWidth?: boolean;
    isLargeScreenWidth?: boolean;
    popoverDimensions?: {
        width: number;
        height: number;
    };
    windowHeight?: number;
    windowWidth?: number;
    withoutOverlayRef?: React.RefObject<HTMLElement>;
    outerStyle?: ViewStyle | Record<string, never>;
    onLayout?: () => void;
};
function Popover(props: PopoverProps) {
    const {isVisible, onClose, isSmallScreenWidth, fullscreen, animationInTiming, onLayout, animationOutTiming, disableAnimation, withoutOverlay, anchorPosition, anchorRef} = props;
    const withoutOverlayRef = useRef(null);
    const {close, popover} = React.useContext(PopoverContext);

    // Not adding this inside the PopoverProvider
    // because this is an issue on smaller screens as well.
    React.useEffect(() => {
        const listener = () => {
            if (!isVisible) {
                return;
            }

            onClose();
        };
        window.addEventListener('popstate', listener);
        return () => {
            window.removeEventListener('popstate', listener);
        };
    }, [onClose, isVisible]);

    const onCloseWithPopoverContext = () => {
        if (popover) {
            close(anchorRef);
        }
        onClose();
    };

    if (!fullscreen && !isSmallScreenWidth) {
        return createPortal(
            <Modal
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...props}
                onClose={onCloseWithPopoverContext}
                type={CONST.MODAL.MODAL_TYPE.POPOVER}
                popoverAnchorPosition={anchorPosition}
                animationInTiming={disableAnimation ? 1 : animationInTiming}
                animationOutTiming={disableAnimation ? 1 : animationOutTiming}
                shouldCloseOnOutsideClick
                onLayout={onLayout}
            />,
            document.body,
        );
    }

    if (withoutOverlay && !isSmallScreenWidth) {
        return createPortal(
            <PopoverWithoutOverlay
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...props}
                withoutOverlayRef={withoutOverlayRef}
            />,
            document.body,
        );
    }

    return (
        <Modal
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...props}
            onClose={onCloseWithPopoverContext}
            type={isSmallScreenWidth ? CONST.MODAL.MODAL_TYPE.BOTTOM_DOCKED : CONST.MODAL.MODAL_TYPE.POPOVER}
            popoverAnchorPosition={isSmallScreenWidth ? undefined : anchorPosition}
            fullscreen={isSmallScreenWidth ? true : fullscreen}
            animationInTiming={disableAnimation && !isSmallScreenWidth ? 1 : animationInTiming}
            animationOutTiming={disableAnimation && !isSmallScreenWidth ? 1 : animationOutTiming}
            onLayout={onLayout}
        />
    );
}

Popover.propTypes = propTypes;
Popover.defaultProps = defaultProps;
Popover.displayName = 'Popover';

export default withWindowDimensions(Popover);
