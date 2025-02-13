import {View} from 'react-native'
import { useTranslation } from "react-i18next";

import {atoms as a, useTheme} from '#/alf'
import {ButtonText} from '#/components/Button'
import {InlineLinkText, Link} from '#/components/Link'
import {H1, Text} from '#/components/Typography'

export function Links() {
const { t } = useTranslation("view/screens/Storybook");

  const t = useTheme()
  return (
    <View style={[a.gap_md, a.align_start]}>
      <H1>{t('links')}</H1>

      <View style={[a.gap_md, a.align_start]}>
        <InlineLinkText label={t('foo-string')} to="https://google.com" style={[a.text_lg]}>{t('google-url')}</InlineLinkText>
        <InlineLinkText label={t('foo-string-duplicate')} to="https://google.com" style={[a.text_lg]}>{t('external-with-custom-children')}</InlineLinkText>
        <InlineLinkText
          label={t('foo-string-duplicate-2')}
          to="https://bsky.social"
          style={[a.text_md, t.atoms.text_contrast_low]}>{t('internal-bsky-social')}</InlineLinkText>
        <InlineLinkText
          label={t('foo-string-duplicate-3')}
          to="https://bsky.app/profile/bsky.app"
          style={[a.text_md]}>{t('internal-bsky-app')}</InlineLinkText>

        <Link
          variant="solid"
          color="primary"
          size="large"
          label="View @bsky.app's profile"
          to="https://bsky.app/profile/bsky.app">
          <ButtonText>{t('link-as-button')}</ButtonText>
        </Link>

        <Link
          label="View @bsky.app's profile"
          to="https://bsky.app/profile/bsky.app">
          <View
            style={[
              a.flex_row,
              a.align_center,
              a.gap_md,
              a.rounded_md,
              a.p_md,
              t.atoms.bg_contrast_25,
            ]}>
            <View
              style={[
                {width: 32, height: 32},
                a.rounded_full,
                t.atoms.bg_contrast_200,
              ]}
            />
            <Text>{t('view-bsky-app-profile')}</Text>
          </View>
        </Link>
      </View>
    </View>
  )
}
