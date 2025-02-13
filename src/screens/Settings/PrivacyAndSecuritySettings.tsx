import {View} from 'react-native'
import {msg, Trans} from '@lingui/macro'
import {useLingui} from '@lingui/react'
import {NativeStackScreenProps} from '@react-navigation/native-stack'
import { useTranslation } from "react-i18next";

import {CommonNavigatorParams} from '#/lib/routes/types'
import {useAppPasswordsQuery} from '#/state/queries/app-passwords'
import {useSession} from '#/state/session'
import * as SettingsList from '#/screens/Settings/components/SettingsList'
import {atoms as a, useTheme} from '#/alf'
import * as Admonition from '#/components/Admonition'
import {EyeSlash_Stroke2_Corner0_Rounded as EyeSlashIcon} from '#/components/icons/EyeSlash'
import {Key_Stroke2_Corner2_Rounded as KeyIcon} from '#/components/icons/Key'
import {Verified_Stroke2_Corner2_Rounded as VerifiedIcon} from '#/components/icons/Verified'
import * as Layout from '#/components/Layout'
import {InlineLinkText} from '#/components/Link'
import {Email2FAToggle} from './components/Email2FAToggle'
import {PwiOptOut} from './components/PwiOptOut'

type Props = NativeStackScreenProps<
  CommonNavigatorParams,
  'PrivacyAndSecuritySettings'
>
export function PrivacyAndSecuritySettingsScreen({}: Props) {
const { t } = useTranslation("screens/Settings");

  const {_} = useLingui()
  const t = useTheme()
  const {data: appPasswords} = useAppPasswordsQuery()
  const {currentAccount} = useSession()

  return (
    <Layout.Screen>
      <Layout.Header.Outer>
        <Layout.Header.BackButton />
        <Layout.Header.Content>
          <Layout.Header.TitleText>
            <Trans>{t('privacy-and-security')}</Trans>
          </Layout.Header.TitleText>
        </Layout.Header.Content>
        <Layout.Header.Slot />
      </Layout.Header.Outer>
      <Layout.Content>
        <SettingsList.Container>
          <SettingsList.Item>
            <SettingsList.ItemIcon
              icon={VerifiedIcon}
              color={
                currentAccount?.emailAuthFactor
                  ? t.palette.primary_500
                  : undefined
              }
            />
            <SettingsList.ItemText>
              {currentAccount?.emailAuthFactor ? (
                <Trans>{t('email-2fa-enabled')}</Trans>
              ) : (
                <Trans>{t('two-factor-authentication')}</Trans>
              )}
            </SettingsList.ItemText>
            <Email2FAToggle />
          </SettingsList.Item>
          <SettingsList.LinkItem
            to="/settings/app-passwords"
            label={_(msg`App passwords`)}>
            <SettingsList.ItemIcon icon={KeyIcon} />
            <SettingsList.ItemText>
              <Trans>{t('app-passwords')}</Trans>
            </SettingsList.ItemText>
            {appPasswords && appPasswords.length > 0 && (
              <SettingsList.BadgeText>
                {appPasswords.length}
              </SettingsList.BadgeText>
            )}
          </SettingsList.LinkItem>
          <SettingsList.Divider />
          <SettingsList.Group>
            <SettingsList.ItemIcon icon={EyeSlashIcon} />
            <SettingsList.ItemText>
              <Trans>{t('logged-out-visibility')}</Trans>
            </SettingsList.ItemText>
            <PwiOptOut />
          </SettingsList.Group>
          <SettingsList.Item>
            <Admonition.Outer type="tip" style={[a.flex_1]}>
              <Admonition.Row>
                <Admonition.Icon />
                <View style={[a.flex_1, a.gap_sm]}>
                  <Admonition.Text>
                    <Trans>{t('bluesky-visibility-note')}</Trans>
                  </Admonition.Text>
                  <Admonition.Text>
                    <InlineLinkText
                      label={_(
                        msg`Learn more about what is public on Bluesky.`,
                      )}
                      to="https://blueskyweb.zendesk.com/hc/en-us/articles/15835264007693-Data-Privacy">
                      <Trans>{t('learn-more-public-content')}</Trans>
                    </InlineLinkText>
                  </Admonition.Text>
                </View>
              </Admonition.Row>
            </Admonition.Outer>
          </SettingsList.Item>
        </SettingsList.Container>
      </Layout.Content>
    </Layout.Screen>
  )
}
