import {View} from 'react-native'
import { useTranslation } from "react-i18next";

import {atoms as a, useBreakpoints, useTheme} from '#/alf'
import {H3, Text} from '#/components/Typography'

export function Breakpoints() {
const { t } = useTranslation("view/screens/Storybook");

  const t = useTheme()
  const breakpoints = useBreakpoints()

  return (
    <View>
      <H3 style={[a.pb_md]}>{t('breakpoint-debugger-title')}</H3>
      <Text style={[a.pb_md]}>{t('current-breakpoint-label')}{!breakpoints.gtMobile && <Text>{t('mobile-device')}</Text>}
        {breakpoints.gtMobile && !breakpoints.gtTablet && <Text>{t('tablet-device')}</Text>}
        {breakpoints.gtTablet && <Text>{t('desktop-device')}</Text>}
      </Text>
      <Text
        style={[a.p_md, t.atoms.bg_contrast_100, {fontFamily: 'monospace'}]}>
        {JSON.stringify(breakpoints, null, 2)}
      </Text>
    </View>
  )
}
