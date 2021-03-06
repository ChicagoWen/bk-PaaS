/**
 * @file loading instance
 *
 * Copyright © 2012-2019 Tencent BlueKing. All Rights Reserved. 蓝鲸智云 版权所有
 */

import Vue from 'vue'
import { isVNode } from '../utils/dom'
import LoadingView from './loading.vue'

const LoadingConstructor = Vue.extend(LoadingView)

let instance

const Loading = function (options = {}) {
    if (typeof options === 'string') {
        options = {
            title: options
        }
    }

    options.opacity = options.opacity || 0.9
    options.color = options.color || '#ffffff'
    instance = new LoadingConstructor({
        data: options
    })

    if (isVNode(instance.title)) {
        instance.$slots.default = [instance.title]
        instance.title = null
    } else {
        delete instance.$slots.default
    }

    instance.viewmodel = instance.$mount()
    document.body.appendChild(instance.viewmodel.$el)
    instance.$dom = instance.viewmodel.$el
    instance.viewmodel.isShow = true

    return instance.viewmodel
}

Loading.hide = function () {
    instance.viewmodel.hide = true
}

Vue.prototype.$bkLoading = Loading

export default Loading
