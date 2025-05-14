import React, { useEffect, useRef } from 'react';
import * as VKID from '@vkid/sdk';
import { jwtDecode } from 'jwt-decode';
import { vkAuth } from '../shared/api/authService';

type VkIdTokenPayload = {
  email?: string;
  name?: string;
  given_name?: string;
  family_name?: string;
  sub: string; // VK ID
};

const VKLoginButton: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current || !containerRef.current) return;

    VKID.Config.init({
      app: 53565862,
      redirectUrl: 'https://sport-verse.vercel.app',
      responseMode: VKID.ConfigResponseMode.Callback,
      source: VKID.ConfigSource.LOWCODE,
      scope: '',
    });

    const oneTap = new VKID.OneTap();
    containerRef.current.innerHTML = '';

    oneTap
      .render({
        container: containerRef.current,
        fastAuthEnabled: false,
        showAlternativeLogin: true,
        styles: {
          height: 38
        }
      })
      .on(VKID.WidgetEvents.ERROR, (error: unknown) => {
        console.error('VKID ERROR:', error);
      })
      .on(VKID.OneTapInternalEvents.LOGIN_SUCCESS, async (payload: { code: string; device_id: string }) => {
        try {
          const tokenResult = await VKID.Auth.exchangeCode(payload.code, payload.device_id);

          // @ts-ignore — временно, если TypeScript ругается на id_token
          const decoded = jwtDecode<VkIdTokenPayload>(tokenResult.id_token);

          const email = decoded.email || `vk_${decoded.sub}@noemail.vk`;
          const username =
            decoded.name || `${decoded.given_name || ''} ${decoded.family_name || ''}`.trim();
          const vkid = decoded.sub;

          const response = await vkAuth(email, vkid, username);
          console.log('Авторизация через VK успешна:', response);
        } catch (err) {
          console.error('VKID AUTH ERROR:', err);
        }
      });

    initializedRef.current = true;
  }, []);

  return <div style={{ width: '300px' }} ref={containerRef} />;
};

export default VKLoginButton;