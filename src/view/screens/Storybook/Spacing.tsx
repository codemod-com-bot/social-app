import {View} from 'react-native'
import { useTranslation } from "react-i18next";

import {atoms as a, useTheme} from '#/alf'
import {H1, Text} from '#/components/Typography'

export function Spacing() {
const { t } = useTranslation("view/screens/Storybook");

  const t = useTheme()
  return (
    <View style={[a.gap_md]}>
      <H1>{t('spacing')}</H1>

      <View style={[a.flex_row, a.align_center]}>
        <Text style={{width: 80}}>{t('spacing-2xs')}</Text>
        <View style={[a.flex_1, a.pt_2xs, t.atoms.bg_contrast_300]} />
      </View>

      <View style={[a.flex_row, a.align_center]}>
        <Text style={{width: 80}}>{t('spacing-xs')}</Text>
        <View style={[a.flex_1, a.pt_xs, t.atoms.bg_contrast_300]} />
      </View>

      <View style={[a.flex_row, a.align_center]}>
        <Text style={{width: 80}}>{t('spacing-sm')}</Text>
        <View style={[a.flex_1, a.pt_sm, t.atoms.bg_contrast_300]} />
      </View>

      <View style={[a.flex_row, a.align_center]}>
        <Text style={{width: 80}}>{t('spacing-md')}</Text>
        <View style={[a.flex_1, a.pt_md, t.atoms.bg_contrast_300]} />
      </View>

      <View style={[a.flex_row, a.align_center]}>
        <Text style={{width: 80}}>{t('spacing-lg')}</Text>
        <View style={[a.flex_1, a.pt_lg, t.atoms.bg_contrast_300]} />
      </View>

      <View style={[a.flex_row, a.align_center]}>
        <Text style={{width: 80}}>{t('spacing-xl')}</Text>
        <View style={[a.flex_1, a.pt_xl, t.atoms.bg_contrast_300]} />
      </View>

      <View style={[a.flex_row, a.align_center]}>
        <Text style={{width: 80}}>{t('spacing-2xl')}</Text>
        <View style={[a.flex_1, a.pt_2xl, t.atoms.bg_contrast_300]} />
      </View>

      <View style={[a.flex_row, a.align_center]}>
        <Text style={{width: 80}}>{t('spacing-3xl')}</Text>
        <View style={[a.flex_1, a.pt_3xl, t.atoms.bg_contrast_300]} />
      </View>

      <View style={[a.flex_row, a.align_center]}>
        <Text style={{width: 80}}>{t('spacing-4xl')}</Text>
        <View style={[a.flex_1, a.pt_4xl, t.atoms.bg_contrast_300]} />
      </View>

      <View style={[a.flex_row, a.align_center]}>
        <Text style={{width: 80}}>{t('spacing-5xl')}</Text>
        <View style={[a.flex_1, a.pt_5xl, t.atoms.bg_contrast_300]} />
      </View>
    </View>
  )
}
