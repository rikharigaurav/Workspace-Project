"use client"

import { CardWrapper } from "./card-wrapper"
import { BeatLoader } from 'react-spinners'
import { newVerification } from "@/action/new-verification"
import { useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { FormSuccess } from "../form-success"
import { FormError } from "../form-error"

export const NewVerificationForm = () => {

    
    const [ error, setError ] = useState<string | undefined>();
    const [ success, setSuccess] = useState<string | undefined>()

    const SearchParams = useSearchParams();

    const token = SearchParams.get("token");

    const onSubmit = useCallback(() => {

        if(success || error) return;

        if(!token) {
            setError("Missing Token!")
        }

        newVerification(token)
        .then((data) => {
            setSuccess(data.success);
            setError(data.error)
        })
        .catch(() => {
            setError("Something went wrong")
        })
    }, [token, success, error])

    useEffect(() => {
        onSubmit();
    }, [onSubmit])

    return (
      <CardWrapper
        headerLabel='Confirming your verification'
        backButtonHref='/login'
        backButtonLabel='Back to login'
      >
        <div className='flex items-center w-full justify-center'>
            {
                !success && !error && (
                    <BeatLoader/>
                )
            }
          <FormSuccess message={success} />
          {
            !success && (
                <FormError message={error} />
            )
          }
        </div>
      </CardWrapper>
    )
}