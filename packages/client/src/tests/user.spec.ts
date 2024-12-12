import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import User from '../components/User.vue';
import axios from 'axios';
import { API_URLS, URL } from '../utils/api-urls';

vi.mock('axios');

describe('User.vue', () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
    vi.clearAllMocks();
  })

  it('redirects to home if no token is present', async () => {
    mount(User);
    expect(window.location.href).toBe(URL);
  })

  /*it('fetches and displays user data on mount', async () => {
    const mockUser = {
      email: 'test@example.com',
      created_date: '2024-03-20'
    };

    vi.mocked(axios.get).mockResolvedValueOnce({ data: mockUser });

    const wrapper = mount(User);

    await wrapper.vm.$nextTick();

    expect(wrapper.text()).toContain('test@example.com');
    expect(wrapper.text()).toContain('2024-03-20');
  })*/

  it('logs out user when logout button is clicked', async () => {
    localStorage.setItem('token', 'fake-token');

    const wrapper = mount(User);

    await wrapper.find('button.button--red').trigger('click');

    expect(localStorage.getItem('token')).toBeNull();
    expect(sessionStorage.getItem('token')).toBeNull();
    expect(window.location.href).toBe(URL);
  })

  it('fetches and displays users list when show users button is clicked', async () => {
    localStorage.setItem('token', 'fake-token');

    vi.mocked(axios.get).mockResolvedValueOnce({ data: {} });

    const mockUsers = [
      { email: 'user1@example.com', created_date: '2024-03-20' },
      { email: 'user2@example.com', created_date: '2024-03-21' }
    ];

    vi.mocked(axios.get).mockResolvedValueOnce({ data: mockUsers });

    const wrapper = mount(User);

    await wrapper.find('button:not(.button--red)').trigger('click');
    await wrapper.vm.$nextTick();

    expect(vi.mocked(axios.get)).toHaveBeenCalledWith(
      API_URLS.USERS,
      expect.objectContaining({
        params: { qty: 1 },
        headers: { Authorization: 'Bearer fake-token' }
      })
    );

    const tableRows = wrapper.findAll('table tr')
    expect(tableRows).toHaveLength(3);
    expect(wrapper.text()).toContain('user1@example.com');
    expect(wrapper.text()).toContain('user2@example.com');
  })

  it('handles API errors gracefully', async () => {
    localStorage.setItem('token', 'fake-token');

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    vi.mocked(axios.get).mockRejectedValueOnce(new Error('API Error'));

    mount(User);
    await vi.waitFor(() => {
      expect(consoleSpy).toHaveBeenCalled();
    })

    consoleSpy.mockRestore();
  })
})