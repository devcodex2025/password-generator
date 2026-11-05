import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './accordion';

describe('AccordionContent', () => {
  it('keeps closed panels mounted for SEO but contained out of the page scroll', () => {
    render(
      <Accordion type="single" collapsible>
        <AccordionItem value="security">
          <AccordionTrigger>Password security</AccordionTrigger>
          <AccordionContent>Long SEO copy that stays in the DOM while closed.</AccordionContent>
        </AccordionItem>
      </Accordion>
    );

    const content = screen.getByText(/Long SEO copy/).closest('[data-state="closed"]');
    expect(content).not.toBeNull();
    expect(content?.textContent).toContain('Long SEO copy');
    expect(content?.className).toContain('[contain:paint]');
  });
});
