import { LoginUserAuthForm } from "@/components/auth/login-user-auth-form"
import { LoginUserAuthFormDr } from "@/components/auth/login-user-auth-form.dr"
import { authRoutes } from "@/constants/auth"
import { Locale } from "@/lib/i18n-config"
import { getDictionary } from "@/lib/langs"
import { dictionaryRequirements } from "@/lib/utils/dictionary"

import { PrivacyAcceptanceDr } from "../privacy-acceptance.dr"
import { AuthProvidersDr } from "../providers.dr"

export default async function SignInPage({
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
        signInPage: {
          loginToYourAccount: true,
          enterDetails: true,
        },
        toSignUp: true,
        auth: {
          orContinueWith: true,
        },
      },
      AuthProvidersDr,
      PrivacyAcceptanceDr,
      LoginUserAuthFormDr
    )
  )
  //const session = await auth()

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 px-4">
      {/*env.DISABLE_REGISTRATION !== true && (
        <Button
          as={Link}
          href={authRoutes.signUp[0]}
          className={cn("absolute right-4 top-4 md:right-8 md:top-8")}
          variant="ghost"
        >
          {dictionary.toSignUp}
        </Button>
      )*/}
      <div className="hidden h-full bg-muted lg:block"></div>
      <div className="lg:p-8">
        <div className="w-full max-w-md rounded-lg bg-white p-10 shadow-xl">
          <div className="space-y-4 text-center">
            <h1 className="text-3xl font-bold text-gray-900">{dictionary.signInPage.loginToYourAccount}</h1>
            <p className="text-lg text-gray-600">{dictionary.signInPage.enterDetails}</p>
          </div>
          <div className="mt-6 space-y-6">
            <LoginUserAuthForm dictionary={dictionary} searchParams={searchParams} />
            <p className="text-center text-lg text-gray-700">
              Nouveau sur ce site ?{" "}
              <a
                href={authRoutes.signUp[0]}
                className="font-semibold text-blue-600 transition-colors duration-200 hover:text-blue-800"
              >
                {dictionary.toSignUp}
              </a>
            </p>
            {/*env.DISABLE_REGISTRATION !== true && (
              <>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">{dictionary.auth.orContinueWith}</span>
                  </div>
                </div>
                <AuthProviders dictionary={dictionary} searchParams={searchParams} session={session} />
              </>
            )*/}
          </div>
          {/*<PrivacyAcceptance dictionary={dictionary} /> */}
        </div>
      </div>
    </main>
  )
}
