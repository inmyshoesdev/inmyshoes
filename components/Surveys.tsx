import { FormEventHandler } from 'react'
import css from 'styled-jsx/css'

type FormProps = {
  submitHandler: FormEventHandler<HTMLFormElement>
}

type SurveyWrapperProps = {
  formComponent: React.ComponentType<FormProps>
  onSubmit: () => void
  onFailure?: () => void
  noSubmit?: boolean
}

const SurveyFormWrapper: React.FC<SurveyWrapperProps> = ({
  formComponent: FormComponent,
  onSubmit,
  onFailure,
  noSubmit = false,
}) => {
  const handleFailure = () => {
    if (onFailure) {
      onFailure()
    }
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()

    const form = document.getElementById('bootstrapForm') as HTMLFormElement
    if (!form) {
      console.warn('could not locate form element')
      handleFailure()
      return
    }
    const formUrl = form.attributes.getNamedItem('action')?.nodeValue
    if (!formUrl) {
      console.warn('could not retrieve form url')
      handleFailure()
      return
    }

    const formData = new FormData(form)

    if (noSubmit) {
      console.log('`noSubmit = true`, skipping submitting of form')
      console.log({ formUrl, formData })
      onSubmit()
      return
    }

    try {
      fetch(formUrl, {
        method: 'POST',
        body: formData,
        mode: 'no-cors',
      })
    } catch (e) {
      console.warn({ error: e })
      handleFailure()
      return
    }

    onSubmit()
  }

  return (
    <div className="max-w-3xl">
      <FormComponent submitHandler={handleSubmit} />
    </div>
  )
}

// To generate the appropriate JSX for a new Google form:
// 1. Use https://stefano.brilli.me/google-forms-html-exporter/
// 2. Use https://magic.reactjs.net/htmltojsx.htm
const PreGameForm: React.FC<FormProps> = ({ submitHandler }) => {
  return (
    // 3. wrap new forms in a div and include the `<style jsx>{styles}</style>` line to style the form
    <div>
      <style jsx>{styles}</style>
      <form
        action="https://docs.google.com/forms/d/e/1FAIpQLSeo_xA1W0LJpDP-og8t9vzyQ9mSZ_HMYdRn8XniLqNiYMiSyQ/formResponse"
        target="_self"
        id="bootstrapForm"
        method="POST"
        onSubmit={submitHandler} // 4. add the submit handler too
      >
        <fieldset>
          <h2>
            Before we start...
            <br />
            <small>Could you tell us a little more about yourself? 🙂</small>
          </h2>
        </fieldset>
        {/* Field type: "choices" id: "1932512150" */}
        <fieldset>
          <legend>Please select your gender:</legend>
          <div className="form-group">
            <div className="radio">
              <label>
                <input
                  type="radio"
                  name="entry.1591633300"
                  defaultValue="Male"
                  required
                />
                Male
              </label>
            </div>
            <div className="radio">
              <label>
                <input
                  type="radio"
                  name="entry.1591633300"
                  defaultValue="Female"
                  required
                />
                Female
              </label>
            </div>
            <div className="radio">
              <label>
                <input
                  type="radio"
                  name="entry.1591633300"
                  defaultValue="Prefer not to say"
                  required
                />
                Prefer not to say
              </label>
            </div>
            <div className="radio">
              <label>
                <input
                  type="radio"
                  name="entry.1591633300"
                  defaultValue="__other_option__"
                  required
                />
              </label>
              <input
                type="text"
                name="entry.1591633300.other_option_response"
                placeholder="Prefer to self describe"
              />
            </div>
          </div>
        </fieldset>
        {/* Field type: "choices" id: "1171436624" */}
        <fieldset>
          <legend>Please select your age</legend>
          <div className="form-group">
            <div className="radio">
              <label>
                <input
                  type="radio"
                  name="entry.326955045"
                  defaultValue="< 13"
                  required
                />
                &lt; 13
              </label>
            </div>
            <div className="radio">
              <label>
                <input
                  type="radio"
                  name="entry.326955045"
                  defaultValue="13 - 18"
                  required
                />
                13 - 18
              </label>
            </div>
            <div className="radio">
              <label>
                <input
                  type="radio"
                  name="entry.326955045"
                  defaultValue="19 - 25"
                  required
                />
                19 - 25
              </label>
            </div>
            <div className="radio">
              <label>
                <input
                  type="radio"
                  name="entry.326955045"
                  defaultValue="26 - 35"
                  required
                />
                26 - 35
              </label>
            </div>
            <div className="radio">
              <label>
                <input
                  type="radio"
                  name="entry.326955045"
                  defaultValue="> 35"
                  required
                />
                &gt; 35
              </label>
            </div>
            <div className="radio">
              <label>
                <input
                  type="radio"
                  name="entry.326955045"
                  defaultValue="Prefer not to say"
                  required
                />
                Prefer not to say
              </label>
            </div>
          </div>
        </fieldset>
        <input type="hidden" name="fvv" defaultValue={1} />
        <input type="hidden" name="fbzx" defaultValue={-1953624271179587798} />
        {/*
        CAVEAT: In multipages (multisection) forms, *pageHistory* field tells to google what sections we've currently completed.
        This usually starts as "0" for the first page, then "0,1" in the second page... up to "0,1,2..N" in n-th page.
        Keep this in mind if you plan to change this code to recreate any sort of multipage-feature in your exported form.
        We're setting this to the total number of pages in this form because we're sending all fields from all the section together.
    */}
        <input type="hidden" name="pageHistory" defaultValue={0} />
        <input
          className="btn btn-primary"
          type="submit"
          defaultValue="Submit"
        />
      </form>
    </div>
  )
}

const PostGameForm: React.FC<FormProps> = ({ submitHandler }) => {
  return (
    <div>
      <style jsx>{styles}</style>
      <form
        action="https://docs.google.com/forms/d/e/1FAIpQLSd4AfFft477TFmpTXnVVXOv0POy8uGiQ8In-M6gMumB09jtZg/formResponse"
        target="_self"
        id="bootstrapForm"
        method="POST"
        onSubmit={submitHandler}
      >
        <fieldset>
          <h2>
            How did you find the game?
            <br />
            <small>We would love to hear your thoughts or feedback! 😊</small>
          </h2>
        </fieldset>
        {/* Field type: "choices" id: "1932512150" */}
        <fieldset>
          <legend>How enjoyable was the game?</legend>
          <div className="form-group">
            <div className="radio">
              <label>
                <input
                  type="radio"
                  name="entry.1591633300"
                  defaultValue="Very enjoyable"
                  required
                />
                Very enjoyable
              </label>
            </div>
            <div className="radio">
              <label>
                <input
                  type="radio"
                  name="entry.1591633300"
                  defaultValue="Enjoyable"
                  required
                />
                Enjoyable
              </label>
            </div>
            <div className="radio">
              <label>
                <input
                  type="radio"
                  name="entry.1591633300"
                  defaultValue="Average"
                  required
                />
                Average
              </label>
            </div>
            <div className="radio">
              <label>
                <input
                  type="radio"
                  name="entry.1591633300"
                  defaultValue="Not enjoyable"
                  required
                />
                Not enjoyable
              </label>
            </div>
            <div className="radio">
              <label>
                <input
                  type="radio"
                  name="entry.1591633300"
                  defaultValue="Not at all enjoyable"
                  required
                />
                Not at all enjoyable
              </label>
            </div>
          </div>
        </fieldset>
        {/* Field type: "choices" id: "1171436624" */}
        <fieldset>
          <legend>How difficult was the game?</legend>
          <div className="form-group">
            <div className="radio">
              <label>
                <input
                  type="radio"
                  name="entry.326955045"
                  defaultValue="Very difficult"
                  required
                />
                Very difficult
              </label>
            </div>
            <div className="radio">
              <label>
                <input
                  type="radio"
                  name="entry.326955045"
                  defaultValue="Difficult"
                  required
                />
                Difficult
              </label>
            </div>
            <div className="radio">
              <label>
                <input
                  type="radio"
                  name="entry.326955045"
                  defaultValue="Average"
                  required
                />
                Average
              </label>
            </div>
            <div className="radio">
              <label>
                <input
                  type="radio"
                  name="entry.326955045"
                  defaultValue="Not difficult"
                  required
                />
                Not difficult
              </label>
            </div>
            <div className="radio">
              <label>
                <input
                  type="radio"
                  name="entry.326955045"
                  defaultValue="Not at all difficult"
                  required
                />
                Not at all difficult
              </label>
            </div>
          </div>
        </fieldset>
        {/* Field type: "linear" id: "2119960023" */}
        <fieldset>
          <legend>
            On a scale from 1-5, how much has this game increased your awareness
            on inequality
          </legend>
          <div className="form-group">
            <div>
              <label className="radio-inline">
                <input
                  type="radio"
                  name="entry.1877987806"
                  defaultValue={1}
                  required
                />
                1
              </label>
              <label className="radio-inline">
                <input
                  type="radio"
                  name="entry.1877987806"
                  defaultValue={2}
                  required
                />
                2
              </label>
              <label className="radio-inline">
                <input
                  type="radio"
                  name="entry.1877987806"
                  defaultValue={3}
                  required
                />
                3
              </label>
              <label className="radio-inline">
                <input
                  type="radio"
                  name="entry.1877987806"
                  defaultValue={4}
                  required
                />
                4
              </label>
              <label className="radio-inline">
                <input
                  type="radio"
                  name="entry.1877987806"
                  defaultValue={5}
                  required
                />
                5
              </label>
            </div>
            <div>
              <div>No change</div>
              <div>Greatly increased</div>
            </div>
          </div>
        </fieldset>
        {/* Field type: "paragraph" id: "919243844" */}
        <fieldset>
          <legend>Any suggestions that would improve the overall story?</legend>
          <div className="form-group">
            <textarea
              name="entry.1759130662"
              className="form-control"
              defaultValue={''}
            />
          </div>
        </fieldset>
        {/* Field type: "paragraph" id: "1773345917" */}
        <fieldset>
          <legend>
            Any suggestions that would make the gameplay more fun/immersive?
          </legend>
          <div className="form-group">
            <textarea
              name="entry.381953253"
              className="form-control"
              defaultValue={''}
            />
          </div>
        </fieldset>
        <input type="hidden" name="fvv" defaultValue={1} />
        <input type="hidden" name="fbzx" defaultValue={155114200448099708} />
        {/*
        CAVEAT: In multipages (multisection) forms, *pageHistory* field tells to google what sections we've currently completed.
        This usually starts as "0" for the first page, then "0,1" in the second page... up to "0,1,2..N" in n-th page.
        Keep this in mind if you plan to change this code to recreate any sort of multipage-feature in your exported form.
        We're setting this to the total number of pages in this form because we're sending all fields from all the section together.
    */}
        <input type="hidden" name="pageHistory" defaultValue={0} />
        <input
          className="btn btn-primary"
          type="submit"
          defaultValue="Submit"
        />
      </form>
    </div>
  )
}

const styles = css`
  form {
    @apply flex flex-col items-stretch p-7 pt-3 space-y-10 bg-gray-50 border-2 border-teal-200 rounded-2xl shadow-lg;
  }

  fieldset:first-of-type {
    @apply -mb-5;
  }

  h2 {
    @apply text-xl text-center font-bold text-gray-800;
  }

  h2 > small {
    @apply text-base font-normal text-gray-600;
  }

  legend {
    @apply m-1 font-semibold text-gray-900;
  }

  textarea {
    @apply w-full p-1 border-gray-400 rounded-lg focus:border-teal-600 focus:ring-1 focus:ring-teal-600;
  }

  .btn-primary {
    @apply mt-7 px-2 py-1 rounded-xl shadow text-gray-100 font-medium bg-teal-600 transition-transform duration-200 hover:scale-105 md:mx-4 lg:mx-8;
  }

  .radio > input[type='text'] {
    @apply w-auto py-1 border-gray-400 rounded-lg focus:border-teal-600 focus:ring-1 focus:ring-teal-600;
  }

  div.radio {
    @apply flex items-center;
  }

  div.radio > label {
    @apply flex items-center mb-1 text-gray-800;
  }

  label.radio-inline {
    @apply flex flex-col items-center;
  }

  label > input[type='radio'] {
    @apply mx-2 text-teal-600 focus:border-teal-600 focus:ring-1 focus:ring-teal-600;
  }

  div.form-group > div:not(.radio) {
    @apply flex py-2 px-3 items-center justify-around;
  }

  div.form-group > div:not(.radio) + div {
    @apply mx-2 text-sm text-gray-600 font-semibold justify-between;
  }
`

export { SurveyFormWrapper, PreGameForm, PostGameForm }
