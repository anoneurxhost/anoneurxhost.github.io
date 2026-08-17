import LegalPage from "./LegalPage";

const NexoraPrivacy = () => (
  <LegalPage
    title="Privacy Policy"
    intro="Nexora is built around privacy. We collect the minimum amount of data needed to operate, and we never sell or share it."
    sections={[
      { h: "What we collect", p: "Anonymous, opt-in crash reports only. No browsing history. No personal data. No identifiers." },
      { h: "Sync data", p: "If you enable sync, your bookmarks, history, passwords and tabs are end-to-end encrypted with a key derived from your password. We can't read it." },
      { h: "Cookies", p: "Our website uses zero third-party cookies. A small first-party preference cookie remembers your theme." },
      { h: "Your rights", p: "You can export, delete or download all your sync data at any time from Settings → Privacy → My Data." },
      { h: "Contact", p: "Questions? Email privacy@nexora.app." },
    ]}
  />
);
export default NexoraPrivacy;
