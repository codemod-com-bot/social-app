import {View} from 'react-native'
import { Trans,useTranslation } from "react-i18next";

import {atoms as a} from '#/alf'
import {Admonition} from '#/components/Admonition'
import {InlineLinkText} from '#/components/Link'
import {H1} from '#/components/Typography'

export function Admonitions() {
const { t } = useTranslation("view/screens/Storybook");

  return (
    <View style={[a.gap_md]}>
      <H1>{t('admonitions-title')}</H1>

      <Admonition>{t('quick-brown-fox')}</Admonition>
      <Admonition type="info"><Trans
i18nKey="blameless-vestals-lot"
components={{"0": <InlineLinkText
          label="test"
          to="https://letterboxd.com/film/eternal-sunshine-of-the-spotless-mind/" />}}
/>
        </Admonition>
      <Admonition type="tip">{t('quick-brown-fox-repeated-1')}</Admonition>
      <Admonition type="warning">{t('quick-brown-fox-repeated-2')}</Admonition>
      <Admonition type="error">{t('quick-brown-fox-repeated-3')}</Admonition>
    </View>
  )
}
