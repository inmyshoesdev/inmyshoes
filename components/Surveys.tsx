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
    <div className="py-1 max-w-3xl">
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
            <small>
              Could you tell us a little more about yourself? We are in the
              process of improving this game and we would love your feedback! 🙂{' '}
            </small>
          </h2>
        </fieldset>
        {/* Field type: "dropdown" id: "1932512150" */}
        <fieldset>
          <legend>Please select your gender:</legend>
          <div className="form-group">
            <select
              id="1932512150"
              name="entry.1591633300"
              className="form-control"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
          </div>
        </fieldset>
        {/* Field type: "dropdown" id: "1171436624" */}
        <fieldset>
          <legend>Please select your age</legend>
          <div className="form-group">
            <select
              id="1171436624"
              name="entry.326955045"
              className="form-control"
            >
              <option value="< 13">&lt; 13</option>
              <option value="13 - 18">13 - 18</option>
              <option value="19 - 25">19 - 25</option>
              <option value="26 - 35">26 - 35</option>
              <option value="> 35">&gt; 35</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
          </div>
        </fieldset>
        {/* Field type: "linear" id: "450684089" */}
        <fieldset>
          <legend>
            I sometimes try to understand my friends and family members better
            by putting myself in their shoes.
          </legend>
          <div className="form-group">
            <div>
              <label className="radio-inline">
                <input
                  type="radio"
                  name="entry.1523921989"
                  defaultValue={1}
                  required
                />
                1
              </label>
              <label className="radio-inline">
                <input
                  type="radio"
                  name="entry.1523921989"
                  defaultValue={2}
                  required
                />
                2
              </label>
              <label className="radio-inline">
                <input
                  type="radio"
                  name="entry.1523921989"
                  defaultValue={3}
                  required
                />
                3
              </label>
              <label className="radio-inline">
                <input
                  type="radio"
                  name="entry.1523921989"
                  defaultValue={4}
                  required
                />
                4
              </label>
              <label className="radio-inline">
                <input
                  type="radio"
                  name="entry.1523921989"
                  defaultValue={5}
                  required
                />
                5
              </label>
            </div>
            <div>
              <div>1: Does not describe me well</div>
              <div>5: Describes me very well</div>
            </div>
          </div>
        </fieldset>
        {/* Field type: "linear" id: "765613690" */}
        <fieldset>
          <legend>I care for people less fortunate than me.</legend>
          <div className="form-group">
            <div>
              <label className="radio-inline">
                <input
                  type="radio"
                  name="entry.756064307"
                  defaultValue={1}
                  required
                />
                1
              </label>
              <label className="radio-inline">
                <input
                  type="radio"
                  name="entry.756064307"
                  defaultValue={2}
                  required
                />
                2
              </label>
              <label className="radio-inline">
                <input
                  type="radio"
                  name="entry.756064307"
                  defaultValue={3}
                  required
                />
                3
              </label>
              <label className="radio-inline">
                <input
                  type="radio"
                  name="entry.756064307"
                  defaultValue={4}
                  required
                />
                4
              </label>
              <label className="radio-inline">
                <input
                  type="radio"
                  name="entry.756064307"
                  defaultValue={5}
                  required
                />
                5
              </label>
            </div>
            <div>
              <div>1: Does not describe me well</div>
              <div>5: Describes me very well</div>
            </div>
          </div>
        </fieldset>
        {/* Field type: "linear" id: "1574526092" */}
        <fieldset>
          <legend>
            I consider others’ circumstances when I&apos;m talking with them.
          </legend>
          <div className="form-group">
            <div>
              <label className="radio-inline">
                <input
                  type="radio"
                  name="entry.840879589"
                  defaultValue={1}
                  required
                />
                1
              </label>
              <label className="radio-inline">
                <input
                  type="radio"
                  name="entry.840879589"
                  defaultValue={2}
                  required
                />
                2
              </label>
              <label className="radio-inline">
                <input
                  type="radio"
                  name="entry.840879589"
                  defaultValue={3}
                  required
                />
                3
              </label>
              <label className="radio-inline">
                <input
                  type="radio"
                  name="entry.840879589"
                  defaultValue={4}
                  required
                />
                4
              </label>
              <label className="radio-inline">
                <input
                  type="radio"
                  name="entry.840879589"
                  defaultValue={5}
                  required
                />
                5
              </label>
            </div>
            <div>
              <div>1: Does not describe me well</div>
              <div>5: Describes me very well</div>
            </div>
          </div>
        </fieldset>
        <input type="hidden" name="fvv" defaultValue={1} />
        <input type="hidden" name="fbzx" defaultValue={-3082884631835332940} />
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
            <small>
              We hope to learn how this game has impacted your views. We would
              also love to hear any of your thoughts or feedback! 😊
            </small>
          </h2>
        </fieldset>
        {/* Field type: "choices" id: "1932512150" */}
        <fieldset>
          <legend>How enjoyable were the simulations?</legend>
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
          <legend>How difficult were the simulations?</legend>
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
        {/* Field type: "choices" id: "1644670062" */}
        <fieldset>
          <legend>
            Have the simulations changed your view on inclusivity in
            relationships?
          </legend>
          <div className="form-group">
            <div className="radio">
              <label>
                <input
                  type="radio"
                  name="entry.2004757721"
                  defaultValue="Yes - I want to be more inclusive in my relationships"
                  required
                />
                Yes - I want to be more inclusive in my relationships
              </label>
            </div>
            <div className="radio">
              <label>
                <input
                  type="radio"
                  name="entry.2004757721"
                  defaultValue="No effect - I am already inclusive in my relationships"
                  required
                />
                No effect - I am already inclusive in my relationships
              </label>
            </div>
            <div className="radio">
              <label>
                <input
                  type="radio"
                  name="entry.2004757721"
                  defaultValue="No effect – Inclusivity is not a big deal to me"
                  required
                />
                No effect – Inclusivity is not a big deal to me
              </label>
            </div>
          </div>
        </fieldset>
        {/* Field type: "linear" id: "2119960023" */}
        <fieldset>
          <legend>
            On a scale from 1-5, how much has the simulations increased your
            awareness on inequality and/or bias?
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
              <div>1: No change</div>
              <div>5: Greatly Increased</div>
            </div>
          </div>
        </fieldset>
        {/* Field type: "linear" id: "146459145" */}
        <fieldset>
          <legend>
            I sometimes try to understand my friends and family members better
            by putting myself in their shoes.
          </legend>
          <div className="form-group">
            <div>
              <label className="radio-inline">
                <input
                  type="radio"
                  name="entry.2005451070"
                  defaultValue={1}
                  required
                />
                1
              </label>
              <label className="radio-inline">
                <input
                  type="radio"
                  name="entry.2005451070"
                  defaultValue={2}
                  required
                />
                2
              </label>
              <label className="radio-inline">
                <input
                  type="radio"
                  name="entry.2005451070"
                  defaultValue={3}
                  required
                />
                3
              </label>
              <label className="radio-inline">
                <input
                  type="radio"
                  name="entry.2005451070"
                  defaultValue={4}
                  required
                />
                4
              </label>
              <label className="radio-inline">
                <input
                  type="radio"
                  name="entry.2005451070"
                  defaultValue={5}
                  required
                />
                5
              </label>
            </div>
            <div>
              <div>1: Does not describe me well at all</div>
              <div>5: Describes me very well</div>
            </div>
          </div>
        </fieldset>
        {/* Field type: "linear" id: "315842583" */}
        <fieldset>
          <legend>I care for people less fortunate than me.</legend>
          <div className="form-group">
            <div>
              <label className="radio-inline">
                <input
                  type="radio"
                  name="entry.1337116457"
                  defaultValue={1}
                  required
                />
                1
              </label>
              <label className="radio-inline">
                <input
                  type="radio"
                  name="entry.1337116457"
                  defaultValue={2}
                  required
                />
                2
              </label>
              <label className="radio-inline">
                <input
                  type="radio"
                  name="entry.1337116457"
                  defaultValue={3}
                  required
                />
                3
              </label>
              <label className="radio-inline">
                <input
                  type="radio"
                  name="entry.1337116457"
                  defaultValue={4}
                  required
                />
                4
              </label>
              <label className="radio-inline">
                <input
                  type="radio"
                  name="entry.1337116457"
                  defaultValue={5}
                  required
                />
                5
              </label>
            </div>
            <div>
              <div>1: Does not describe me well at all</div>
              <div>5: Describes me very well</div>
            </div>
          </div>
        </fieldset>
        {/* Field type: "linear" id: "1789299988" */}
        <fieldset>
          <legend>
            I consider others’ circumstances when I&apos;m talking with them.
          </legend>
          <div className="form-group">
            <div>
              <label className="radio-inline">
                <input
                  type="radio"
                  name="entry.1475752873"
                  defaultValue={1}
                  required
                />
                1
              </label>
              <label className="radio-inline">
                <input
                  type="radio"
                  name="entry.1475752873"
                  defaultValue={2}
                  required
                />
                2
              </label>
              <label className="radio-inline">
                <input
                  type="radio"
                  name="entry.1475752873"
                  defaultValue={3}
                  required
                />
                3
              </label>
              <label className="radio-inline">
                <input
                  type="radio"
                  name="entry.1475752873"
                  defaultValue={4}
                  required
                />
                4
              </label>
              <label className="radio-inline">
                <input
                  type="radio"
                  name="entry.1475752873"
                  defaultValue={5}
                  required
                />
                5
              </label>
            </div>
            <div>
              <div>1: Does not describe me well at all</div>
              <div>5: Describes me very well</div>
            </div>
          </div>
        </fieldset>
        {/* Field type: "paragraph" id: "919243844" */}
        <fieldset>
          <legend>Any suggestions that would improve the overall story?</legend>
          <div className="form-group">
            <textarea
              id="1759130662"
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
              id="381953253"
              name="entry.381953253"
              className="form-control"
              defaultValue={''}
            />
          </div>
        </fieldset>
        {/* Field type: "paragraph" id: "1643157702" */}
        <fieldset>
          <legend>
            Any other feedback that would make your experience better?
          </legend>
          <div className="form-group">
            <textarea
              id="253219465"
              name="entry.253219465"
              className="form-control"
              defaultValue={''}
            />
          </div>
        </fieldset>
        <input type="hidden" name="fvv" defaultValue={1} />
        <input type="hidden" name="fbzx" defaultValue={4078793855096689486} />
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
    @apply text-sm sm:text-base font-normal text-gray-600;
  }

  legend {
    @apply m-1 font-semibold text-gray-900;
  }

  .form-control {
    @apply rounded-md px-2 py-1 ml-1 border-gray-400 focus:border-teal-600 focus:ring-1 focus:ring-teal-600;
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

  label.radio-inline > input {
    @apply mb-1;
  }

  label > input[type='radio'] {
    @apply mx-2 text-teal-600 focus:border-teal-600 focus:ring-1 focus:ring-teal-600;
  }

  div.form-group > div:not(.radio) {
    @apply flex text-sm sm:text-base py-2 px-3 items-center justify-around;
  }

  div.form-group > div:not(.radio) + div {
    @apply mx-2 text-xs sm:text-sm text-gray-500 font-semibold justify-between;
  }
`

export { SurveyFormWrapper, PreGameForm, PostGameForm }
