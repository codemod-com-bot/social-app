import {useCallback} from 'react'
import {View} from 'react-native'
import {msg, Trans} from '@lingui/macro'
import {useLingui} from '@lingui/react'
import { useTranslation } from "react-i18next";

import {
  type EmbedPlayerSource,
  embedPlayerSources,
  externalEmbedLabels,
} from '#/lib/strings/embed-player'
import {useSetExternalEmbedPref} from '#/state/preferences'
import {atoms as a, useBreakpoints, useTheme} from '#/alf'
import * as Dialog from '#/components/Dialog'
import {Button, ButtonText} from '../Button'
import {Text} from '../Typography'

export function EmbedConsentDialog({
  control,
  source,
  onAccept,
}: {
  control: Dialog.DialogControlProps
  source: EmbedPlayerSource
  onAccept: () => void
}) {
const { t } = useTranslation("components/dialogs");

  const {_} = useLingui()
  const t = useTheme()
  const setExternalEmbedPref = useSetExternalEmbedPref()
  const {gtMobile} = useBreakpoints()

  const onShowAllPress = useCallback(() => {
    for (const key of embedPlayerSources) {
      setExternalEmbedPref(key, 'show')
    }
    onAccept()
    control.close()
  }, [control, onAccept, setExternalEmbedPref])

  const onShowPress = useCallback(() => {
    setExternalEmbedPref(source, 'show')
    onAccept()
    control.close()
  }, [control, onAccept, setExternalEmbedPref, source])

  const onHidePress = useCallback(() => {
    setExternalEmbedPref(source, 'hide')
    control.close()
  }, [control, setExternalEmbedPref, source])

  return (
    <Dialog.Outer control={control}>
      <Dialog.Handle />
      <Dialog.ScrollableInner
        label={_(msg`External Media`)}
        style={[gtMobile ? {width: 'auto', maxWidth: 400} : a.w_full]}>
        <View style={a.gap_sm}>
          <Text style={[a.text_2xl, a.font_bold]}>
            <Trans>{t('external-media-title')}</Trans>
          </Text>

          <View style={[a.mt_sm, a.mb_2xl, a.gap_lg]}>
            <Text>
              <Trans>{t('external-media-hosted-by')}{externalEmbedLabels[source]}{t('external-media-enable-prompt')}</Trans>
            </Text>

            <Text style={t.atoms.text_contrast_medium}>
              <Trans>{t('external-media-privacy-warning')}</Trans>
            </Text>
          </View>
        </View>
        <View style={a.gap_md}>
          <Button
            style={gtMobile && a.flex_1}
            label={_(msg`Enable external media`)}
            onPress={onShowAllPress}
            onAccessibilityEscape={control.close}
            color="primary"
            size="large"
            variant="solid">
            <ButtonText>
              <Trans>{t('external-media-enable-button')}</Trans>
            </ButtonText>
          </Button>
          <Button
            style={gtMobile && a.flex_1}
            label={_(msg`Enable this source only`)}
            onPress={onShowPress}
            onAccessibilityEscape={control.close}
            color="secondary"
            size="large"
            variant="solid">
            <ButtonText>
              <Trans>{t('external-media-enable-prefix')}{externalEmbedLabels[source]}{t('external-media-only-suffix')}</Trans>
            </ButtonText>
          </Button>
          <Button
            label={_(msg`No thanks`)}
            onAccessibilityEscape={control.close}
            onPress={onHidePress}
            color="secondary"
            size="large"
            variant="ghost">
            <ButtonText>
              <Trans>{t('external-media-no-thanks')}</Trans>
            </ButtonText>
          </Button>
        </View>
        <Dialog.Close />
      </Dialog.ScrollableInner>
    </Dialog.Outer>
  )
}
