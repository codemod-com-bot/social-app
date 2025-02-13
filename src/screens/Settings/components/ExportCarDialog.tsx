import React from 'react'
import {View} from 'react-native'
import {msg, Trans} from '@lingui/macro'
import {useLingui} from '@lingui/react'
import { Trans,useTranslation } from "react-i18next";

import {saveBytesToDisk} from '#/lib/media/manip'
import {logger} from '#/logger'
import {useAgent} from '#/state/session'
import * as Toast from '#/view/com/util/Toast'
import {atoms as a, useTheme} from '#/alf'
import {Button, ButtonIcon, ButtonText} from '#/components/Button'
import * as Dialog from '#/components/Dialog'
import {Download_Stroke2_Corner0_Rounded as DownloadIcon} from '#/components/icons/Download'
import {InlineLinkText} from '#/components/Link'
import {Loader} from '#/components/Loader'
import {Text} from '#/components/Typography'

export function ExportCarDialog({
  control,
}: {
  control: Dialog.DialogOuterProps['control']
}) {
const { t } = useTranslation("screens/Settings/components");

  const {_} = useLingui()
  const t = useTheme()
  const agent = useAgent()
  const [loading, setLoading] = React.useState(false)

  const download = React.useCallback(async () => {
    if (!agent.session) {
      return // shouldnt ever happen
    }
    try {
      setLoading(true)
      const did = agent.session.did
      const downloadRes = await agent.com.atproto.sync.getRepo({did})
      const saveRes = await saveBytesToDisk(
        'repo.car',
        downloadRes.data,
        downloadRes.headers['content-type'] || 'application/vnd.ipld.car',
      )

      if (saveRes) {
        Toast.show(_(msg`File saved successfully!`))
      }
    } catch (e) {
      logger.error('Error occurred while downloading CAR file', {message: e})
      Toast.show(_(msg`Error occurred while saving file`), 'xmark')
    } finally {
      setLoading(false)
      control.close()
    }
  }, [_, control, agent])

  return (
    <Dialog.Outer control={control}>
      <Dialog.Handle />
      <Dialog.ScrollableInner
        accessibilityDescribedBy="dialog-description"
        accessibilityLabelledBy="dialog-title">
        <View style={[a.relative, a.gap_lg, a.w_full]}>
          <Text nativeID="dialog-title" style={[a.text_2xl, a.font_bold]}>
            <Trans>{t('export-my-data')}</Trans>
          </Text>
          <Text nativeID="dialog-description" style={[a.text_sm]}>
            <Trans>{t('account-repository-download-info')}</Trans>
          </Text>

          <Button
            variant="solid"
            color="primary"
            size="large"
            label={_(msg`Download CAR file`)}
            disabled={loading}
            onPress={download}>
            <ButtonIcon icon={DownloadIcon} />
            <ButtonText>
              <Trans>{t('download-car-file')}</Trans>
            </ButtonText>
            {loading && <ButtonIcon icon={Loader} />}
          </Button>

          <Text
            style={[
              t.atoms.text_contrast_medium,
              a.text_sm,
              a.leading_snug,
              a.flex_1,
            ]}>
            <Trans><Trans
i18nKey="beta-feature-repository-exports"
components={{"0": <InlineLinkText
                label={_(msg`View blogpost for more details`)}
                to="https://docs.bsky.app/blog/repo-export"
                style={[a.text_sm]} />}}
/>
              </Trans>
          </Text>
        </View>
      </Dialog.ScrollableInner>
    </Dialog.Outer>
  )
}
