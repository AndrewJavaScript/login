import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import Registration from '../components/Registration.vue';
import axios from 'axios';
import router from '../router.ts';
import { API_URLS } from '../utils/api-urls.ts';
import { getToken } from "../utils/helpers.ts";

vi.mock('../utils/helpers', () => ({
  getToken: vi.fn()
}))

describe('Registration.vue', () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = mount(Registration, {
      global: {
        plugins: [router]
      }
    });
    vi.clearAllMocks();
  })

  it('renders registration form by default', () => {
    expect(wrapper.find('.registration__title').text()).toBe('REGISTRATION PAGE');
    expect(wrapper.find('form').exists()).toBeTruthy();
  })

  it('validates required fields', async () => {
    const submitButton = wrapper.find('button.button');
    await submitButton.trigger('click');

    const errorMessages = wrapper.findAll('.error');
    expect(errorMessages.length).toBeGreaterThan(0);
  })

  /*it('should register successfully when all fields are valid', async () => {
    // Mock axios post response
    vi.mocked(axios.post).mockResolvedValueOnce({ data: 200 });
    const wrapper = mount(Registration);
    /!*await wrapper.find('input[name="email"]').setValue('test@example.com');
    await wrapper.find('input[name="password"]').setValue('password123');
    await wrapper.find('input[name="passwordRepeat"]').setValue('password123');*!/

    // Click the registration button
    await wrapper.find('#logInButton').trigger('click');

    // Verify axios was called with correct parameters
    /!*expect(vi.mocked(axios.post)).toHaveBeenCalledWith(API_URLS.REGISTRATION, {
      email: 'test@example.com',
      password: 'password123',
      passwordRepeat: 'password123',
    });*!/

    // Check if success message is displayed
    expect(wrapper.text()).toContain('SUCCESSFULLY REGISTERED');
  });*/

  /*it('should not proceed with registration if validation fails', async () => {
    /!*const componentState = {
      isRegistered: false,
      isUniqEmail: true
    }*!/
    // Mock validate to return valid = false
    const validate = vi.fn().mockResolvedValue({ valid: false });

    //await registration.call({ componentState, validate });

    expect(validate).toHaveBeenCalledTimes(1);
    expect(axios.post).not.toHaveBeenCalled();
    expect(componentState.isRegistered).toBe(false);
  });*/

  /*it('validates password match', async () => {
    await wrapper.find('[name="password"]').setValue('password123');
    await wrapper.find('[name="passwordRepeat"]').setValue('password456');
    const registration = vi.fn().mockResolvedValue({ valid: false });
    //const registration = vi.fn();
    const submitButton = wrapper.find('#logInButton');
    await submitButton.trigger('click');
    expect(registration).toHaveBeenCalledTimes(1);*/
    //expect(wrapper.vm.registration).toHaveBeenCalledOnce();
    //const errors = wrapper.findAll('.error');
    //expect(wrapper.html()).toContain('Passwords are not equal');
  //})

  /*it('handles successful registration', async () => {
    vi.mocked(axios.post).mockResolvedValueOnce({ data: 200 });

    await wrapper.find('[name="email"]').setValue('test@example.com');
    await wrapper.find('[name="password"]').setValue('password123');
    await wrapper.find('[name="passwordRepeat"]').setValue('password123');

    const submitButton = wrapper.find('#logInButton');
    await submitButton.trigger('click');

    expect(wrapper.find('.registration__title').text()).toBe('SUCCESSFULLY REGISTERED');
  })

  it('handles email already exists error', async () => {
    // Mock API response for existing email
    vi.mocked(axios.post).mockResolvedValueOnce({ data: 409 });

    // Fill form with valid data
    await wrapper.find('[name="email"]').setValue('existing@example.com');
    await wrapper.find('[name="password"]').setValue('password123');
    await wrapper.find('[name="passwordRepeat"]').setValue('password123');

    const submitButton = wrapper.find('button.button');
    await submitButton.trigger('click');

    // Check for email exists error
    expect(wrapper.html()).toContain('This email already exist');
  })*/

 /* it('redirects to user page if token exists', async () => {
    // Mock window.location
    const locationSpy = vi.spyOn(window.location, 'href', 'get');

    // Mock token exists
    vi.mocked(getToken).mockReturnValue('some-token');

    // Mount component to trigger onBeforeMount
    mount(Registration);

    // Verify redirect
    expect(locationSpy).toHaveBeenCalledOnce();
  })*/
})