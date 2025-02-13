import React from 'react'
import {ScrollView, View} from 'react-native'
import {msg} from '@lingui/macro'
import {useLingui} from '@lingui/react'
import { useTranslation } from "react-i18next";

import {usePalette} from '#/lib/hooks/usePalette'
import {CommonNavigatorParams, NativeStackScreenProps} from '#/lib/routes/types'
import {s} from '#/lib/styles'
import {PaletteColorName, ThemeProvider} from '#/lib/ThemeContext'
import {EmptyState} from '#/view/com/util/EmptyState'
import {ErrorMessage} from '#/view/com/util/error/ErrorMessage'
import {ErrorScreen} from '#/view/com/util/error/ErrorScreen'
import {Button} from '#/view/com/util/forms/Button'
import {
  DropdownButton,
  DropdownItem,
} from '#/view/com/util/forms/DropdownButton'
import {ToggleButton} from '#/view/com/util/forms/ToggleButton'
import * as LoadingPlaceholder from '#/view/com/util/LoadingPlaceholder'
import {Text} from '#/view/com/util/text/Text'
import * as Toast from '#/view/com/util/Toast'
import {ViewHeader} from '#/view/com/util/ViewHeader'
import {ViewSelector} from '#/view/com/util/ViewSelector'
import * as Layout from '#/components/Layout'

const MAIN_VIEWS = ['Base', 'Controls', 'Error', 'Notifs']

export const DebugScreen = ({}: NativeStackScreenProps<
  CommonNavigatorParams,
  'Debug'
>) => {
  const [colorScheme, setColorScheme] = React.useState<'light' | 'dark'>(
    'light',
  )
  const onToggleColorScheme = () => {
    setColorScheme(colorScheme === 'light' ? 'dark' : 'light')
  }
  return (
    <ThemeProvider theme={colorScheme}>
      <Layout.Screen>
        <DebugInner
          colorScheme={colorScheme}
          onToggleColorScheme={onToggleColorScheme}
        />
      </Layout.Screen>
    </ThemeProvider>
  )
}

function DebugInner({
  colorScheme,
  onToggleColorScheme,
}: {
  colorScheme: 'light' | 'dark'
  onToggleColorScheme: () => void
}) {
  const [currentView, setCurrentView] = React.useState<number>(0)
  const pal = usePalette('default')
  const {_} = useLingui()

  const renderItem = (item: any) => {
    return (
      <View key={`view-${item.currentView}`}>
        <View style={[s.pt10, s.pl10, s.pr10]}>
          <ToggleButton
            type="default-light"
            onPress={onToggleColorScheme}
            isSelected={colorScheme === 'dark'}
            label={_(msg`Dark mode`)}
          />
        </View>
        {item.currentView === 3 ? (
          <NotifsView />
        ) : item.currentView === 2 ? (
          <ErrorView />
        ) : item.currentView === 1 ? (
          <ControlsView />
        ) : (
          <BaseView />
        )}
      </View>
    )
  }

  const items = [{currentView}]

  return (
    <View style={[s.hContentRegion, pal.view]}>
      <ViewHeader title={_(msg`Debug panel`)} />
      <ViewSelector
        swipeEnabled
        sections={MAIN_VIEWS}
        items={items}
        renderItem={renderItem}
        onSelectView={setCurrentView}
      />
    </View>
  )
}

function Heading({label}: {label: string}) {
  const pal = usePalette('default')
  return (
    <View style={[s.pt10, s.pb5]}>
      <Text type="title-lg" style={pal.text}>
        {label}
      </Text>
    </View>
  )
}

function BaseView() {
const { t } = useTranslation("view/screens");

  return (
    <View style={[s.pl10, s.pr10]}>
      <Heading label={t('typography')} />
      <TypographyView />
      <Heading label={t('palettes')} />
      <PaletteView palette="default" />
      <PaletteView palette="primary" />
      <PaletteView palette="secondary" />
      <PaletteView palette="inverted" />
      <PaletteView palette="error" />
      <Heading label={t('empty-state')} />
      <EmptyStateView />
      <Heading label={t('loading-placeholders')} />
      <LoadingPlaceholderView />
      <View style={s.footerSpacer} />
    </View>
  )
}

function ControlsView() {
const { t } = useTranslation("view/screens");

  return (
    <ScrollView style={[s.pl10, s.pr10]}>
      <Heading label={t('buttons')} />
      <ButtonsView />
      <Heading label={t('dropdown-buttons')} />
      <DropdownButtonsView />
      <Heading label={t('toggle-buttons')} />
      <ToggleButtonsView />
      <View style={s.footerSpacer} />
    </ScrollView>
  )
}

function ErrorView() {
const { t } = useTranslation("view/screens");

  return (
    <View style={s.p10}>
      <View style={s.mb5}>
        <ErrorScreen
          title={t('error-screen')}
          message="A major error occurred that led the entire screen to fail"
          details="Here are some details"
          onPressTryAgain={() => {}}
        />
      </View>
      <View style={s.mb5}>
        <ErrorMessage message="This is an error that occurred while things were being done" />
      </View>
      <View style={s.mb5}>
        <ErrorMessage
          message="This is an error that occurred while things were being done"
          numberOfLines={1}
        />
      </View>
      <View style={s.mb5}>
        <ErrorMessage
          message="This is an error that occurred while things were being done"
          onPressTryAgain={() => {}}
        />
      </View>
      <View style={s.mb5}>
        <ErrorMessage
          message="This is an error that occurred while things were being done"
          onPressTryAgain={() => {}}
          numberOfLines={1}
        />
      </View>
    </View>
  )
}

function NotifsView() {
const { t } = useTranslation("view/screens");

  const triggerPush = () => {
    // TODO: implement local notification for testing
  }
  const triggerToast = () => {
    Toast.show('The task has been completed')
  }
  const triggerToast2 = () => {
    Toast.show('The task has been completed successfully and with no problems')
  }
  return (
    <View style={s.p10}>
      <View style={s.flexRow}>
        <Button onPress={triggerPush} label={t('trigger-push')} />
        <Button onPress={triggerToast} label={t('trigger-toast')} />
        <Button onPress={triggerToast2} label={t('trigger-toast-2')} />
      </View>
    </View>
  )
}

function PaletteView({palette}: {palette: PaletteColorName}) {
const { t } = useTranslation("view/screens");

  const defaultPal = usePalette('default')
  const pal = usePalette(palette)
  return (
    <View style={[pal.view, pal.border, s.p10, s.mb5, s.border1]}>
      <Text style={[pal.text]}>{t('palette-colors', { palette })}</Text>
      <Text style={[pal.textLight]}>{t('light-text')}</Text>
      <Text style={[pal.link]}>{t('link-text')}</Text>
      {palette !== 'default' && (
        <View style={[defaultPal.view]}>
          <Text style={[pal.textInverted]}>{t('inverted-text')}</Text>
        </View>
      )}
    </View>
  )
}

function TypographyView() {
const { t } = useTranslation("view/screens");

  const pal = usePalette('default')
  return (
    <View style={[pal.view]}>
      <Text type="2xl-thin" style={[pal.text]}>{t('text-2xl-thin')}</Text>
      <Text type="2xl" style={[pal.text]}>{t('text-2xl')}</Text>
      <Text type="2xl-medium" style={[pal.text]}>{t('text-2xl-medium')}</Text>
      <Text type="2xl-bold" style={[pal.text]}>{t('text-2xl-bold')}</Text>
      <Text type="2xl-heavy" style={[pal.text]}>{t('text-2xl-heavy')}</Text>
      <Text type="xl-thin" style={[pal.text]}>{t('text-xl-thin')}</Text>
      <Text type="xl" style={[pal.text]}>{t('text-xl')}</Text>
      <Text type="xl-medium" style={[pal.text]}>{t('text-xl-medium')}</Text>
      <Text type="xl-bold" style={[pal.text]}>{t('text-xl-bold')}</Text>
      <Text type="xl-heavy" style={[pal.text]}>{t('text-xl-heavy')}</Text>
      <Text type="lg-thin" style={[pal.text]}>{t('text-lg-thin')}</Text>
      <Text type="lg" style={[pal.text]}>{t('text-lg')}</Text>
      <Text type="lg-medium" style={[pal.text]}>{t('text-lg-medium')}</Text>
      <Text type="lg-bold" style={[pal.text]}>{t('text-lg-bold')}</Text>
      <Text type="lg-heavy" style={[pal.text]}>{t('text-lg-heavy')}</Text>
      <Text type="md-thin" style={[pal.text]}>{t('text-md-thin')}</Text>
      <Text type="md" style={[pal.text]}>{t('text-md')}</Text>
      <Text type="md-medium" style={[pal.text]}>{t('text-md-medium')}</Text>
      <Text type="md-bold" style={[pal.text]}>{t('text-md-bold')}</Text>
      <Text type="md-heavy" style={[pal.text]}>{t('text-md-heavy')}</Text>
      <Text type="sm-thin" style={[pal.text]}>{t('text-sm-thin')}</Text>
      <Text type="sm" style={[pal.text]}>{t('text-sm')}</Text>
      <Text type="sm-medium" style={[pal.text]}>{t('text-sm-medium')}</Text>
      <Text type="sm-bold" style={[pal.text]}>{t('text-sm-bold')}</Text>
      <Text type="sm-heavy" style={[pal.text]}>{t('text-sm-heavy')}</Text>
      <Text type="xs-thin" style={[pal.text]}>{t('text-xs-thin')}</Text>
      <Text type="xs" style={[pal.text]}>{t('text-xs')}</Text>
      <Text type="xs-medium" style={[pal.text]}>{t('text-xs-medium')}</Text>
      <Text type="xs-bold" style={[pal.text]}>{t('text-xs-bold')}</Text>
      <Text type="xs-heavy" style={[pal.text]}>{t('text-xs-heavy')}</Text>

      <Text type="title-2xl" style={[pal.text]}>{t('title-2xl')}</Text>
      <Text type="title-xl" style={[pal.text]}>{t('title-xl')}</Text>
      <Text type="title-lg" style={[pal.text]}>{t('title-lg')}</Text>
      <Text type="title" style={[pal.text]}>{t('title')}</Text>
      <Text type="button" style={[pal.text]}>{t('button')}</Text>
      <Text type="button-lg" style={[pal.text]}>
        Button-lg
      </Text>
    </View>
  )
}

function EmptyStateView() {
  return <EmptyState icon="bars" message="This is an empty state" />
}

function LoadingPlaceholderView() {
  return (
    <>
      <LoadingPlaceholder.PostLoadingPlaceholder />
      <LoadingPlaceholder.NotificationLoadingPlaceholder />
    </>
  )
}

function ButtonsView() {
const { t } = useTranslation("view/screens");

  const defaultPal = usePalette('default')
  const buttonStyles = {marginRight: 5}
  return (
    <View style={[defaultPal.view]}>
      <View style={[s.flexRow, s.mb5]}>
        <Button type="primary" label={t('primary-solid')} style={buttonStyles} />
        <Button type="secondary" label={t('secondary-solid')} style={buttonStyles} />
      </View>
      <View style={[s.flexRow, s.mb5]}>
        <Button type="default" label={t('default-solid')} style={buttonStyles} />
        <Button type="inverted" label={t('inverted-solid')} style={buttonStyles} />
      </View>
      <View style={s.flexRow}>
        <Button
          type="primary-outline"
          label={t('primary-outline')}
          style={buttonStyles}
        />
        <Button
          type="secondary-outline"
          label={t('secondary-outline')}
          style={buttonStyles}
        />
      </View>
      <View style={s.flexRow}>
        <Button
          type="primary-light"
          label={t('primary-light')}
          style={buttonStyles}
        />
        <Button
          type="secondary-light"
          label={t('secondary-light')}
          style={buttonStyles}
        />
      </View>
      <View style={s.flexRow}>
        <Button
          type="default-light"
          label={t('default-light')}
          style={buttonStyles}
        />
      </View>
    </View>
  )
}

const DROPDOWN_ITEMS: DropdownItem[] = [
  {
    icon: ['far', 'paste'],
    label: 'Copy post text',
    onPress() {},
  },
  {
    icon: 'share',
    label: 'Share...',
    onPress() {},
  },
  {
    icon: 'circle-exclamation',
    label: 'Report post',
    onPress() {},
  },
]
function DropdownButtonsView() {
const { t } = useTranslation("view/screens");

  const defaultPal = usePalette('default')
  return (
    <View style={[defaultPal.view]}>
      <View style={s.mb5}>
        <DropdownButton
          type="primary"
          items={DROPDOWN_ITEMS}
          menuWidth={200}
          label={t('primary-button')}
        />
      </View>
      <View style={s.mb5}>
        <DropdownButton type="bare" items={DROPDOWN_ITEMS} menuWidth={200}>
          <Text>{t('bare-button')}</Text>
        </DropdownButton>
      </View>
    </View>
  )
}

function ToggleButtonsView() {
const { t } = useTranslation("view/screens");

  const defaultPal = usePalette('default')
  const buttonStyles = s.mb5
  const [isSelected, setIsSelected] = React.useState(false)
  const onToggle = () => setIsSelected(!isSelected)
  return (
    <View style={[defaultPal.view]}>
      <ToggleButton
        type="primary"
        label={t('primary-solid-duplicate')}
        style={buttonStyles}
        isSelected={isSelected}
        onPress={onToggle}
      />
      <ToggleButton
        type="secondary"
        label={t('secondary-solid-duplicate')}
        style={buttonStyles}
        isSelected={isSelected}
        onPress={onToggle}
      />
      <ToggleButton
        type="inverted"
        label={t('inverted-solid-duplicate')}
        style={buttonStyles}
        isSelected={isSelected}
        onPress={onToggle}
      />
      <ToggleButton
        type="primary-outline"
        label={t('primary-outline-duplicate')}
        style={buttonStyles}
        isSelected={isSelected}
        onPress={onToggle}
      />
      <ToggleButton
        type="secondary-outline"
        label={t('secondary-outline-duplicate')}
        style={buttonStyles}
        isSelected={isSelected}
        onPress={onToggle}
      />
      <ToggleButton
        type="primary-light"
        label={t('primary-light-duplicate')}
        style={buttonStyles}
        isSelected={isSelected}
        onPress={onToggle}
      />
      <ToggleButton
        type="secondary-light"
        label={t('secondary-light-duplicate')}
        style={buttonStyles}
        isSelected={isSelected}
        onPress={onToggle}
      />
      <ToggleButton
        type="default-light"
        label={t('default-light-duplicate')}
        style={buttonStyles}
        isSelected={isSelected}
        onPress={onToggle}
      />
    </View>
  )
}
