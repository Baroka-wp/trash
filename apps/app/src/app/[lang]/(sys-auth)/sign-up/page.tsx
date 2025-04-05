import { RegisterUserAuthForm } from "@/components/auth/register-user-auth-form"
import { RegisterUserAuthFormDr } from "@/components/auth/register-user-auth-form.dr"
import { authRoutes } from "@/constants/auth"
import { Locale } from "@/lib/i18n-config"
import { getDictionary } from "@/lib/langs"
import { dictionaryRequirements } from "@/lib/utils/dictionary"

import { PrivacyAcceptanceDr } from "../privacy-acceptance.dr"
import { AuthProvidersDr } from "../providers.dr"

export default async function SignUpPage({
  searchParams,
  params: { lang },
}: {
  searchParams: { [key: string]: string | string[] | undefined }
  params: {
    lang: Locale
  }
}) {
  const dictionary = await getDictionary(
    lang,
    dictionaryRequirements(
      {
        login: true,
        signUpPage: {
          createAnAccount: true,
          enterEmail: true,
        },
        auth: {
          orContinueWith: true,
        },
      },
      AuthProvidersDr,
      PrivacyAcceptanceDr,
      RegisterUserAuthFormDr
    )
  )
  //const session = await auth()

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 px-4">
      {/*<Button
        as={Link}
        href={authRoutes.signIn[0]}
        className={cn("absolute right-4 top-4 md:right-8 md:top-8")}
        variant="ghost"
      >
        {dictionary.login}
      </Button>*/}
      <div className="hidden h-full bg-muted lg:block"></div>
      <div className="lg:p-8">
        <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-xl">
          <div className="space-y-4 text-center">
            <h1 className="text-4xl font-bold text-gray-900">{dictionary.signUpPage.createAnAccount}</h1>
            <p className="text-lg text-gray-600">{dictionary.signUpPage.enterEmail}</p>
          </div>
          <div className="mt-6 space-y-6">
            <RegisterUserAuthForm dictionary={dictionary} isMinimized searchParams={searchParams} locale={lang} />
            <p className="text-center text-lg text-gray-700">
              Vous avez déjà un compte ?{" "}
              <a
                href={authRoutes.signIn[0]}
                className="font-semibold text-blue-600 transition-colors duration-200 hover:text-blue-800"
              >
                {dictionary.login}
              </a>
            </p>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                {/*<span className="bg-background px-2 text-muted-foreground">{dictionary.auth.orContinueWith}</span>*/}
              </div>
            </div>
            {/*<AuthProviders dictionary={dictionary} searchParams={searchParams} session={session} />
             */}{" "}
          </div>
          {/* <PrivacyAcceptance dictionary={dictionary} /> */}
        </div>
      </div>
    </main>
  )
}
