import React, {useEffect} from 'react';
import _ from 'underscore';
import PropTypes from 'prop-types';
import {withOnyx} from 'react-native-onyx';
import ROUTES from '../../../ROUTES';
import HeaderWithBackButton from '../../../components/HeaderWithBackButton';
import ScreenWrapper from '../../../components/ScreenWrapper';
import Navigation from '../../../libs/Navigation/Navigation';
import styles from '../../../styles/styles';
import Text from '../../../components/Text';
import useLocalize from '../../../hooks/useLocalize';
import * as Card from '../../../libs/actions/Card';
import assignedCardPropTypes from './assignedCardPropTypes';
import * as CardUtils from '../../../libs/CardUtils';
import ONYXKEYS from '../../../ONYXKEYS';
import NotFoundPage from '../../ErrorPage/NotFoundPage';
import Form from '../../../components/Form';
import usePrevious from '../../../hooks/usePrevious';
import * as FormActions from '../../../libs/actions/FormActions';

const propTypes = {
    /* Onyx Props */
    formData: PropTypes.shape({
        isLoading: PropTypes.bool,
    }),
    cardList: PropTypes.objectOf(assignedCardPropTypes),
    /** The parameters needed to authenticate with a short-lived token are in the URL */
    route: PropTypes.shape({
        /** Each parameter passed via the URL */
        params: PropTypes.shape({
            /** Domain string */
            domain: PropTypes.string,
        }),
    }).isRequired,
};

const defaultProps = {
    cardList: {},
    formData: {},
};

function ReportFraudPage({
    route: {
        params: {domain},
    },
    cardList,
    formData,
}) {
    const {translate} = useLocalize();

    const domainCards = CardUtils.getDomainCards(cardList)[domain];
    const virtualCard = _.find(domainCards, (card) => card.isVirtual) || {};

    const prevIsLoading = usePrevious(formData.isLoading);

    useEffect(() => {
        if (prevIsLoading && formData.isLoading === false && _.isEmpty(virtualCard.errors)) {
            Navigation.navigate(ROUTES.SETTINGS_WALLET_DOMAINCARDS.getRoute(domain));
        }

        if (formData.isLoading !== false && _.isEmpty(virtualCard.errors)) {
            return;
        }

        FormActions.setErrors(ONYXKEYS.FORMS.REPORT_FRAUD_FORM, virtualCard.errors);
    }, [domain, formData.isLoading, prevIsLoading, virtualCard.errors]);

    const submitReportFraud = () => {
        Card.reportDigitalExpensifyCardFraud(virtualCard.cardID);
    };

    const onBackButtonPress = () => {
        Navigation.goBack(ROUTES.SETTINGS_WALLET_DOMAINCARDS.getRoute(domain));
    };

    if (_.isEmpty(virtualCard)) {
        return <NotFoundPage />;
    }

    return (
        <ScreenWrapper
            includeSafeAreaPaddingBottom={false}
            testID={ReportFraudPage.displayName}
        >
            <HeaderWithBackButton
                title={translate('reportFraudPage.title')}
                onBackButtonPress={onBackButtonPress}
            />
            <Form
                formID={ONYXKEYS.FORMS.REPORT_FRAUD_FORM}
                style={[styles.flexGrow1, styles.mh5]}
                onSubmit={submitReportFraud}
                submitButtonText={translate('reportFraudPage.deactivateCard')}
            >
                <Text style={[styles.baseFontStyle]}>{translate('reportFraudPage.description')}</Text>
            </Form>
        </ScreenWrapper>
    );
}

ReportFraudPage.propTypes = propTypes;
ReportFraudPage.defaultProps = defaultProps;
ReportFraudPage.displayName = 'ReportFraudPage';

export default withOnyx({
    cardList: {
        key: ONYXKEYS.CARD_LIST,
    },
    formData: {
        key: ONYXKEYS.FORMS.REPORT_FRAUD_FORM,
    },
})(ReportFraudPage);
