import TitleBar from '@renderer/components/TitleBar/TitleBar'
import Sidebar from '@renderer/components/SideBar/Sidebar'
import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import {
  AboutContainer,
  AboutContent,
  SectionTitle,
  SettingsSection,
  FormGroup,
  Label,
  Input,
  ButtonContainer,
  Button,
  SuccessMessage,
  ErrorMessage,
  InfoText
} from './AboutElement'
import { theme } from '@renderer/styles/theme'
const About: React.FC = () => {
  const [apiKey, setApiKey] = useState('')
  const [savedApiKey, setSavedApiKey] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  useEffect(() => {
    loadApiKey()
  }, [])

  const loadApiKey = async (): Promise<void> => {
    try {
      const key = await window.api.db.getYoutubeApiKey()
      if (key) {
        setApiKey(key)
        setSavedApiKey(key)
      }
    } catch (err) {
      console.error('Error loading API key:', err)
    }
  }

  const handleSaveApiKey = async (): Promise<void> => {
    if (!apiKey.trim()) {
      setMessage({ type: 'error', text: 'API key cannot be empty' })
      return
    }

    try {
      setLoading(true)
      await window.api.db.setYoutubeApiKey(apiKey)
      setSavedApiKey(apiKey)
      setMessage({ type: 'success', text: 'YouTube API key saved successfully!' })
      setTimeout(() => setMessage(null), 3000)
    } catch (err) {
      console.error('Error saving API key:', err)
      setMessage({ type: 'error', text: 'Failed to save API key' })
    } finally {
      setLoading(false)
    }
  }

  const handleReset = (): void => {
    setApiKey(savedApiKey)
    setMessage(null)
  }

  return (
    <>
      <TitleBar />
      <AboutContainer>
        <Sidebar />
        <AboutContent>
          <div>
            <SectionTitle>Settings</SectionTitle>
          </div>

          <SettingsSection
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={theme.spring.soft}
          >
            <SectionTitle style={{ fontSize: '1.3rem', marginBottom: '24px' }}>
              YouTube API Configuration
            </SectionTitle>

            <AnimatePresence>
              {message &&
                (message.type === 'success' ? (
                  <SuccessMessage
                    key="success"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                  >
                    {message.text}
                  </SuccessMessage>
                ) : (
                  <ErrorMessage
                    key="error"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                  >
                    {message.text}
                  </ErrorMessage>
                ))}
            </AnimatePresence>

            <FormGroup>
              <Label htmlFor="api-key">YouTube Data API Key</Label>
              <Input
                id="api-key"
                type="password"
                placeholder="Enter your YouTube API key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                disabled={loading}
              />
              <InfoText>
                Enter your YouTube Data API v3 key here. This key is required to search for songs.
              </InfoText>
            </FormGroup>

            <ButtonContainer>
              <Button
                variant="secondary"
                onClick={handleReset}
                disabled={loading || apiKey === savedApiKey}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={theme.spring.snappy}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSaveApiKey}
                disabled={loading || apiKey === savedApiKey}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={theme.spring.snappy}
              >
                {loading ? 'Saving...' : 'Save API Key'}
              </Button>
            </ButtonContainer>
          </SettingsSection>
        </AboutContent>
      </AboutContainer>
    </>
  )
}

export default About
