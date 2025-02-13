import {msg, Trans} from '@lingui/macro'
import {useLingui} from '@lingui/react'
import {NativeStackScreenProps} from '@react-navigation/native-stack'
import { Trans,useTranslation } from "react-i18next";

import {CommonNavigatorParams} from '#/lib/routes/types'
import {isNative} from '#/platform/detection'
import {
  useHapticsDisabled,
  useRequireAltTextEnabled,
  useSetHapticsDisabled,
  useSetRequireAltTextEnabled,
} from '#/state/preferences'
import {
  useLargeAltBadgeEnabled,
  useSetLargeAltBadgeEnabled,
} from '#/state/preferences/large-alt-badge'
import * as SettingsList from '#/screens/Settings/components/SettingsList'
import {atoms as a} from '#/alf'
import {Admonition} from '#/components/Admonition'
import * as Toggle from '#/components/forms/Toggle'
import {Accessibility_Stroke2_Corner2_Rounded as AccessibilityIcon} from '#/components/icons/Accessibility'
import {Haptic_Stroke2_Corner2_Rounded as HapticIcon} from '#/components/icons/Haptic'
import * as Layout from '#/components/Layout'
import {InlineLinkText} from '#/components/Link'

type Props = NativeStackScreenProps<
  CommonNavigatorParams,
  'AccessibilitySettings'
>
export function AccessibilitySettingsScreen({}: Props) {
const { t } = useTranslation("screens/Settings");

  const {_} = useLingui()

  const requireAltTextEnabled = useRequireAltTextEnabled()
  const setRequireAltTextEnabled = useSetRequireAltTextEnabled()
  const hapticsDisabled = useHapticsDisabled()
  const setHapticsDisabled = useSetHapticsDisabled()
  const largeAltBadgeEnabled = useLargeAltBadgeEnabled()
  const setLargeAltBadgeEnabled = useSetLargeAltBadgeEnabled()

  return (
    <Layout.Screen>
      <Layout.Header.Outer>
        <Layout.Header.BackButton />
        <Layout.Header.Content>
          <Layout.Header.TitleText>
            <Trans>{t('accessibility')}</Trans>
          </Layout.Header.TitleText>
        </Layout.Header.Content>
        <Layout.Header.Slot />
      </Layout.Header.Outer>
      <Layout.Content>
        <SettingsList.Container>
          <SettingsList.Group contentContainerStyle={[a.gap_sm]}>
            <SettingsList.ItemIcon icon={AccessibilityIcon} />
            <SettingsList.ItemText>
              <Trans>{t('alt-text')}</Trans>
            </SettingsList.ItemText>
            <Toggle.Item
              name="require_alt_text"
              label={_(msg`Require alt text before posting`)}
              value={requireAltTextEnabled ?? false}
              onChange={value => setRequireAltTextEnabled(value)}
              style={[a.w_full]}>
              <Toggle.LabelText style={[a.flex_1]}>
                <Trans>{t('require-alt-text')}</Trans>
              </Toggle.LabelText>
              <Toggle.Platform />
            </Toggle.Item>
            <Toggle.Item
              name="large_alt_badge"
              label={_(msg`Display larger alt text badges`)}
              value={!!largeAltBadgeEnabled}
              onChange={value => setLargeAltBadgeEnabled(value)}
              style={[a.w_full]}>
              <Toggle.LabelText style={[a.flex_1]}>
                <Trans>{t('larger-alt-text-badges')}</Trans>
              </Toggle.LabelText>
              <Toggle.Platform />
            </Toggle.Item>
          </SettingsList.Group>
          {isNative && (
            <>
              <SettingsList.Divider />
              <SettingsList.Group contentContainerStyle={[a.gap_sm]}>
                <SettingsList.ItemIcon icon={HapticIcon} />
                <SettingsList.ItemText>
                  <Trans>{t('haptics')}</Trans>
                </SettingsList.ItemText>
                <Toggle.Item
                  name="haptics"
                  label={_(msg`Disable haptic feedback`)}
                  value={hapticsDisabled ?? false}
                  onChange={value => setHapticsDisabled(value)}
                  style={[a.w_full]}>
                  <Toggle.LabelText style={[a.flex_1]}>
                    <Trans>{t('disable-haptic-feedback')}</Trans>
                  </Toggle.LabelText>
                  <Toggle.Platform />
                </Toggle.Item>
              </SettingsList.Group>
            </>
          )}
          <SettingsList.Item>
            <Admonition type="info" style={[a.flex_1]}>
              <Trans><Trans
i18nKey="autoplay-options-moved-to-settings"
components={{"0": <InlineLinkText
                  to="/settings/content-and-media"
                  label={_(msg`Content and media`)} />}}
/>
                </Trans>
            </Admonition>
          </SettingsList.Item>
        </SettingsList.Container>
      </Layout.Content>
    </Layout.Screen>
  )
}
