import AppNotice from '.';
import { withA11y } from '@storybook/addon-a11y';
import LocationIcon from '../../public/location.svg';
import TfgmIcon from '../../public/tfgm-icon.svg';

export default {
  title: 'Patterns|AppNotice',
  decorators: [withA11y()]
};

export const LocationAccessNotice = () => ({
  components: { AppNotice, LocationIcon },
  template: `
    <app-notice>
      <template #icon>
        <location-icon class="app-notice--icon" />
      </template>
      <template #text>You will be asked to temporarily share your current device location.</template>
    </app-notice>`
});

export const DataNotice = () => ({
  components: { AppNotice, TfgmIcon },
  template: `
    <app-notice>
      <template #icon>
        <tfgm-icon class="app-notice--icon" />
      </template>
      <template #text>This app uses TfGM Open Data 2.0 under Open Government License.</template>
    </app-notice>`
});
