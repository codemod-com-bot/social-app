import {View} from 'react-native'
import { useTranslation } from "react-i18next";

import * as Toast from '#/view/com/util/Toast'
import * as SettingsList from '#/screens/Settings/components/SettingsList'
import {atoms as a, useTheme} from '#/alf'
import {Alien_Stroke2_Corner0_Rounded as AlienIcon} from '#/components/icons/Alien'
import {BirthdayCake_Stroke2_Corner2_Rounded as BirthdayCakeIcon} from '#/components/icons/BirthdayCake'
import {BubbleInfo_Stroke2_Corner2_Rounded as BubbleInfoIcon} from '#/components/icons/BubbleInfo'
import {CircleQuestion_Stroke2_Corner2_Rounded as CircleQuestionIcon} from '#/components/icons/CircleQuestion'
import {Envelope_Stroke2_Corner2_Rounded as EnvelopeIcon} from '#/components/icons/Envelope'
import {Explosion_Stroke2_Corner0_Rounded as ExplosionIcon} from '#/components/icons/Explosion'
import {Earth_Stroke2_Corner2_Rounded as EarthIcon} from '#/components/icons/Globe'
import {PaintRoller_Stroke2_Corner2_Rounded as PaintRollerIcon} from '#/components/icons/PaintRoller'
import {Person_Stroke2_Corner2_Rounded as PersonIcon} from '#/components/icons/Person'
import {Pizza_Stroke2_Corner0_Rounded as PizzaIcon} from '#/components/icons/Pizza'
import {RaisingHand4Finger_Stroke2_Corner2_Rounded as HandIcon} from '#/components/icons/RaisingHand'
import {Verified_Stroke2_Corner2_Rounded as VerifiedIcon} from '#/components/icons/Verified'
import {Window_Stroke2_Corner2_Rounded as WindowIcon} from '#/components/icons/Window'
import {Text} from '#/components/Typography'

export function Settings() {
const { t } = useTranslation("view/screens/Storybook");

  const t = useTheme()
  return (
    <View style={{marginLeft: -20, marginRight: -20}}>
      <Text style={{marginLeft: 20, paddingBottom: 12}}>{t('settings')}</Text>
      <SettingsList.LinkItem to="/settings" label="Account">
        <SettingsList.ItemIcon icon={PersonIcon} />
        <SettingsList.ItemText>{t('account')}</SettingsList.ItemText>
      </SettingsList.LinkItem>
      <SettingsList.LinkItem to="/settings" label="Privacy and security">
        <SettingsList.ItemIcon icon={PaintRollerIcon} />
        <SettingsList.ItemText>{t('privacy-and-security')}</SettingsList.ItemText>
      </SettingsList.LinkItem>
      <SettingsList.LinkItem to="/settings" label="Moderation">
        <SettingsList.ItemIcon icon={HandIcon} />
        <SettingsList.ItemText>{t('moderation')}</SettingsList.ItemText>
      </SettingsList.LinkItem>
      <SettingsList.LinkItem to="/settings" label="Content and media">
        <SettingsList.ItemIcon icon={WindowIcon} />
        <SettingsList.ItemText>{t('content-and-media')}</SettingsList.ItemText>
      </SettingsList.LinkItem>
      <SettingsList.LinkItem
        to="/settings"
        label="Accessibility and appearance">
        <SettingsList.ItemIcon icon={PaintRollerIcon} />
        <SettingsList.ItemText>{t('accessibility-and-appearance')}</SettingsList.ItemText>
      </SettingsList.LinkItem>
      <SettingsList.LinkItem to="/settings" label="Languages">
        <SettingsList.ItemIcon icon={EarthIcon} />
        <SettingsList.ItemText>{t('languages')}</SettingsList.ItemText>
      </SettingsList.LinkItem>
      <SettingsList.LinkItem to="/settings" label="Help">
        <SettingsList.ItemIcon icon={CircleQuestionIcon} />
        <SettingsList.ItemText>{t('help')}</SettingsList.ItemText>
      </SettingsList.LinkItem>
      <SettingsList.LinkItem to="/settings" label="About">
        <SettingsList.ItemIcon icon={BubbleInfoIcon} />
        <SettingsList.ItemText>{t('about')}</SettingsList.ItemText>
      </SettingsList.LinkItem>
      <SettingsList.Divider />
      <SettingsList.PressableItem
        destructive
        onPress={() => Toast.show('Sign out pressed')}
        label="Sign out">
        <SettingsList.ItemText>{t('sign-out')}</SettingsList.ItemText>
      </SettingsList.PressableItem>
      <SettingsList.Item style={[a.mt_xl]}>
        <SettingsList.ItemIcon icon={PizzaIcon} />
        <SettingsList.ItemText>{t('not-pressable')}</SettingsList.ItemText>
      </SettingsList.Item>
      <SettingsList.PressableItem
        onPress={() => Toast.show('Pressable pressed')}
        label="Pressable">
        <SettingsList.ItemIcon icon={AlienIcon} />
        <SettingsList.ItemText>{t('pressable')}</SettingsList.ItemText>
      </SettingsList.PressableItem>
      <SettingsList.LinkItem
        to="/settings"
        label="Destructive link"
        destructive>
        <SettingsList.ItemIcon icon={ExplosionIcon} />
        <SettingsList.ItemText>{t('destructive-link')}</SettingsList.ItemText>
      </SettingsList.LinkItem>
      <SettingsList.PressableItem
        label="Email"
        onPress={() => Toast.show('Email change dialog goes here')}>
        <SettingsList.ItemIcon icon={EnvelopeIcon} />
        <SettingsList.ItemText>{t('email')}</SettingsList.ItemText>
        <SettingsList.BadgeText>{t('email-address')}</SettingsList.BadgeText>
      </SettingsList.PressableItem>
      <SettingsList.PressableItem
        onPress={() => Toast.show('Pressable pressed')}
        label="Protect your account"
        style={[
          a.my_sm,
          a.mx_lg,
          a.rounded_md,
          {backgroundColor: t.palette.primary_50},
        ]}
        hoverStyle={[{backgroundColor: t.palette.primary_100}]}
        contentContainerStyle={[a.rounded_md, a.px_lg]}>
        <SettingsList.ItemIcon
          icon={VerifiedIcon}
          color={t.palette.primary_500}
        />
        <SettingsList.ItemText
          style={[{color: t.palette.primary_500}, a.font_bold]}>{t('protect-your-account')}</SettingsList.ItemText>
        <SettingsList.Chevron color={t.palette.primary_500} />
      </SettingsList.PressableItem>
      <SettingsList.Divider />
      <SettingsList.Item>
        <SettingsList.ItemIcon icon={BirthdayCakeIcon} />
        <SettingsList.ItemText>{t('birthday')}</SettingsList.ItemText>
        <SettingsList.BadgeButton
          label={t('edit')}
          onPress={() => Toast.show('Show edit birthday dialog')}
        />
      </SettingsList.Item>
      <SettingsList.LinkItem to="/settings" label="Long test">
        <SettingsList.ItemIcon icon={ExplosionIcon} />
        <SettingsList.ItemText>{t('long-text-placeholder')}</SettingsList.ItemText>
      </SettingsList.LinkItem>
    </View>
  )
}
