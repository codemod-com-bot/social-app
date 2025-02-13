import React from 'react'
import {View} from 'react-native'
import { useTranslation } from "react-i18next";

import {useDialogStateControlContext} from '#/state/dialogs'
import {atoms as a} from '#/alf'
import {Button, ButtonText} from '#/components/Button'
import * as Dialog from '#/components/Dialog'
import * as Menu from '#/components/Menu'
import * as Prompt from '#/components/Prompt'
import {H3, P, Text} from '#/components/Typography'
import {PlatformInfo} from '../../../../modules/expo-bluesky-swiss-army'

export function Dialogs() {
const { t } = useTranslation("view/screens/Storybook");

  const scrollable = Dialog.useDialogControl()
  const basic = Dialog.useDialogControl()
  const prompt = Prompt.usePromptControl()
  const withMenu = Dialog.useDialogControl()
  const testDialog = Dialog.useDialogControl()
  const {closeAllDialogs} = useDialogStateControlContext()
  const unmountTestDialog = Dialog.useDialogControl()
  const [reducedMotionEnabled, setReducedMotionEnabled] =
    React.useState<boolean>()
  const [shouldRenderUnmountTest, setShouldRenderUnmountTest] =
    React.useState(false)
  const unmountTestInterval = React.useRef<number>()

  const onUnmountTestStartPressWithClose = () => {
    setShouldRenderUnmountTest(true)

    setTimeout(() => {
      unmountTestDialog.open()
    }, 1000)

    setTimeout(() => {
      unmountTestDialog.close()
    }, 4950)

    setInterval(() => {
      setShouldRenderUnmountTest(prev => !prev)
    }, 5000)
  }

  const onUnmountTestStartPressWithoutClose = () => {
    setShouldRenderUnmountTest(true)

    setTimeout(() => {
      unmountTestDialog.open()
    }, 1000)

    setInterval(() => {
      setShouldRenderUnmountTest(prev => !prev)
    }, 5000)
  }

  const onUnmountTestEndPress = () => {
    setShouldRenderUnmountTest(false)
    clearInterval(unmountTestInterval.current)
  }

  return (
    <View style={[a.gap_md]}>
      <Button
        variant="outline"
        color="secondary"
        size="small"
        onPress={() => {
          scrollable.open()
          prompt.open()
          basic.open()
          withMenu.open()
        }}
        label="Open basic dialog">
        <ButtonText>{t('open-all-dialogs')}</ButtonText>
      </Button>

      <Button
        variant="outline"
        color="secondary"
        size="small"
        onPress={() => {
          scrollable.open()
        }}
        label="Open basic dialog">
        <ButtonText>{t('open-scrollable-dialog')}</ButtonText>
      </Button>

      <Button
        variant="outline"
        color="secondary"
        size="small"
        onPress={() => {
          basic.open()
        }}
        label="Open basic dialog">
        <ButtonText>{t('open-basic-dialog')}</ButtonText>
      </Button>

      <Button
        variant="outline"
        color="primary"
        size="small"
        onPress={() => withMenu.open()}
        label="Open dialog with menu in it">
        <ButtonText>{t('open-dialog-with-menu')}</ButtonText>
      </Button>

      <Button
        variant="solid"
        color="primary"
        size="small"
        onPress={() => prompt.open()}
        label="Open prompt">
        <ButtonText>{t('open-prompt')}</ButtonText>
      </Button>

      <Button
        variant="solid"
        color="primary"
        size="small"
        onPress={testDialog.open}
        label="one">
        <ButtonText>{t('open-tester')}</ButtonText>
      </Button>

      <Button
        variant="solid"
        color="primary"
        size="small"
        onPress={onUnmountTestStartPressWithClose}
        label="two">
        <ButtonText>{t('start-unmount-test-with-close-call')}</ButtonText>
      </Button>

      <Button
        variant="solid"
        color="primary"
        size="small"
        onPress={onUnmountTestStartPressWithoutClose}
        label="two">
        <ButtonText>{t('start-unmount-test-without-close-call')}</ButtonText>
      </Button>

      <Button
        variant="solid"
        color="primary"
        size="small"
        onPress={onUnmountTestEndPress}
        label="two">
        <ButtonText>{t('end-unmount-test')}</ButtonText>
      </Button>

      <Button
        variant="solid"
        color="primary"
        size="small"
        onPress={() => {
          const isReducedMotionEnabled =
            PlatformInfo.getIsReducedMotionEnabled()
          setReducedMotionEnabled(isReducedMotionEnabled)
        }}
        label="two">
        <ButtonText>{t('is-reduced-motion-enabled')}{reducedMotionEnabled?.toString() || 'undefined'})
        </ButtonText>
      </Button>

      <Prompt.Outer control={prompt}>
        <Prompt.TitleText>{t('this-is-a-prompt')}</Prompt.TitleText>
        <Prompt.DescriptionText>{t('generic-prompt-component')}</Prompt.DescriptionText>
        <Prompt.Actions>
          <Prompt.Cancel />
          <Prompt.Action cta="Confirm" onPress={() => {}} />
        </Prompt.Actions>
      </Prompt.Outer>

      <Dialog.Outer control={basic}>
        <Dialog.Inner label="test">
          <H3 nativeID="dialog-title">{t('dialog')}</H3>
          <P nativeID="dialog-description">{t('basic-dialog')}</P>
        </Dialog.Inner>
      </Dialog.Outer>

      <Dialog.Outer control={withMenu}>
        <Dialog.Inner label="test">
          <H3 nativeID="dialog-title">{t('dialog-with-menu')}</H3>
          <Menu.Root>
            <Menu.Trigger label="Open menu">
              {({props}) => (
                <Button
                  style={a.mt_2xl}
                  label="Open menu"
                  color="primary"
                  variant="solid"
                  size="large"
                  {...props}>
                  <ButtonText>{t('open-menu')}</ButtonText>
                </Button>
              )}
            </Menu.Trigger>
            <Menu.Outer>
              <Menu.Group>
                <Menu.Item label="Item 1" onPress={() => console.log('item 1')}>
                  <Menu.ItemText>{t('item-1')}</Menu.ItemText>
                </Menu.Item>
                <Menu.Item label="Item 2" onPress={() => console.log('item 2')}>
                  <Menu.ItemText>{t('item-2')}</Menu.ItemText>
                </Menu.Item>
              </Menu.Group>
            </Menu.Outer>
          </Menu.Root>
        </Dialog.Inner>
      </Dialog.Outer>

      <Dialog.Outer control={scrollable}>
        <Dialog.ScrollableInner
          accessibilityDescribedBy="dialog-description"
          accessibilityLabelledBy="dialog-title">
          <View style={[a.relative, a.gap_md, a.w_full]}>
            <H3 nativeID="dialog-title">{t('dialog-duplicate')}</H3>
            <P nativeID="dialog-description">{t('scrollable-dialog-with-input')}</P>
            <Dialog.Input value="" onChangeText={() => {}} label={t('type-here')} />

            <Button
              variant="outline"
              color="secondary"
              size="small"
              onPress={closeAllDialogs}
              label="Close all dialogs">
              <ButtonText>{t('close-all-dialogs')}</ButtonText>
            </Button>
            <View style={{height: 1000}} />
            <View style={[a.flex_row, a.justify_end]}>
              <Button
                variant="outline"
                color="primary"
                size="small"
                onPress={() =>
                  scrollable.close(() => {
                    console.log('CLOSED')
                  })
                }
                label="Open basic dialog">
                <ButtonText>{t('close-dialog')}</ButtonText>
              </Button>
            </View>
          </View>
        </Dialog.ScrollableInner>
      </Dialog.Outer>

      <Dialog.Outer control={testDialog}>
        <Dialog.ScrollableInner
          accessibilityDescribedBy="dialog-description"
          accessibilityLabelledBy="dialog-title">
          <View style={[a.relative, a.gap_md, a.w_full]}>
            <Text>{t('dialog-edge-cases')}</Text>

            <Button
              variant="outline"
              color="primary"
              size="small"
              onPress={() => {
                testDialog.close(() => {
                  console.log('close callback')
                })
              }}
              label="Close It">
              <ButtonText>{t('normal-use-log')}</ButtonText>
            </Button>

            <Button
              variant="outline"
              color="primary"
              size="small"
              onPress={() => {
                testDialog.close(() => {
                  console.log('close callback')
                })

                setTimeout(() => {
                  testDialog.open()
                }, 100)
              }}
              label="Close It">
              <ButtonText>{t('calls-open-in-100ms')}</ButtonText>
            </Button>

            <Button
              variant="outline"
              color="primary"
              size="small"
              onPress={() => {
                setTimeout(() => {
                  testDialog.open()
                }, 2e3)

                testDialog.close(() => {
                  console.log('close callback')
                })
              }}
              label="Close It">
              <ButtonText>{t('calls-open-in-2000ms')}</ButtonText>
            </Button>

            <Button
              variant="outline"
              color="primary"
              size="small"
              onPress={() => {
                testDialog.close(() => {
                  console.log('close callback')
                })
                setTimeout(() => {
                  testDialog.close(() => {
                    console.log('close callback after 100ms')
                  })
                }, 100)
              }}
              label="Close It">
              <ButtonText>{t('calls-close-twice')}</ButtonText>
            </Button>

            <Button
              variant="outline"
              color="primary"
              size="small"
              onPress={() => {
                testDialog.close(() => {
                  console.log('close callback')
                })
                testDialog.close(() => {
                  console.log('close callback 2')
                })
              }}
              label="Close It">
              <ButtonText>{t('call-close-twice-immediately')}</ButtonText>
            </Button>

            <Button
              variant="outline"
              color="primary"
              size="small"
              onPress={() => {
                console.log('Step 1')
                testDialog.close(() => {
                  console.log('Step 3')
                })
                console.log('Step 2')
              }}
              label="Close It">
              <ButtonText>{t('log-order-close-callback')}</ButtonText>
            </Button>
          </View>
        </Dialog.ScrollableInner>
      </Dialog.Outer>

      {shouldRenderUnmountTest && (
        <Dialog.Outer control={unmountTestDialog}>
          <Dialog.Inner label="test">
            <H3 nativeID="dialog-title">{t('unmount-test-dialog')}</H3>
            <P nativeID="dialog-description">{t('will-unmount-in-5-seconds')}</P>
          </Dialog.Inner>
        </Dialog.Outer>
      )}
    </View>
  )
}
