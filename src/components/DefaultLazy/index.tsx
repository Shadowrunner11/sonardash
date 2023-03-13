import React, { PropsWithChildren, Suspense } from 'react'
import { Loading } from 'react-admin'

export const DefaultLazy = (props: PropsWithChildren) => <Suspense fallback={<Loading />}>{props.children}</Suspense>
