import React, { useState, useCallback } from 'react';
import { isDomainAvailable } from '../lib/resources';

interface ChallengeProps {
  numDomainsRequired: number;
}

const Challenge: React.FC<ChallengeProps> = ({ numDomainsRequired }) => {
  const [domains, setDomains] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');

  const handleAddDomain = useCallback(() => {
    const domain = inputValue.trim().toLowerCase();
    if (!domain || domains.includes(domain)) return;

    const validEndings = ['.com', '.xyz', '.app'];
    const isValidDomain = validEndings.some((ending) => domain.endsWith(ending));

    if (isValidDomain) {
      setDomains((prev) => [...prev, domain]);
      setInputValue('');
    }
  }, [inputValue, domains]);

  const handleDeleteDomain = useCallback((domain: string) => {
    setDomains((prev) => prev.filter((d) => d !== domain));
  }, []);

  const handleClearCart = useCallback(() => {
    setDomains([]);
  }, []);

  const handleRemoveUnavailable = useCallback(async () => {
    const availability = await Promise.all(domains.map((domain) => isDomainAvailable(domain)));
    const availableDomains = domains.filter((_, index) => availability[index]);
    setDomains(availableDomains);
  }, [domains]);

  const handleCopyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(domains.join(', '));
  }, [domains]);

  const handleKeepBestDomains = useCallback(() => {
    const endingsOrder = { '.com': 1, '.app': 2, '.xyz': 3 } as const;

    const sortedDomains = domains.sort((a, b) => {
      const aEnding = a.slice(a.lastIndexOf('.'));
      const bEnding = b.slice(b.lastIndexOf('.'));

      // Use type assertion to tell TypeScript that aEnding and bEnding are valid keys
      const aOrder = endingsOrder[aEnding as keyof typeof endingsOrder];
      const bOrder = endingsOrder[bEnding as keyof typeof endingsOrder];

      if (aOrder !== bOrder) {
        return aOrder - bOrder;
      }
      return a.length - b.length;
    });

    setDomains(sortedDomains.slice(0, numDomainsRequired));
  }, [domains, numDomainsRequired]);

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAddDomain()}
          placeholder="Enter domain name"
          className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleAddDomain}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Add Domain
        </button>
      </div>
      <div className="mb-4">
        {domains.map((domain) => (
          <div
            key={domain}
            className="flex justify-between items-center p-2 border border-gray-200 rounded-lg mb-2"
          >
            <span>{domain}</span>
            <button
              onClick={() => handleDeleteDomain(domain)}
              className="px-2 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      <div className="flex gap-2 mb-4">
        <button
          onClick={handleClearCart}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
        >
          Clear Cart
        </button>
        <button
          onClick={handleRemoveUnavailable}
          className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
        >
          Remove Unavailable
        </button>
        <button
          onClick={handleCopyToClipboard}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Copy to Clipboard
        </button>
        <button
          onClick={handleKeepBestDomains}
          className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
        >
          Keep Best Domains
        </button>
      </div>
      <div className="mb-4">
        {domains.length} out of {numDomainsRequired} domains added.
      </div>
      <button
        disabled={domains.length !== numDomainsRequired}
        onClick={() => alert('Domains purchased!')}
        className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        Purchase Domains
      </button>
    </div>
  );
};

export default Challenge;