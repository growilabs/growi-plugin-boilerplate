import FooBarPreRenderInterceptor from './client/js/util/Interceptor/FooBarPreRenderInterceptor';
import FooBarPostRenderInterceptor from './client/js/util/Interceptor/FooBarPostRenderInterceptor';

export default (appContainer) => {
  // add interceptors
  appContainer.interceptorManager.addInterceptors([
    new FooBarPreRenderInterceptor(),
    new FooBarPostRenderInterceptor(appContainer),
  ]);
};
