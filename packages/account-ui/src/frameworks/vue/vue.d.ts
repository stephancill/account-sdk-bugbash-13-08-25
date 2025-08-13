declare module '*.vue' {
  import { DefineComponent } from 'vue';
  const component: DefineComponent<Record<string, unknown>, Record<string, unknown>, unknown>;
  export default component;
}

declare module './SignInWithBaseButton.vue' {
  import { DefineComponent } from 'vue';
  import { SignInWithBaseButtonProps } from '../../types.js';
  const component: DefineComponent<SignInWithBaseButtonProps>;
  export default component;
}

declare module './BasePayButton.vue' {
  import { DefineComponent } from 'vue';
  import { BasePayButtonProps } from '../../types.js';
  const component: DefineComponent<BasePayButtonProps>;
  export default component;
}
