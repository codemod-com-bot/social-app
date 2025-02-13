import React from 'react'
import {msg, Trans} from '@lingui/macro'
import {useLingui} from '@lingui/react'
import {useFocusEffect} from '@react-navigation/native'
import { useTranslation } from "react-i18next";

import {HELP_DESK_URL} from '#/lib/constants'
import {usePalette} from '#/lib/hooks/usePalette'
import {CommonNavigatorParams, NativeStackScreenProps} from '#/lib/routes/types'
import {s} from '#/lib/styles'
import {useSetMinimalShellMode} from '#/state/shell'
import {TextLink} from '#/view/com/util/Link'
import {Text} from '#/view/com/util/text/Text'
import {ViewHeader} from '#/view/com/util/ViewHeader'
import {CenteredView} from '#/view/com/util/Views'
import * as Layout from '#/components/Layout'

type Props = NativeStackScreenProps<CommonNavigatorParams, 'Support'>
export const SupportScreen = (_props: Props) => {
const { t } = useTranslation("view/screens");

  const pal = usePalette('default')
  const setMinimalShellMode = useSetMinimalShellMode()
  const {_} = useLingui()

  useFocusEffect(
    React.useCallback(() => {
      setMinimalShellMode(false)
    }, [setMinimalShellMode]),
  )

  return (
    <Layout.Screen>
      <ViewHeader title={_(msg`Support`)} />
      <CenteredView>
        <Text type="title-xl" style={[pal.text, s.p20, s.pb5]}>
          <Trans>{t('support-title')}</Trans>
        </Text>
        <Text style={[pal.text, s.p20]}>
          <Trans>{t('support-form-moved-message')}
            <TextLink
              href={HELP_DESK_URL}
              text={_(msg`click here`)}
              style={pal.link}
            />{t('contact-help-desk-message', { HELP_DESK_URL })}</Trans>
        </Text>
      </CenteredView>
    </Layout.Screen>
  )
}
