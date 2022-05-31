import sanityClient from '@sanity/client'

export const client = sanityClient({
  projectId: 'b8z868lv',
  dataset: 'production',
  apiVersion: 'v1',
  token:
    'skIOXInRh1KSEvIX70IZoKNcfkmdURofZow84P7RNW7IAFshxjsTJ8NXA5nhIMPw2QmHSu4wEOMBC0yrJwWAVgPMhYw8MqRFXcz9EcPL7xdA3trWcVAtZfpPhDWccWJzFsYLdjNdbKBsR2aTZLo9nXaUINzYmyGB8dags0VaZ3UHfXFxIkDZ',
  useCdn: false,
})
