import {View} from 'react-native'
import { useTranslation } from "react-i18next";

import {atoms as a, useTheme} from '#/alf'
import {H1, Text} from '#/components/Typography'

export function Shadows() {
const { t } = useTranslation("view/screens/Storybook");

  const t = useTheme()

  return (
    <View style={[a.gap_md]}>
      <H1>{t('shadows')}</H1>

      <View style={[a.flex_row, a.gap_5xl]}>
        <View
          style={[
            a.flex_1,
            a.justify_center,
            a.px_lg,
            a.py_2xl,
            t.atoms.bg,
            t.atoms.shadow_sm,
          ]}>
          <Text>{t('shadow-small')}</Text>
        </View>

        <View
          style={[
            a.flex_1,
            a.justify_center,
            a.px_lg,
            a.py_2xl,
            t.atoms.bg,
            t.atoms.shadow_md,
          ]}>
          <Text>{t('shadow-medium')}</Text>
        </View>

        <View
          style={[
            a.flex_1,
            a.justify_center,
            a.px_lg,
            a.py_2xl,
            t.atoms.bg,
            t.atoms.shadow_lg,
          ]}>
          <Text>{t('shadow-large')}</Text>
        </View>
      </View>
    </View>
  )
}
