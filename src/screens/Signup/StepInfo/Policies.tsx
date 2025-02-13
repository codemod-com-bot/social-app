import {ReactElement} from 'react'
import {View} from 'react-native'
import {ComAtprotoServerDescribeServer} from '@atproto/api'
import {msg, Trans} from '@lingui/macro'
import {useLingui} from '@lingui/react'
import { Trans,useTranslation } from "react-i18next";

import {atoms as a, useTheme} from '#/alf'
import {CircleInfo_Stroke2_Corner0_Rounded as CircleInfo} from '#/components/icons/CircleInfo'
import {InlineLinkText} from '#/components/Link'
import {Text} from '#/components/Typography'

export const Policies = ({
  serviceDescription,
  needsGuardian,
  under13,
}: {
  serviceDescription: ComAtprotoServerDescribeServer.OutputSchema
  needsGuardian: boolean
  under13: boolean
}) => {
const { t } = useTranslation("screens/Signup/StepInfo");

  const t = useTheme()
  const {_} = useLingui()

  if (!serviceDescription) {
    return <View />
  }

  const tos = validWebLink(serviceDescription.links?.termsOfService)
  const pp = validWebLink(serviceDescription.links?.privacyPolicy)

  if (!tos && !pp) {
    return (
      <View style={[a.flex_row, a.align_center, a.gap_xs]}>
        <CircleInfo size="md" fill={t.atoms.text_contrast_low.color} />

        <Text style={[t.atoms.text_contrast_medium]}>
          <Trans>{t('terms-service-privacy-policy-not-provided')}</Trans>
        </Text>
      </View>
    )
  }

  let els: ReactElement
  if (tos && pp) {
    els = (
      <Trans><Trans
i18nKey="account-creation-agreement-terms-and-privacy"
components={{"0": <InlineLinkText
          label={_(msg`Read the Bluesky Terms of Service`)}
          key="tos"
          to={tos} />, "1": <InlineLinkText
          label={_(msg`Read the Bluesky Privacy Policy`)}
          key="pp"
          to={pp} />}}
/>
        
        </Trans>
    )
  } else if (tos) {
    els = (
      <Trans><Trans
i18nKey="account-creation-agreement-terms"
components={{"0": <InlineLinkText
          label={_(msg`Read the Bluesky Terms of Service`)}
          key="tos"
          to={tos} />}}
/>
        </Trans>
    )
  } else if (pp) {
    els = (
      <Trans><Trans
i18nKey="account-creation-agreement-privacy"
components={{"0": <InlineLinkText
          label={_(msg`Read the Bluesky Privacy Policy`)}
          key="pp"
          to={pp} />}}
/>
        </Trans>
    )
  } else {
    return null
  }

  return (
    <View style={[a.gap_sm]}>
      {els ? (
        <Text style={[a.leading_snug, t.atoms.text_contrast_medium]}>
          {els}
        </Text>
      ) : null}

      {under13 ? (
        <Text style={[a.font_bold, a.leading_snug, t.atoms.text_contrast_high]}>
          <Trans>{t('minimum-age-requirement')}</Trans>
        </Text>
      ) : needsGuardian ? (
        <Text style={[a.font_bold, a.leading_snug, t.atoms.text_contrast_high]}>
          <Trans>{t('parental-consent-requirement')}</Trans>
        </Text>
      ) : undefined}
    </View>
  )
}

function validWebLink(url?: string): string | undefined {
  return url && (url.startsWith('http://') || url.startsWith('https://'))
    ? url
    : undefined
}
