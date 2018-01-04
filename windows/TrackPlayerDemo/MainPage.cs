using ReactNative;
using ReactNative.Modules.Core;
using TrackPlayer;
using ReactNative.Shell;
using System.Collections.Generic;

namespace TrackPlayerDemo
{
    class MainPage : ReactPage
    {
        public override string MainComponentName
        {
            get
            {
                return "TrackPlayerDemo";
            }
        }

#if BUNDLE
        public override string JavaScriptBundleFile
        {
            get
            {
                return "ms-appx:///ReactAssets/index.windows.bundle";
            }
        }
#endif

        public override List<IReactPackage> Packages
        {
            get
            {
                return new List<IReactPackage>
                {
                    new MainReactPackage(),
                    new TrackPlayerPackage(),
                };
            }
        }

        public override bool UseDeveloperSupport
        {
            get
            {
#if !BUNDLE || DEBUG
                return true;
#else
                return false;
#endif
            }
        }
    }

}
