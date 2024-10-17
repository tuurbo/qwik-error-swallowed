import { $, component$ } from "@builder.io/qwik";
import { server$, type DocumentHead } from "@builder.io/qwik-city";

declare function iDontExist(): void;
declare function iDontExistEither(): void;

export const getUser = server$(() => {
  return {
    person: {
      firstName: "John",
    },
  } as any;
});

export default component$(() => {
  const doThing = $(() => {
    iDontExistEither();
    return 1;
  });

  return (
    <>
      <div style="font-size: 20px;">Qwik client side errors swallowed</div>
      <div style="margin: 15px 0 0;">
        Run app in preview <code>(pnpm run preview)</code> or production mode{" "}
        <code>(pnpm run prod)</code>.
      </div>
      <div style="margin: 15px 0 35px;">Click the buttons below.</div>
      <div style="padding: 20px; display: flex; gap: 30px; border: 2px solid red; margin-bottom: 35px;">
        <div style="margin: 15px 0;">Error is NOT shown in console.</div>

        <button
          onClick$={() => {
            throw new Error("test");
          }}
        >
          throw new error
        </button>

        <button
          onClick$={() => {
            iDontExist();
          }}
        >
          undefined function
        </button>

        <button
          onClick$={$(async () => {
            const user = await getUser();
            console.log(user.invalidProperty.firstName);
          })}
        >
          undefined property
        </button>

        <button onClick$={doThing}>throw error works</button>
      </div>

      <div style="padding: 20px; display: flex; gap: 30px; border: 2px solid green;">
        <div style="margin: 15px 0;">Error is shown in console.</div>
        <button
          onClick$={() => {
            doThing();
          }}
        >
          throw new error
        </button>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Qwik Error Handling",
};
