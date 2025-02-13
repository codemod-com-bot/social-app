import {View} from 'react-native'
import {Trans} from '@lingui/macro'
import { useTranslation } from "react-i18next";

import {usePalette} from '#/lib/hooks/usePalette'
import {InfoCircleIcon} from '#/lib/icons'
import {TextLink} from '../util/Link'
import {Text} from '../util/text/Text'

export function DiscoverFallbackHeader() {
const { t } = useTranslation("view/com/posts");

  const pal = usePalette('default')
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 12,
          paddingHorizontal: 12,
          borderTopWidth: 1,
        },
        pal.border,
        pal.viewLight,
      ]}>
      <View style={{width: 68, paddingLeft: 12}}>
        <InfoCircleIcon size={36} style={pal.textLight} strokeWidth={1.5} />
      </View>
      <View style={{flex: 1}}>
        <Text type="md" style={pal.text}>
          <Trans>{t('ran-out-of-posts')}
            <TextLink
              type="md-medium"
              href="/profile/bsky.app/feed/whats-hot"
              text={t('discover-button')}
              style={pal.link}
            />
            .
          </Trans>
        </Text>
      </View>
    </View>
  )
}
