declare module '*.svelte' {
  import { SvelteComponent } from 'svelte';
  const component: typeof SvelteComponent;
  export default component;
}

declare module './SignInWithBaseButton.svelte' {
  import { SvelteComponent } from 'svelte';
  import { SignInWithBaseButtonProps } from '../../types.js';

  export default class SignInWithBaseButton extends SvelteComponent<SignInWithBaseButtonProps> {}
}

declare module './BasePayButton.svelte' {
  import { SvelteComponent } from 'svelte';
  import { BasePayButtonProps } from '../../types.js';

  export default class BasePayButton extends SvelteComponent<BasePayButtonProps> {}
}
