import {View} from 'react-native'
import {msg, Trans} from '@lingui/macro'
import {useLingui} from '@lingui/react'
import { useTranslation } from "react-i18next";

import {atoms as a, useBreakpoints} from '#/alf'
import {Button, ButtonText} from '#/components/Button'
import {Text} from '#/components/Typography'
import {FormContainer} from './FormContainer'

export const PasswordUpdatedForm = ({
  onPressNext,
}: {
  onPressNext: () => void
}) => {
const { t } = useTranslation("screens/Login");

  const {_} = useLingui()
  const {gtMobile} = useBreakpoints()

  return (
    <FormContainer
      testID="passwordUpdatedForm"
      style={[a.gap_2xl, !gtMobile && a.mt_5xl]}>
      <Text style={[a.text_3xl, a.font_bold, a.text_center]}>
        <Trans>{t('password-updated')}</Trans>
      </Text>
      <Text style={[a.text_center, a.mx_auto, {maxWidth: '80%'}]}>
        <Trans>{t('sign-in-new-password')}</Trans>
      </Text>
      <View style={[a.flex_row, a.justify_center]}>
        <Button
          onPress={onPressNext}
          label={_(msg`Close alert`)}
          accessibilityHint={_(msg`Closes password update alert`)}
          variant="solid"
          color="primary"
          size="large">
          <ButtonText>
            <Trans>{t('okay')}</Trans>
          </ButtonText>
        </Button>
      </View>
    </FormContainer>
  )
}
