import React from 'react';
import loadable from '@loadable/component';

import Loading from './Loading'
const OtherComponent = loadable(() => import('./OtherComponent'))
const AnotherComponent = loadable(() => import('./OtherComponent'), {
    fallback: <Loading/>
})

export default function LoadableDemo () {
    return (
        <div>
            loadableDemo
            <OtherComponent/>
            <AnotherComponent/>
        </div>
    )
}