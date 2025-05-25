import { Suspense } from 'react'
import { StatusBar } from 'expo-status-bar'
import { SQLiteProvider } from 'expo-sqlite'

import { Home } from '@/app/home'
import { Loading } from '@/components/loading'

import { databaseInit } from '@/database'

export default function App() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <SQLiteProvider
          databaseName="myapp.db"
          onInit={databaseInit}
          useSuspense
        >
          <Home />
        </SQLiteProvider>
      </Suspense>

      <StatusBar style="auto" />
    </>
  )
}
