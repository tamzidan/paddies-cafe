import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-12 items-center justify-center rounded-full">
                <AppLogoIcon className="fill-current text-white dark:text-white rounded-full" />
            </div>
            <div className="ml-1 grid flex-1 text-left text-lg">
                <span className="mb-0.5 truncate leading-tight font-semibold">Paddies Cafe</span>
            </div>
        </>
    );
}
