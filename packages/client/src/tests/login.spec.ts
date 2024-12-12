import { mount, type VueWrapper } from '@vue/test-utils';
import Login from '../components/Login.vue';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import router from '../router.ts';

interface IData {
  email: string;
  password: string;
}

interface ILoginState {
  componentState: IData;
}

type LoginInstanceWrapper = VueWrapper<InstanceType<typeof Login>>;

describe('Login.vue', () => {
  let wrapper: LoginInstanceWrapper;

  beforeEach(() => {
    wrapper = mount(Login, {
      global: {
        plugins: [router]
      }});
  });

  afterEach(() => {
    wrapper?.unmount();
  });

  it('renders login form', () => {
    expect(wrapper.find('form').exists()).toBeTruthy();
    expect(wrapper.find('input[name="email"]').exists()).toBeTruthy();
    expect(wrapper.find('input[name="password"]').exists()).toBeTruthy();
    expect(wrapper.find('button[type="submit"]').exists()).toBeTruthy();
  })

  /*it('validates empty form submission', async () => {
    await wrapper.find('form').trigger('submit.prevent');
    expect(wrapper.text()).toContain('This field is required');
  })*/

  it('updates v-model values when typing', async () => {
    const emailInput = wrapper.find('input[name="email"]');
    const passwordInput = wrapper.find('input[name="password"]');

    await emailInput.setValue('test@example.com');
    await passwordInput.setValue('password123');

    expect(wrapper.vm.componentState.email).toBe('test@example.com');
    expect(wrapper.vm.componentState.password).toBe('password123');
  })

  /*it('calls login method on valid form submission', async () => {
    //const clickSpy = vi.spyOn(wrapper.vm, 'login');

    await wrapper.find('input[name="email"]').setValue('test@example.com');
    await wrapper.find('input[name="password"]').setValue('password123');
    await wrapper.find('button[type="submit"]').trigger('click');
    await wrapper.vm.$nextTick();
    //await wrapper.vm.login();
    expect(wrapper.emitted('login')).toHaveLength(1);
    //expect(clickSpy).toHaveBeenCalled();
  })*/

  /*it('displays error message on login failure', async () => {
    const errorMessage = 'Invalid credentials';
    wrapper.vm.errorMessage = errorMessage;
    await wrapper.vm.$nextTick();

    expect(wrapper.find('.error').text()).toContain(errorMessage);
  })*/
})