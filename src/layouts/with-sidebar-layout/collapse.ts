import {atom, useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {useCallback} from 'react';

const sidebarCollapse = atom({
   key: 'sidebarCollapse',
   default: false
});

export const useSidebarCollapseState = () => useRecoilState(sidebarCollapse);
export const useSidebarCollapse = () => useRecoilValue(sidebarCollapse);
export const useSetSidebarCollapse = () => useSetRecoilState(sidebarCollapse);
export const useTriggerSidebarCollapsed = () => {
   const setter = useSetSidebarCollapse();

   return useCallback(() => {
      setter((currentValue) => !currentValue);
   }, [setter]);
};
